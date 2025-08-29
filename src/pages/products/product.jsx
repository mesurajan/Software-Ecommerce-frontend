import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBreadcrumbs from '../../components/Breadcrumbs';
import { Products } from '../../assets/productmockdata';
import { CiSearch } from 'react-icons/ci';
import { useDispatch } from "react-redux";
import { addToCart } from "../../Apps/Reducers/cartSlice";
import { FaRegHeart } from "react-icons/fa";
import { BsCart } from "react-icons/bs";
import BrandPromotion from "../../assets/images/Home/BrandPromotion.png"; 
import { useNavigate } from "react-router-dom";
import { addToWishlist } from "../../Apps/Reducers/wishlistSlice";

function Product() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const categories = ['all', 'chairs', 'beds', 'tables', 'wardrobes'];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchFilteredProducts = Products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group products by category
  const groupedProducts = categories.reduce((acc, category) => {
    if (category === 'all') return acc;
    acc[category] = searchFilteredProducts.filter(p => p.category === category);
    return acc;
  }, {});

  const handleAddToWishlist = (product) => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to add products to your Wishlist!");
        navigate("/login");
        return;
      }
      dispatch(addToWishlist(product));
    };

const handleAddToCart = (product) => {

  const token = localStorage.getItem("token");
  if (!token) {
  alert("Please login to add products to your cart!");
    navigate("/login");
    return;
  }

  dispatch(
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      chairimage: product.chairimage,
    })
  );
};
  

  return (
    <div className='bg-white container text-[#0A174E] mb-15'>
      {/* Page Title + Breadcrumb */}
      <div className='bg-backgroundlite py-4'>
        <h1 className='text-3xl font-bold px-4'>Our Products</h1>
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
              <label htmlFor="categories" className="sr-only">Select Category</label>
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
        {selectedCategory === 'all' ? (
          // Show grouped by category
          <>
            {['chairs', 'beds', 'tables', 'wardrobes'].map((cat) => {
              const items = groupedProducts[cat] || [];
              if (items.length === 0) return null;
              return (
                <div key={cat}>
                  <h2 className="text-2xl font-bold mb-6 capitalize">
                    {cat} In Our Collection
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                    {items.map((product) => (
                      <div
                        key={product.id}
                        className="relative flex flex-col items-center p-4 rounded bg-background-secondary hover:border-2 hover:border-blue-900 transition-all duration-300"
                      >
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => handleAddToWishlist(product)}
                      className="p-2 bg-white rounded-full shadow hover:bg-pink-100"
                      title="Add to Wishlist"
                    >
                      <FaRegHeart className="text-pink-500" />
                    </button>
                    <button
                      onClick={() => handleAddToCart(product)} 
                      className="p-2 bg-white rounded-full shadow hover:bg-blue-100"
                      title="Add to Cart"
                    >
                      <BsCart className="text-blue-600" />
                    </button>
                  </div>
                        
                        <img
                          src={product.chairimage}
                          alt={product.title}
                          className="w-full h-[240px] object-contain mb-2"
                        />
                        <div className="text-center mb-4 flex-1">
                          <h3 className="text-lg font-semibold">{product.title}</h3>
                          <p className="text-blue-900 font-bold mt-1">{product.price}</p>
                        </div>
                        <div className="flex gap-2 w-full justify-center mt-auto mb-2">
                          <Link to={`/productDetails/${product.id}`} className="flex-1">
                            <button className="w-full px-3 py-1 bg-blue-900 text-white rounded hover:bg-blue-700 transition">
                              View Details
                            </button>
                          </Link>
                        <button 
                        onClick={() => navigate("/Buynow", { state: { product } })}
                        className="flex-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-500 transition"
                      >
                        Buy Now
                      </button>
                        </div>
                      </div>
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
                <div
                  key={product.id}
                  className="relative flex-col items-center p-4 rounded bg-background-secondary hover:border-2 hover:border-blue-900 transition-all duration-300"
                >
                   <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => handleAddToWishlist(product)}
                      className="p-2 bg-white rounded-full shadow hover:bg-pink-100"
                      title="Add to Wishlist"
                    >
                      <FaRegHeart className="text-pink-500" />
                    </button>
                    <button
                      onClick={() => handleAddToCart(product)} 
                      className="p-2 bg-white rounded-full shadow hover:bg-blue-100"
                      title="Add to Cart"
                    >
                      <BsCart className="text-blue-600" />
                    </button>
                  </div>
                  <img
                    src={product.chairimage}
                    alt={product.title}
                    className="w-full h-[240px] object-contain mb-2"
                  />
                  <div className="text-center mb-4 flex-1">
                    <h3 className="text-lg font-semibold">{product.title}</h3>
                    <p className="text-blue-900 font-bold mt-1">{product.price}</p>
                  </div>
                  <div className="flex gap-2 w-full justify-center mt-auto mb-2">
                    <Link to={`/productDetails/${product.id}`} className="flex-1">
                      <button className="w-full px-3 py-1 bg-blue-900 text-white rounded hover:bg-blue-700 transition">
                        View Details
                      </button>
                    </Link>
                    <button className="flex-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-500 transition">
                      Buy Now
                    </button>
                  </div>
                </div>
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


            {/*  Brand promotion */}
            <section>
              <div className="container flex items-center justify-center mt-10">
                <img src={BrandPromotion} alt="brandpromotion" className="sm:h-10 md:h-20 sm:px-4 md:px-10"/>
              </div>
            </section>
      
    </div>
  );
}

export default Product;
