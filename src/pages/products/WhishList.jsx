// src/pages/WhishList.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist, clearWishlist } from "../../Apps/Reducers/wishlistSlice";
import { addToCart } from "../../Apps/Reducers/cartSlice";
import EmptyCartImg from "../../assets/images/empty-cart.png";
import { Link, useNavigate } from "react-router-dom";
import AppBreadcrumbs from "../../components/Breadcrumbs";
import { Trash2, ShoppingCart } from "lucide-react";
import DreamChair from "../../assets/images/dreams.png";

// ✅ Slugify function (same as ProductCard)
const slugify = (str) =>
  str?.toString().toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "") || "product";

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
      <div className="flex flex-col items-center justify-center py-20">
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
      <div className="bg-backgroundlite py-4  pt-20">
        <h1 className="text-3xl font-bold px-4">Your WhishList</h1>
        <AppBreadcrumbs />
      </div>

      <div className="flex flex-col gap-6 px-4 py-6">
        {/* Clear Wishlist Button */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">A little list of big dreams. 🌙</h1>
            <p className="text-gray-500 mt-1">
              Don’t wait too long… the best pieces won’t stay forever! ⏳
            </p>
          </div>

          <button
            onClick={() => {
              const confirmDelete = window.confirm(
                "Are you sure you want to clear your Wishlist?"
              );
              if (confirmDelete) {
                dispatch(clearWishlist());
              }
            }}
            className="viewdetails-btn hidden md:block"
          >
            Clear Wishlist
          </button>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 md:px-4 py-6">
          {items.map((item) => {
            const slug = slugify(item.title);
            const productLink = `/productdetails/${item.id}/${slug}`;

            return (
              <div
                key={item.id}
                className="relative flex flex-col bg-white rounded shadow-md overflow-hidden h-full border border-gray-200 
                           transition-all duration-300 ease-in-out transform hover:shadow-xl hover:-translate-y-2"
              >
                {/* Top-right icons */}
                <div className="absolute top-2 right-2 flex gap-2 z-20">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex items-center justify-center w-6 h-6 md:w-10 md:h-10 rounded-full shadow  bg-white text-[#0A174E] hover:bg-blue-100"
                    title="Add to Cart"
                  >
                    <ShoppingCart className="size-3 md:size-4" />
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
                    className="flex items-center justify-center w-6 h-6 md:w-10 md:h-10 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                  >
                    <Trash2 className="size-3 md:size-4" />
                  </button>
                </div>

                {/* Image (fixed size) */}
                <div className="w-[100px] h-[140px] md:w-[200px] md:h-[240px] flex items-center justify-center overflow-hidden rounded-lg bg-white mx-auto mt-4 mb-2">
                 <img
                    src={
                      item.chairimage?.startsWith("http")
                        ? item.chairimage
                        : `${import.meta.env.VITE_BACKEND_URL}/uploads/product/${item.chairimage}`
                    }
                    alt={item.title}
                    className="max-w-full max-h-full object-contain hover:scale-110 transition-transform duration-300"
                  />
                </div>
                

                {/* Content */}
                <div className="flex flex-col items-center text-center px-2 flex-grow">
                  <h3 className="text-sm md:text-base font-semibold mb-1 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600">Rs.{item.price}</p>
                  {item.description && (
                    <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                  )}
                </div>

                {/* Bottom Buttons */}
                <div className="mt-3 mb-3 flex gap-2 justify-center">
                  <Link to={productLink}>
                    <button className="viewdetails-btn whitespace-nowrap">View Details</button>
                  </Link>
                  <button
                    onClick={() => {
                      const token = localStorage.getItem("token");
                      if (!token) {
                        alert("Please login to continue with Buy Now!");
                        navigate("/login");
                        return;
                      }
                     navigate("/paymentprocessing", {
                        state: {
                          buyNowItem: {
                            id: item.id,
                            title: item.title,
                            price: item.price,
                            chairimage: item.chairimage,
                            quantity: 1,
                          },
                        },
                      });
                    }}
                    className="buynow-btn whitespace-nowrap"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-center text-center px-6 py-10 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-inner gap-6 md:gap-16">
          <div className="flex items-center justify-center">
            <img
              src={DreamChair}
              alt="Dream Chair"
              className="w-45 h-45 md:w-[380px] md:h-[380px]"
            />
          </div>

          <div>
            <h2 className="text-xl md:text-3xl font-bold text-[#0A174E]">
              Turning dreams into reality ✨
            </h2>
            <p className="text-gray-600 mt-2 max-w-lg mb-4 md:mb-8 text-justify">
              Your wishlist is more than just a list — it’s a collection of your style, your
              comfort, and your dreams for the perfect space. Every piece you’ve saved tells a
              story of how you want your home to feel. Don’t let your favorites slip away — bring
              them home today and start turning your dream space into a reality. ✨
            </p>

            <button className="viewdetails-btn py-2">
              <Link to="/product">Continue Shopping</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
