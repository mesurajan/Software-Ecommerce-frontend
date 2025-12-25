// src/pages/PaymentSuccess.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-6">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">🎉 Payment Successful!</h1>
        <p className="text-gray-700 mb-6">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default PaymentSuccess;
