// src/components/ProductCard.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../Apps/Reducers/cartSlice";
import { addToWishlist } from "../Apps/Reducers/wishlistSlice";
import { ShoppingCart } from "lucide-react";

const slugify = (str) =>
  str?.toString().toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "") || "product";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5174";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!product) return null;

  const normalized = {
    id: product._id || product.id,
    title: product.title || "Untitled Product",
    price: product.price || 0,
    image: product.image?.startsWith("http")
      ? product.image
      : `${BACKEND_URL}${product.image || "/uploads/Default/lightimage.png"}`,
    slug: product.slug || slugify(product.title),
  };

  const productLink = `/productdetails/${normalized.id}/${normalized.slug}`;

  const handleWishlist = () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    dispatch(
      addToWishlist({
        id: normalized.id,
        title: normalized.title,
        price: normalized.price,
        chairimage: normalized.image,
      })
    );
    alert("Product added to wishlist!");
  };

  const handleCart = () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    dispatch(
      addToCart({
        id: normalized.id,
        title: normalized.title,
        price: normalized.price,
        chairimage: normalized.image,
        quantity: 1,
      })
    );
    alert("Product added to cart!");
  };

  const handleBuyNow = () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    dispatch(
      addToCart({
        id: normalized.id,
        title: normalized.title,
        price: normalized.price,
        chairimage: normalized.image,
        quantity: 1,
      })
    );

    navigate("/Buynow", { state: { product: normalized } });
  };

  return (
    <div className="relative flex flex-col items-center p-4 bg-white shadow rounded border hover:shadow-xl transition">
      {/* Wishlist + Cart Buttons */}
      <div className="absolute top-2 right-2 flex gap-2">
        <button
          onClick={handleWishlist}
          className="p-2 bg-white rounded-full shadow hover:bg-pink-100"
        >
          <FaRegHeart className="text-pink-500 size-3 md:size-4" />
        </button>
        <button
          onClick={handleCart}
          className="p-2 bg-white rounded-full shadow hover:bg-blue-100"
        >
          <ShoppingCart className="size-3 md:size-4" />

        </button>
      </div>

      {/* Product Image */}
      <div className="w-[100px] h-[140px] md:w-[200px] md:h-[240px] flex items-center justify-center overflow-hidden rounded-lg bg-white mb-1">
        <img
          src={normalized.image}
          alt={normalized.title}
          className="max-w-full max-h-full object-contain hover:scale-110 transition-transform duration-300 ease-in-out"
        />
      </div>

      {/* Product Info */}
      <div className="mt-2 text-center">
        <h3 className="text-sm font-semibold">{normalized.title}</h3>
        <p className="text-xs text-gray-600">Rs.{normalized.price}</p>
      </div>

      {/* Action Buttons */}
     <div className="mt-4 flex flex-nowrap gap-1">
      <Link to={productLink}>
        <button className="viewdetails-btn whitespace-nowrap">View Details</button>
      </Link>
      <button onClick={handleBuyNow} className="buynow-btn whitespace-nowrap">
        Buy Now
      </button>
    </div>

    </div>
  );
};

export default ProductCard;
