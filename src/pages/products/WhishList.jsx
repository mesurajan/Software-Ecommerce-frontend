// src/pages/WhishList.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist, clearWishlist } from "../../Apps/Reducers/wishlistSlice";
import { addToCart } from "../../Apps/Reducers/cartSlice";
import EmptyCartImg from "../../assets/images/empty-cart.png";
import { Link, useNavigate } from "react-router-dom";
import AppBreadcrumbs from "../../components/Breadcrumbs";
import { Trash2, Eye, ShoppingCart } from "lucide-react";

export default function WhishList() {
  const { items } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (chair) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to add products to your cart!");
      navigate("/login");
      return;
    }
    dispatch(
      addToCart({
        id: chair.id,
        title: chair.title,
        price: chair.price,
        chairimage: chair.chairimage,
        quantity: 1,
      })
    );
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 ">
        <img src={EmptyCartImg} alt="Empty Wishlist" className="w-60 h-60 object-contain mb-6" />
        <h2 className="text-2xl font-semibold text-[#0A174E] mb-2">Your Wishlist is empty</h2>
        <p className="text-gray-500 mb-4 text-center">
          Looks like you haven’t added anything to your Wishlist yet.
        </p>
        <Link
          to="/product"
          className="px-6 py-3 bg-blue-900 text-white rounded hover:bg-blue-800 transition"
        >
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white container text-[#0A174E] mb-15">
      {/* Header */}
      <div className="bg-backgroundlite py-4 px-4">
        <h1 className="text-3xl font-bold">Your Wishlist</h1>
        <AppBreadcrumbs />
      </div>

      <div className="flex flex-col gap-6 px-4 py-6">
        {/* Clear Wishlist Button */}
        <div className="flex md:items-center md:justify-between">
          <h1 className="text-2xl md:text-3xl font-bold">A little list of big dreams. 🌙</h1>
          <button
            className="px-6 py-2 text-white bg-blue-900 rounded hover:bg-blue-800"
            onClick={() => dispatch(clearWishlist())}
          >
            Clear Wishlist
          </button>
        </div>

     
        <div className="flex flex-col gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row bg-white rounded shadow-md overflow-hidden"
            >
              {/* Image */}
              <img
                src={item.chairimage}
                alt={item.title}
                className="w-full md:w-1/4 h-90 md:h-80 object-cover bg-backgroundlite "
              />

              {/* Content */}
                <div className="flex flex-col justify-center p-4 md:w-[450px]  md:ml-10">
                <div>
                    <h3 className="text-lg font-semibold text-center md:text-left">{item.title}</h3>
                    <p className="text-gray-600 text-center md:text-left">{item.price}</p>
                    {item.description && (
                    <p className="text-sm text-gray-500 mt-1 text-center md:text-left">
                        {item.description}
                    </p>
                    )}
                </div>

                {/* Action Icons */}
                <div className="flex gap-4 mt-8 justify-center md:justify-start">
                    {/* View */}
                    <Link
                    to={`/productDetails/${item.id}`}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-900 hover:bg-blue-200"
                    >
                    <Eye size={18} />
                    </Link>

                    {/* Add to Cart */}
                    <button
                    onClick={() => handleAddToCart(item)}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-700 hover:bg-green-200"
                    >
                    <ShoppingCart size={18} />
                    </button>

                    {/* Remove */}
                    <button
                    onClick={() => dispatch(removeFromWishlist(item.id))}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                    >
                    <Trash2 size={18} />
                    </button>
                </div>
                </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
