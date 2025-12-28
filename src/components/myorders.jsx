import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:5000/api/orders/my-orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setOrders(data.orders || []))
      .catch(() => setOrders([]));
  }, [navigate]);

  return (
    <section className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">You haven’t placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-lg shadow-md p-5"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 border-b pb-3">
                <div>
                  <p className="text-sm font-semibold">
                    Order ID:{" "}
                    <span className="text-gray-700">{order._id}</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Placed on {new Date(order.createdAt).toDateString()}
                  </p>
                </div>

                <div className="flex gap-2">
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium
                      ${order.status === "Delivered" && "bg-green-100 text-green-700"}
                      ${order.status === "Pending" && "bg-yellow-100 text-yellow-700"}
                      ${order.status === "Cancelled" && "bg-red-100 text-red-700"}
                      ${order.status === "Shipped" && "bg-blue-100 text-blue-700"}
                    `}
                  >
                    {order.status}
                  </span>

                  <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                    {order.paymentStatus}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="divide-y mt-3">
                {order.items?.map((item) => (
                  <div
                    key={item.productId}
                    className="flex gap-4 py-3 items-center"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-contain border rounded"
                    />

                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <p className="text-sm font-semibold">
                      Rs. {item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              {/* Delivery Info */}
              <div className="bg-gray-50 rounded-md p-4 mt-4 text-sm">
                <p className="font-semibold mb-1">Delivery Details</p>
                <p className="text-gray-600">
                  Address: {order.shippingAddress?.address},{" "}
                  {order.shippingAddress?.city}
                </p>
                <p className="text-gray-600">
                  Delivery Method: {order.deliveryMethod || "Standard"}
                </p>
                <p className="text-gray-600">
                  Estimated Delivery:{" "}
                  {order.estimatedDelivery || "3–5 business days"}
                </p>
              </div>

              {/* Footer */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-4">
                <p className="text-lg font-semibold">
                  Total: Rs. {order.totalAmount}
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`/order/${order._id}`)}
                    className="px-4 py-2 text-sm border rounded hover:bg-gray-100"
                  >
                    View Details
                  </button>

                  <button
                    className="px-4 py-2 text-sm bg-purple-600 text-white rounded hover:bg-purple-700"
                  >
                    Buy Again
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyOrders;
