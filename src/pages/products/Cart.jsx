// src/pages/Cart.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../Apps/Reducers/cartSlice";
import EmptyCartImg from "../../assets/images/empty-cart.png";
import { Link, useNavigate } from "react-router-dom";
import AppBreadcrumbs from "../../components/Breadcrumbs";

function Cart() {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    country: "",
    city: "",
    postal: "",
  });

  const handleShippingChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleCalculateShipping = () => {
    alert(
      `Shipping calculated for ${shippingInfo.country}, ${shippingInfo.city}, ${shippingInfo.postal}`
    );
  };

  // ✅ Calculate total price
  const totalPrice = items.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  const handleCheckout = () => {
    navigate("/paymentprocessing", {
      state: { cartItems: items, shippingInfo },
    });
  };

  return (
    <div className="bg-white container mx-auto text-[#0A174E] mb-10 px-4 md:px-0">
      <div className="bg-backgroundlite py-4 pt-20">
        <h1 className="text-3xl font-bold px-4">Your Cart</h1>
        <AppBreadcrumbs />
      </div>

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
        <div className="flex flex-col md:flex-row gap-6 mt-6">
          {/* Left: Cart Items */}
          <div className="flex-1 flex flex-col gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row justify-between items-center p-4 border rounded"
              >
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <img
                    src={item.chairimage}
                    alt={item.title}
                    className="w-24 h-24 object-cover bg-backgroundlite rounded"
                  />

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
                  
                </div>

                {/* Price & Quantity */}
                <div className="flex items-center gap-4 mt-4 md:mt-0 flex-wrap justify-center">
                  <p className="font-semibold">
                    Rs. {Number(item.price).toLocaleString()}
                  </p>

                  {/* ✅ Quantity controls */}
                  <div className="flex items-center gap-2 border rounded px-2 py-1">
                    <button
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() => dispatch(decreaseQuantity({ id: item.id }))}
                    >
                      −
                    </button>
                    <span className="min-w-[30px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() => dispatch(increaseQuantity({ id: item.id }))}
                    >
                      +
                    </button>
                  </div>

                  <p className="font-semibold">
                    Rs. {(Number(item.price) * item.quantity).toLocaleString()}
                  </p>
                  <button
                    className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                    onClick={() => dispatch(removeFromCart({ id: item.id }))}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}

            {/* Cart Actions */}
            <div className="flex gap-4 mt-4">
              <button
                className="px-6 py-2 bg-primary text-white rounded hover:bg-primary"
                onClick={() => dispatch(clearCart())}
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Right: Cart Totals & Shipping */}
          <div className="md:w-1/3 flex flex-col gap-6 mt-6 md:mt-0">
            <div className="p-4 border rounded">
              <h3 className="font-semibold mb-4 text-lg">Cart Totals</h3>
              <div className="flex justify-between mb-2">
                <span>Subtotals:</span>
                <span>Rs. {totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Totals:</span>
                <span>Rs. {(totalPrice + 140).toLocaleString()}</span>
              </div>
              <p className="text-green-500 text-sm mb-4">
                Shipping & taxes calculated at checkout
              </p>
              <button
                onClick={handleCheckout}
                className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Proceed To Checkout
              </button>
            </div>

            <div className="p-4 border rounded">
              <h3 className="font-semibold mb-4 text-lg">Calculate Shipping</h3>
              <input
                type="text"
                placeholder="Country"
                name="country"
                value={shippingInfo.country}
                onChange={handleShippingChange}
                className="w-full border px-2 py-1 mb-2 rounded"
              />
              <input
                type="text"
                placeholder="City"
                name="city"
                value={shippingInfo.city}
                onChange={handleShippingChange}
                className="w-full border px-2 py-1 mb-2 rounded"
              />
              <input
                type="text"
                placeholder="Postal Code"
                name="postal"
                value={shippingInfo.postal}
                onChange={handleShippingChange}
                className="w-full border px-2 py-1 mb-2 rounded"
              />
              <button
                className="w-full py-2 bg-primary text-white rounded transform transition-transform duration-300 hover:scale-105"
                onClick={handleCalculateShipping}
              >
                Calculate Shipping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
