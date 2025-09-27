// src/pages/Product.jsx
import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import AppBreadcrumbs from "../../components/Breadcrumbs";
import BrandPromotion from "../../assets/images/Home/BrandPromotion.png";
import ProductCard from "../../components/ProductCard";

const BACKEND_URL = "http://localhost:5174";

function Product() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([{ _id: "all", name: "All" }]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ Fetch Products
        const resProducts = await axios.get(`${BACKEND_URL}/api/products`);

        const normalizedProducts = resProducts.data.map((p) => ({
          ...p,
          id: p._id,
          // Handle single or multiple images
          image: p.image
            ? `${BACKEND_URL}${p.image}`
            : p.images?.length
            ? `${BACKEND_URL}${p.images[0]}`
            : "/placeholder.png",
          category:
            typeof p.category === "object" ? p.category.name : p.category,
          categoryId:
            typeof p.category === "object" ? p.category._id : p.category,
          slug: p.slug,
        }));
        setProducts(normalizedProducts);

        // ✅ Fetch Categories
        const resCategories = await axios.get(`${BACKEND_URL}/api/categories`);
        const normalizedCategories = resCategories.data.map((c) => ({
          _id: c._id,
          name: c.name,
          slug: c.slug,
        }));
        setCategories([{ _id: "all", name: "All" }, ...normalizedCategories]);
      } catch (err) {
        console.error("Error fetching:", err);
      }
    };
    fetchData();
  }, []);

  // Filter by search
  const searchFilteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group by category
  const groupedProducts = categories.reduce((acc, category) => {
    if (category._id === "all") return acc;
    acc[category.name] = searchFilteredProducts.filter(
      (p) => p.category === category.name
    );
    return acc;
  }, {});

  return (
    <div className="bg-white container text-[#0A174E] mb-15">
      {/* Page Title + Breadcrumb */}
      <div className="bg-backgroundlite py-4">
        <h1 className="text-3xl font-bold px-4">Our Products</h1>
        <AppBreadcrumbs />
      </div>

      {/* Search + Category Selector */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 px-2 md:px-0 w-full mt-10">
        <div className="flex flex-col">
          <p className="text-xl md:text-3xl font-semibold px-2 md:px-4 py-2">
            {/* ✅ Dynamic subtitle if available */}
            {products.length > 0
              ? products[0].subtitle || "Our Collection of Stylish Furniture"
              : "Our Collection of Stylish Furniture"}
          </p>
          <p className="text-gray-600 text-sm px-2 md:px-4">
            {products.length > 0
              ? products[0].description ||
                "Stylish furniture crafted for comfort, elegance, and everyday living."
              : "Stylish furniture crafted for comfort, elegance, and everyday living."}
          </p>
        </div>

        <div className="flex flex-row w-full gap-2 md:flex-1 md:justify-end">
          {/* Search Bar */}
          <div className="flex items-center flex-1 md:flex-initial md:max-w-[300px]">
            <input
              type="text"
              className="h-10 px-3 border-2 flex-1 rounded-l-md focus:outline-none"
              placeholder="Search Products"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex items-center justify-center h-10 px-3 cursor-pointer bg-primary rounded-r-md">
              <CiSearch color="white" size={20} />
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="w-[45%] md:w-auto">
            <select
              id="categories"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full md:w-auto border border-gray-300 rounded-md px-3 py-2"
            >
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="mt-6 px-4 space-y-12 py-4">
        {selectedCategory === "all" ? (
          <>
            {categories
              .filter((cat) => cat._id !== "all")
              .map((cat) => {
                const items = groupedProducts[cat.name] || [];
                if (items.length === 0) return null;
                return (
                  <div key={cat._id}>
                    <h2 className="text-xl font-semibold mb-4">
                      {cat.name}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                      {items.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </div>
                );
              })}
          </>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            {searchFilteredProducts
              .filter((p) => p.categoryId === selectedCategory)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        )}

        {searchFilteredProducts.length === 0 && (
          <p className="text-center col-span-full mt-4 text-gray-500">
            No products found.
          </p>
        )}
      </div>

      {/* Brand promotion */}
      <section>
        <div className="container flex items-center justify-center mt-10">
          <img
            src={BrandPromotion}
            alt="brandpromotion"
            className="sm:h-10 md:h-20 sm:px-4 md:px-10"
          />
        </div>
      </section>
    </div>
  );
}

export default Product;
