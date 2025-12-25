import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, Filter, Grid3X3, LayoutGrid, Sparkles, TrendingUp, Package } from "lucide-react";


import ProductHero from "../../components/product/ProductHero";
import CategoryShowcase from "../../components/product/CategoryShowcase";
import ProductCard from "../../components/product/ProductCard";
import AppBreadcrumbs from "../../components/Breadcrumbs";
import PremiumBanner from "@/components/product/PremiumBanner";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5174";

function Product() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([{ _id: "all", name: "All", icon: Grid3X3, count: 0 }]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products
        const resProducts = await axios.get(`${BACKEND_URL}/api/products`);
        const normalizedProducts = resProducts.data.map((p) => ({
          ...p,
          id: p._id,
          image: p.image ? `${BACKEND_URL}${p.image}` : p.images?.length ? `${BACKEND_URL}${p.images[0]}` : "/placeholder.png",
          category: typeof p.category === "object" ? p.category.name : p.category,
          categoryId: typeof p.category === "object" ? p.category._id : p.category,
        }));
        setProducts(normalizedProducts);

        // Fetch categories
        const resCategories = await axios.get(`${BACKEND_URL}/api/categories`);
        const normalizedCategories = resCategories.data.map((c) => ({
          _id: c._id,
          name: c.name,
          slug: c.slug,
          icon: Grid3X3,
          count: normalizedProducts.filter((p) => p.categoryId === c._id).length,
        }));
        setCategories([{ _id: "all", name: "All", icon: Grid3X3, count: normalizedProducts.length }, ...normalizedCategories]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || p.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low": return a.price - b.price;
      case "price-high": return b.price - a.price;
      case "rating": return b.rating - a.rating;
      case "newest": return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      default: return 0;
    }
  });

  const groupedProducts = categories.reduce((acc, category) => {
    if (category._id === "all") return acc;
    acc[category.name] = sortedProducts.filter((p) => p.category === category.name);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-background container">
    
      {/* Header */}
      <div className="bg-backgroundlite py-4  pt-20">
        <h1 className="text-3xl font-bold px-4 text-mainbackground">Products</h1>
        <AppBreadcrumbs />
      </div>
      <ProductHero />

      <CategoryShowcase 
        categories={categories} 
        selectedCategory={selectedCategory} 
        onSelectCategory={setSelectedCategory} 
      />

      <div className="container mx-auto px-4 py-2">
        {/* Search & Filter */}
        <div className="bg-[#d7dbf0] rounded-2xl shadow-elegant p-6 mb-10 border border-border/50">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for furniture..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 text-base bg-background border border-border/50 focus:border-primary rounded-xl w-full"
              />
            </div>

            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
              {/* Sort Dropdown */}
              <select className="h-12 rounded-xl border-2 border-white/50 px-4" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="featured">Featured</option>
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>

              {/* View Toggle */}
              <div className="flex gap-1 bg-muted rounded-xl p-1">
                <button onClick={() => setViewMode("grid")} className={viewMode === "grid" ? "bg-primary text-white p-2 rounded-lg" : "p-2 rounded-lg"}><LayoutGrid className="h-4 w-4" /></button>
                <button onClick={() => setViewMode("compact")} className={viewMode === "compact" ? "bg-primary text-white p-2 rounded-lg" : "p-2 rounded-lg"}><Grid3X3 className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {selectedCategory === "all" ? (
          <div className="space-y-16">
            {categories.filter(c => c._id !== "all").map((cat) => {
              const items = groupedProducts[cat.name] || [];
              if (items.length === 0) return null;
              return (
                <section key={cat._id}>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">{cat.name}</h2>
                    <p>{items.length} products</p>
                  </div>
                  <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"}`}>
                    {items.map((p) => <ProductCard key={p.id} product={p} compact={viewMode === "compact"} />)}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"}`}>
            {sortedProducts.map((p) => <ProductCard key={p.id} product={p} compact={viewMode === "compact"} />)}
          </div>
        )}

        {sortedProducts.length === 0 && (
          <div className="text-center py-20">
            <Package className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
            <p>No products found.</p>
          </div>
        )}
      </div>

   <div>
    <PremiumBanner/>
   </div>



    </div>
  );
}

export default Product;
