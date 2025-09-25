// src/components/ProductCard.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../Apps/Reducers/cartSlice";
import { addToWishlist } from "../Apps/Reducers/wishlistSlice";
import { ShoppingCart } from "lucide-react";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!product) return null;

  const normalized = {
    id: product.id,
    title: product.title || "Untitled Chair",
    price: product.price || 0,
    image: product.image || "/placeholder.png",
    link: product.link || `/productDetails/${product.id}`,
  };

  const handleWishlist = () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");
    dispatch(addToWishlist(normalized));
  };

  const handleCart = () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");
    dispatch(addToCart({ ...normalized, quantity: 1 }));
  };

  const handleBuyNow = () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");
    navigate("/Buynow", { state: { product: normalized } });
  };

  return (
    <div className="relative flex flex-col items-center p-4 bg-white shadow rounded border hover:shadow-xl transition">
      <div className="absolute top-2 right-2 flex gap-2">
        <button
          onClick={handleWishlist}
          className="p-2 bg-white rounded-full shadow hover:bg-pink-100"
        >
          <FaRegHeart className="text-pink-500" />
        </button>
        <button
          onClick={handleCart}
          className="p-2 bg-white rounded-full shadow hover:bg-blue-100"
        >
          <ShoppingCart size={16} />
        </button>
      </div>

      <div className="overflow-hidden rounded-lg">
        <img
          src={normalized.image}
          alt={normalized.title}
          className="w-full max-w-[220px] max-h-[240px] object-contain hover:scale-110 transition"
        />
      </div>

      <div className="mt-2 text-center">
        <h3 className="text-sm font-semibold">{normalized.title}</h3>
        <p className="text-xs text-gray-600">Rs.{normalized.price}</p>
      </div>

      <div className="mt-4 flex gap-2">
        <Link to={normalized.link}>
          <button className="viewdetails-btn">View Details</button>
        </Link>
        <button onClick={handleBuyNow} className="buynow-btn">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
