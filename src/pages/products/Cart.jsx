import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoMdRemove, IoMdAdd } from "react-icons/io";
import { BsTrash } from "react-icons/bs";
import {
  clearCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../Apps/Reducers/cartSlice";
import { FaRegHeart } from "react-icons/fa";
import EmptyCartImg from "../../assets/images/empty-cart.png";
import AppBreadcrumbs from "../../components/Breadcrumbs";
import {Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addToWishlist } from "../../Apps/Reducers/wishlistSlice";
const Cart = () => {

  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ➖ decrease qty
  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(decreaseQuantity({ id: item.id }));
    } else {
       // Optionally show a toast instead of removing
      // toast.info("Minimum quantity is 1");
      return;
   
    }
  };

  // ➕ increase qty
  const handleIncrease = (item) => {
    dispatch(increaseQuantity({ id: item.id }));
  };

  // ❌ remove item
  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart({ id }));
  
  };

  // 🛒 Buy Now → Checkout
  const handleBuyNow = (item) => {
    navigate("/paymentprocessing", {
      state: {
        buyNowItem: {
          id: item.id,
          title: item.title,
          price: item.price,
          chairimage: item.chairimage,
          quantity: item.quantity,
        },
      },
    });
  };

  const handleWishlist = (item) => {
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }

  dispatch(
    addToWishlist({
      id: item.id,
      title: item.title,
      price: item.price,
      chairimage: item.chairimage,
    })
  );
};


  // 💰 total price (same as old cart)
  const totalPrice = items.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  // 💳 normal checkout
  const handleCheckout = () => {
    navigate("/paymentprocessing", {
      state: {
        items,
      },
    });
  };

  return (
  <div  className="bg-white container mx-auto text-[#0A174E] mb-10 px-4 md:px-0">
    <div className="bg-backgroundlite py-4 pt-20">
        <h1 className="text-3xl font-bold px-4">Your Cart</h1>
        <AppBreadcrumbs />
      </div>
    <section className="p-6  mx-auto">
     

      {items.length === 0 ? (
           <div className="flex flex-col items-center justify-center py-20">
          <img
            src={EmptyCartImg}
            alt="Empty Cart"
            className="w-60 h-60 object-contain mb-6"
          />
          <h2 className="text-2xl font-semibold text-[#0A174E] mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-4 text-center">
            Looks like you haven’t added anything to your cart yet.
          </p>
          <Link
            to="/product"
            className="px-6 py-3 bg-blue-900 text-white rounded hover:bg-blue-800 transition"
          >
            Go Shopping
          </Link>
        </div>
      ) : (
        <>
          {/* CART ITEMS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="relative bg-white shadow hover:shadow-lg transition p-4"
              >
                {/* Remove */}
                <div className="absolute top-3 right-3 flex gap-2">
                   <button
                          onClick={() => handleWishlist(item)}
                           className="p-2 bg-white rounded-full shadow hover:bg-pink-100"
                         >
                           <FaRegHeart className="text-pink-500 size-3 md:size-4" />
                         </button> 
                <button
                  onClick={() => {
                    const confirmDelete = window.confirm(
                      "Are you sure you want to remove this item from your cart?"
                    );
                    if (confirmDelete) {
                      handleRemoveFromCart(item.id);
                    }
                  }}
                  className="p-1 bg-white rounded-full shadow hover:bg-red-100 text-red-500"
                >
                  <BsTrash size={14} />
                </button>
              </div>


                {/* Image */}
                <div className="w-full h-36 flex items-center justify-center mb-3 overflow-hidden">
                  <img
                    src={item.chairimage}
                    alt={item.title}
                    className="max-w-full max-h-full object-contain hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <h3 className="text-sm font-semibold line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                  Rs. {item.price}
                </p>

                {/* Quantity + Price */}
                <div className="flex items-center justify-between border-t mt-3 pt-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDecrease(item)}
                      className="p-1 bg-gray-100 hover:bg-gray-200"
                    >
                      <IoMdRemove size={14} />
                    </button>

                    <span className="text-sm font-medium">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => handleIncrease(item)}
                      className="p-1 bg-gray-100 hover:bg-gray-200"
                    >
                      <IoMdAdd size={14} />
                    </button>
                  </div>

                  <span className="text-sm font-semibold">
                    Rs. {(Number(item.price) * item.quantity).toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={() => handleBuyNow(item)}
                  className="mt-3 w-full bg-[#02573d] hover:bg-[#044633] rounded-[6px] text-white py-1.5 text-sm"
                >
                  Buy Now
                </button>
              </div>
            ))}
          </div>

          {/* FOOTER */}
          <div className="mt-8 p-4 bg-white shadow flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-lg font-semibold">
              Total:{" "}
              <span className="text-[#0A174E]">
                Rs. {totalPrice.toLocaleString()}
              </span>
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  const confirmDelete = window.confirm(
                    "Are you sure you want to clear your cart?"
                  );
                  if (confirmDelete) {
                    dispatch(clearCart());
                  }
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-[6px]"
              >
                Clear Cart
              </button>
              <button
                onClick={handleCheckout}
                className="px-4 py-2 bg-[#031d8f] hover:bg-[#0A174E] text-white rounded-[6px]"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </section>
 </div>
  );
};

export default Cart;
