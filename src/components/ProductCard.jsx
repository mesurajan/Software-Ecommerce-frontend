// src/components/ProductCard.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { BsCart } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addToCart } from "../Apps/Reducers/cartSlice";
import { addToWishlist } from "../Apps/Reducers/wishlistSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!product) return null;

  // 👉 Handle Wishlist
  const handleAddToWishlist = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to add products to your Wishlist!");
      navigate("/login");
      return;
    }
    dispatch(
      addToWishlist({
        id: product.id,
        title: product.title,
        price: product.price,
        chairimage: product.chairimage || product.image,
      })
    );
  };

  // 👉 Handle Cart
  const handleAddToCart = () => {
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
        chairimage: product.chairimage || product.image,
        quantity: 1,
      })
    );
  };

  // 👉 Handle Buy Now
  const handleBuyNow = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to continue with Buy Now!");
      navigate("/login");
      return;
    }
    navigate("/Buynow", { state: { product } });
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-4 rounded bg-white shadow border border-gray-200 
      transition-all duration-300 ease-in-out transform hover:shadow-xl hover:-translate-y-2">
      {/* Wishlist + Cart icons */}
      <div className="absolute top-2 right-2 flex gap-2">
        <button
          onClick={handleAddToWishlist}
          className="p-2 bg-white rounded-full shadow hover:bg-pink-100 transition"
          title="Add to Wishlist"
        >
          <FaRegHeart className="text-pink-500" />
        </button>
        <button
          onClick={handleAddToCart}
          className="p-2 bg-white rounded-full shadow hover:bg-blue-100 transition"
          title="Add to Cart"
        >
          <BsCart className="text-blue-600" />
        </button>
      </div>

      {/* Product Image with hover zoom */}
      <div className="overflow-hidden rounded-lg">
        <img
          src={product.chairimage || product.image}
          alt={product.title}
          className="w-full max-w-[220px] max-h-[240px] object-contain transition-transform duration-300 ease-in-out hover:scale-110"
        />
      </div>

      {/* Product Info */}
      <div className="mt-2 text-center">
        <h3 className="text-sm font-semibold text-gray-800">{product.title}</h3>
        <p className="text-xs text-gray-600">Rs.{product.price}</p>
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-2">
        <Link to={`/productDetails/${product.id}`}>
          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition">
            View Details
          </button>
        </Link>
        <button
          onClick={handleBuyNow}
          className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
