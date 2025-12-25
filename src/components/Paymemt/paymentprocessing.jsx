import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import {
  FaMoneyBillWave,
  FaUniversity,
  FaMobileAlt,
} from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const PaymentProcessing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { items: cartItems } = useSelector((state) => state.cart);

  // Get Buy Now item from route state if present
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    if (location.state?.buyNowItem) {
      setOrderItems([location.state.buyNowItem]); // single Buy Now item
    } else {
      setOrderItems(cartItems); // default to cart items
    }
  }, [location.state, cartItems]);

  /* =======================
     SHIPPING STATE
  ======================== */
  const [shipping, setShipping] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [selectedPayment, setSelectedPayment] = useState("");

  /* =======================
     PRICE CALCULATION
  ======================== */
  const shippingCharge = 140;

  const subtotal = orderItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  const totalPrice = subtotal + shippingCharge;

  const orderId = `ORD-${Date.now()}`;
  const orderDate = new Date().toLocaleDateString();

  /* =======================
     HANDLERS
  ======================== */
  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handleCancel = () => navigate("/cart");

  const handlePayment = async () => {
    if (!shipping.name || !shipping.phone || !shipping.address) {
      toast.error("Please fill all shipping details");
      return;
    }

    if (!selectedPayment) {
      toast.error("Please select a payment method");
      return;
    }

    if (selectedPayment === "cod") {
      toast.success("Order placed successfully (COD)");
      navigate("/");
      return;
    }

    if (selectedPayment === "esewa") {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/payment/esewa/initiate`,
          {
            items: orderItems,
            shipping,
            subtotal,
            deliveryFee: shippingCharge,
            total: totalPrice,
          }
        );

        if (res.data.success) {
          const { esewaUrl, params } = res.data;

          const form = document.createElement("form");
          form.method = "POST";
          form.action = esewaUrl;

          Object.keys(params).forEach((key) => {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            input.value = params[key];
            form.appendChild(input);
          });

          document.body.appendChild(form);
          form.submit();
        } else {
          toast.error("Failed to initiate eSewa payment");
        }
      } catch (error) {
        console.error(error);
        toast.error("eSewa payment error");
      }
      return;
    }

    toast.info("This payment method will be available soon 🚧");
  };

  const paymentMethods = [
    {
      id: "esewa",
      name: "eSewa",
      icon: <FaMobileAlt />,
      color: "bg-green-600",
      desc: "Pay using your eSewa wallet",
    },
    {
      id: "khalti",
      name: "Khalti",
      icon: <FaMobileAlt />,
      color: "bg-purple-600",
      desc: "Fast and secure Khalti payment",
    },
    {
      id: "banking",
      name: "Net Banking",
      icon: <FaUniversity />,
      color: "bg-blue-600",
      desc: "Pay directly from your bank",
    },
    {
      id: "cod",
      name: "Cash on Delivery",
      icon: <FaMoneyBillWave />,
      color: "bg-gray-800",
      desc: "Pay when your order arrives",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 flex justify-center pt-40">
      <ToastContainer />

      <div className="bg-white rounded-3xl shadow-xl w-full max-w-6xl p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 ">
        {/* LEFT — ORDER DETAILS */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Order Details</h2>

          <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Order ID</span>
              <span>{orderId}</span>
            </div>
            <div className="flex justify-between">
              <span>Order Date</span>
              <span>{orderDate}</span>
            </div>
            <div className="flex justify-between">
              <span>Status</span>
              <span className="text-orange-600 font-semibold">Pending</span>
            </div>
          </div>

          <div className="border rounded-xl p-4 space-y-4 max-h-[400px] overflow-y-auto">
            {orderItems.map((item, idx) => (
              <div key={idx} className="flex gap-4 items-center">
                <img
                  src={item.chairimage}
                  alt={item.title}
                  className="w-20 h-20 object-contain border rounded"
                />
                <div className="flex-1">
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-500">
                    Rs. {item.price} × {item.quantity}
                  </p>
                </div>
                <p className="font-semibold">
                  Rs. {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-xl p-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Rs. {subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Rs. {shippingCharge}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>Rs. {totalPrice}</span>
            </div>
          </div>
        </div>

        {/* RIGHT — SHIPPING + PAYMENT */}
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-xl p-5 space-y-3">
            <h3 className="text-xl font-bold">Shipping Address</h3>

            <input
              name="name"
              placeholder="Full Name"
              value={shipping.name}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            />
            <input
              name="email"
              placeholder="Email Address"
              value={shipping.email}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            />
            <input
              name="phone"
              placeholder="Phone Number"
              value={shipping.phone}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            />
            <textarea
              name="address"
              rows="3"
              placeholder="Full Address"
              value={shipping.address}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            />
          </div>

          <div className="bg-white rounded-xl p-5 shadow">
            <h3 className="text-xl font-bold mb-4">Payment Method</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => setSelectedPayment(method.id)}
                  className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition
                    ${
                      selectedPayment === method.id
                        ? "ring-2 ring-purple-600 bg-purple-50"
                        : "border hover:shadow-md"
                    }`}
                >
                  <div
                    className={`w-11 h-11 flex items-center justify-center rounded-full text-white ${method.color}`}
                  >
                    {method.icon}
                  </div>
                  <div>
                    <p className="font-semibold">{method.name}</p>
                    <p className="text-sm text-gray-500">{method.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="flex-1 border py-3 rounded-xl hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handlePayment}
              className="flex-1 bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentProcessing;
