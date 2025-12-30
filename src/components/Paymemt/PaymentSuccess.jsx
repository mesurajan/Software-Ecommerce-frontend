import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const placeOrder = async () => {
      const token = localStorage.getItem("token");
      const orderData = JSON.parse(localStorage.getItem("pendingOrder"));

      if (!orderData) return;

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders`,
        orderData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      localStorage.removeItem("pendingOrder");
      localStorage.removeItem("cart");
    };

    placeOrder();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded shadow text-center">
        <h1 className="text-3xl font-bold text-green-600">🎉 Order Placed!</h1>
        <button
          onClick={() => navigate("/myorders")}
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded"
        >
          View My Orders
        </button>
      </div>
    </div>
  );
}

export default PaymentSuccess;
