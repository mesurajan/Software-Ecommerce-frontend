import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import premiumsection from "../../assets/aboutus/hero-furniture.jpg"; // adjust path

function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const placeOrder = async () => {
      const token = localStorage.getItem("token");
      const orderData = JSON.parse(localStorage.getItem("pendingOrder"));

      if (!orderData) return;

      try {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/orders/my`,
          orderData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        localStorage.removeItem("pendingOrder");
        localStorage.removeItem("cart");
      } catch (err) {
        console.error("Failed to save order:", err);
      }
    };

    placeOrder();
  }, []);

  return (
    <div className="container ">


<section
  className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden"
  style={{
    backgroundImage: `url(${premiumsection})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-[#0A174E]/90 via-[#0A174E]/70 to-[#0A174E]t"></div>

  {/* Content */}
  <div className="relative z-10 bg-white bg-opacity-90 p-10 rounded-3xl shadow-2xl text-center max-w-md w-full">
    <h1 className="text-5xl font-extrabold text-green-600 mb-4 animate-bounce">
      🎉 Success!
    </h1>
    <p className="text-gray-700 mb-6">
      Your payment has been successfully processed and your order is confirmed.
    </p>
    <div className="flex justify-center gap-4">
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold shadow-lg hover:scale-105 transform transition"
      >
        Back to Home
      </button>
      <button
        onClick={() => navigate("/myorders")}
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold shadow-lg hover:scale-105 transform transition"
      >
        View My Orders
      </button>
    </div>
  </div>
</section>

        </div>
  );
}

export default PaymentSuccess;
