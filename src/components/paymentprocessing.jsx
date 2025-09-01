// src/pages/PaymentProcessing.jsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import AppBreadcrumbs from "./Breadcrumbs";

function PaymentProcessing() {
  const location = useLocation();
  const navigate = useNavigate();
  const { items: cartItems } = useSelector((state) => state.cart);

  // ✅ Grab product (if direct BuyNow)
  const { product } = location.state || {};

  // ✅ Checkout items
  const checkoutItems = product
    ? [{ ...product, quantity: product.quantity || 1 }]
    : cartItems;

  if (!checkoutItems || checkoutItems.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold">No items in checkout!</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Back to Home
        </button>
      </div>
    );
  }

  // ✅ Totals
  const subtotal = checkoutItems.reduce(
    (acc, item) => acc + Number(item.price) * (item.quantity || 1),
    0
  );
  const deliveryFee = 140;
  const total = subtotal + deliveryFee;

  // ✅ Shipping form state
  const [shipping, setShipping] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handleConfirmPayment = () => {
    if (!shipping.name || !shipping.phone || !shipping.address) {
      alert("⚠️ Please fill in all shipping details before proceeding.");
      return;
    }
    alert(
      `✅ Payment Successful!\n\nShipping To:\n${shipping.name}, ${shipping.phone}, ${shipping.address}\nTotal: Rs. ${total}`
    );
    navigate("/"); // Redirect to home after success
  };

  return (
    <div className="container">
      
      <div className="bg-backgroundlite py-4">
        <h1 className="text-3xl font-bold px-4 text-mainbackground">Payment</h1>
        <AppBreadcrumbs />
      </div>


    <div className="max-w-6xl mx-auto p-6 bg-white shadow rounded grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left Side - Order Details */}
      <div className="md:col-span-2 border p-4 rounded bg-gray-50">
        <h3 className="text-xl font-bold mb-4">Order Details</h3>
        {checkoutItems.map((item, idx) => (
          <div
            key={item.id || idx}
            className="flex items-center gap-4 border-b pb-4 mb-4 last:border-0 last:pb-0 last:mb-0"
          >
            <img
              src={item.chairimage}
              alt={item.title}
              className="w-24 h-24 object-contain border"
            />
            <div>
              <p className="font-semibold">{item.title}</p>
              <p className="text-green-600 font-bold">
                Rs. {item.price} × {item.quantity || 1}
              </p>
              <p>Qty: {item.quantity || 1}</p>
              <p className="font-semibold">
                Rs. {(Number(item.price) * (item.quantity || 1)).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Right Side - Shipping + Payment */}
      <div className="border p-4 rounded space-y-6 bg-gray-50">
        {/* Shipping Form */}
        <div>
          <h3 className="text-lg font-bold mb-2">Shipping Details</h3>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={shipping.name}
            onChange={handleChange}
            className="w-full mb-2 px-3 py-2 border rounded"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={shipping.phone}
            onChange={handleChange}
            className="w-full mb-2 px-3 py-2 border rounded"
          />
          <textarea
            name="address"
            placeholder="Full Address"
            value={shipping.address}
            onChange={handleChange}
            className="w-full mb-2 px-3 py-2 border rounded"
            rows="3"
          />
        </div>

        {/* Payment Methods */}
        <div>
          <h3 className="text-lg font-bold mb-2">Payment Method</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input type="radio" name="payment" defaultChecked />
              <span>Cash on Delivery</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="payment" />
              <span>Credit / Debit Card</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="payment" />
              <span>eSewa / Khalti</span>
            </label>
          </div>
        </div>

        {/* Price Summary */}
        <div>
          <h3 className="text-lg font-bold mb-2">Price Summary</h3>
          <div className="flex justify-between">
            <span>Items Total:</span>
            <span>Rs. {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee:</span>
            <span>Rs. {deliveryFee}</span>
          </div>
          <div className="flex justify-between font-bold text-lg mt-2">
            <span>Total:</span>
            <span>Rs. {total.toFixed(2)}</span>
          </div>
        </div>

        {/* Confirm Payment */}
        <button
          onClick={handleConfirmPayment}
          className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Confirm Payment
        </button>
      </div>
    </div>
  </div>
  );
}

export default PaymentProcessing;
