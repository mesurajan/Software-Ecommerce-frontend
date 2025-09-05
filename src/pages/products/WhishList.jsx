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
       <div className="bg-backgroundlite py-4">
        <h1 className="text-3xl font-bold px-4">Your WhishList</h1>
        <AppBreadcrumbs />
      </div>

      <div className="flex flex-col gap-6 px-4 py-6">
        {/* Clear Wishlist Button */}
        <div className="flex md:items-center md:justify-between">
          <h1 className="text-2xl md:text-3xl font-bold">A little list of big dreams. 🌙</h1>
          <button
          onClick={() => {
                  const confirmDelete = window.confirm(
                    "Are you sure you want to clear your Wishlist?"
                  );
                  if (confirmDelete) {
                    dispatch(clearWishlist());
                  }
                }}
       
            className="px-6 py-2 text-white bg-blue-900 rounded hover:bg-blue-800"
            
          >
            Clear Wishlist
          </button>
        </div>


        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4 py-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="relative flex flex-col bg-white rounded shadow-md overflow-hidden h-full shadow border border-gray-200 
               transition-all duration-300 ease-in-out transform hover:shadow-xl hover:-translate-y-2"
            >
              {/* Top-right icons */}
              <div className="absolute top-2 right-2 flex gap-2 z-10">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="p-2 bg-white rounded-full shadow hover:bg-blue-100 transition"
                  title="Add to Cart"
                >
                  <ShoppingCart size={18} />
                </button>
              
               <button
                onClick={() => {
                  const confirmDelete = window.confirm(
                    "Are you sure you want to delete this item from your Wishlist?"
                  );
                  if (confirmDelete) {
                    dispatch(removeFromWishlist(item.id));
                  }
                }}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
              >
                <Trash2 size={18} />
              </button>

              </div>

              {/* Image */}
              <div className="flex justify-center items-center bg-gray-50 p-4">
                <img
                  src={item.chairimage}
                  alt={item.title}
                  className="max-w-full max-h-60 object-contain transition-transform duration-300 ease-in-out hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col items-center justify-center p-4">
                <h3 className="text-lg font-semibold text-center">{item.title}</h3>
                <p className="text-gray-600 text-center">Rs.{item.price}</p>
                {item.description && (
                  <p className="text-sm text-gray-500 mt-1 text-center">{item.description}</p>
                )}
              </div>

              {/* Bottom Buttons */}
              <div className="flex gap-2 justify-center p-4">
                <Link to={`/productDetails/${item.id}`}>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                    View Details
                  </button>
                </Link>
                <button
                  onClick={() => {
                    const token = localStorage.getItem("token");
                    if (!token) {
                      alert("Please login to continue with Buy Now!");
                      navigate("/login");
                      return;
                    }
                    navigate("/Buynow", { state: { product: item } });
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>


     
       

         
      </div>
    </div>
  );
}
