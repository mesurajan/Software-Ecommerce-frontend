// src/pages/admin/AdminOrders.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5174";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch orders
  const fetchOrders = async () => {
    if (!token) return;

    try {
      const res = await axios.get(`${BACKEND_URL}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error("Error fetching orders:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Optional: update order status (e.g., mark as shipped)
  const updateStatus = async (orderId, status) => {
    if (!token) return;
    try {
      await axios.put(
        `${BACKEND_URL}/api/orders/${orderId}`,
        { paymentStatus: status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchOrders();
    } catch (err) {
      console.error("Error updating order:", err.response?.data || err.message);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-5">Admin Orders Management</h1>

      <table className="min-w-full bg-white rounded shadow-md">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Order ID</th>
            <th className="py-2 px-4 border">User</th>
            <th className="py-2 px-4 border">Items</th>
            <th className="py-2 px-4 border">Total</th>
            <th className="py-2 px-4 border">Payment Status</th>
            <th className="py-2 px-4 border">Created At</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="py-2 px-4 border">{order._id}</td>
              <td className="py-2 px-4 border">{order.user}</td>
              <td className="py-2 px-4 border">
                {order.items.map((item) => (
                  <div key={item._id}>
                    {item.title} x {item.quantity}
                  </div>
                ))}
              </td>
              <td className="py-2 px-4 border">Rs. {order.total}</td>
              <td className="py-2 px-4 border">
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    order.paymentStatus === "PAID"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </td>
              <td className="py-2 px-4 border">
                {new Date(order.createdAt).toLocaleString()}
              </td>
              <td className="py-2 px-4 border space-x-2">
                {order.paymentStatus !== "PAID" && (
                  <button
                    onClick={() => updateStatus(order._id, "PAID")}
                    className="px-2 py-1 bg-green-600 text-white rounded"
                  >
                    Mark Paid
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {orders.length === 0 && (
        <p className="text-gray-500 mt-4">No orders found.</p>
      )}
    </div>
  );
}

export default AdminOrders;
