import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBreadcrumbs from "../../components/Breadcrumbs";
import { Products } from "../../assets/productmockdata";
import { CiSearch } from "react-icons/ci";
import BrandPromotion from "../../assets/images/Home/BrandPromotion.png"; 
import ProductCard from "../../components/ProductCard"; // 

function Product() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const categories = ["all", "chairs", "beds", "tables", "wardrobes"];

  // Filtered products by search term
  const searchFilteredProducts = Products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group products by category
  const groupedProducts = categories.reduce((acc, category) => {
    if (category === "all") return acc;
    acc[category] = searchFilteredProducts.filter(
      (p) => p.category === category
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
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 px-2 md:px-0 w-full">
        {/* Curated Text */}
        <p className="text-xl md:text-3xl font-semibold px-2 md:px-4 md:text-left py-2 md:py-8">
          Our Collection of Stylish Furniture
        </p>

        {/* Search + Category Wrapper */}
        <div className="flex flex-row w-full gap-2 md:flex-1 md:justify-end">
          {/* Search Bar */}
          <div className="flex items-center flex-1 md:flex-initial md:max-w-[300px]">
            <input
              type="text"
              className="h-10 px-3 border-2 focus:outline-none flex-1 rounded-l-md"
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
            <label htmlFor="categories" className="sr-only">
              Select Category
            </label>
            <select
              id="categories"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full md:w-auto border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="mt-6 px-4 md:px-4 space-y-12 py-4 md:py-8">
        {selectedCategory === "all" ? (
          // Show grouped by category
          <>
            {["chairs", "beds", "tables", "wardrobes"].map((cat) => {
              const items = groupedProducts[cat] || [];
              if (items.length === 0) return null;
              return (
                <div key={cat}>
                  <h2 className="text-2xl font-bold mb-6 capitalize">
                    {cat} In Our Collection
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
          // Show only selected category
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            {searchFilteredProducts
              .filter((p) => p.category === selectedCategory)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        )}

        {/* No results */}
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
