import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AppBreadcrumbs from "../components/Breadcrumbs";
import EmptyCartImg from "../assets/images/empty-cart.png";
const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    
  fetch(`${import.meta.env.VITE_BACKEND_URL}/api/orders/my`, {
    headers: { Authorization: `Bearer ${token}` },
  })
     .then((res) => res.json())
      .then((data) => {
        // backend returns array OR { orders }
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          setOrders(data.orders || []);
        }
      })
      .catch(() => setOrders([]));
  }, [navigate]);

  if (orders.length === 0) {
    return (
    <div className="bg-white container mx-auto text-[#0A174E] mb-10 px-4 md:px-0">
     <div className="bg-backgroundlite py-4 pt-20">
        <h1 className="text-3xl font-bold px-4">Order List </h1>
        <AppBreadcrumbs />
      </div>
      <div className="flex flex-col items-center justify-center py-20">
        <img
          src={EmptyCartImg}
          alt="No Orders"
          className="w-60 h-60 object-contain mb-6"
        />
        <h2 className="text-2xl font-semibold text-[#0A174E] mb-2">
          You have no orders yet
        </h2>
        <p className="text-gray-500 mb-4 text-center">
          Looks like you haven’t placed any orders yet. Go explore our products and place your first order!
        </p>
        <Link
          to="/product"
          className="px-6 py-3 bg-blue-900 text-white rounded hover:bg-blue-800 transition"
        >
          Shop Products
        </Link>
      </div>
      </div>
    );
  }

  return (
    <div className="bg-white container mx-auto text-[#0A174E] mb-10 px-4 md:px-0">
     <div className="bg-backgroundlite py-4 pt-20">
        <h1 className="text-3xl font-bold px-4">Order List </h1>
        <AppBreadcrumbs />
      </div>
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
              {/* ===== ORDER HEADER ===== */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 border-b pb-3">
                <div>
                  <p className="text-sm font-semibold">
                    Order ID:{" "}
                    <span className="text-gray-700">{order._id}</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Placed on{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium
                    ${
                      order.paymentStatus === "PAID"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }
                  `}
                >
                  {order.paymentStatus}
                </span>
              </div>

              {/* ===== ORDER ITEMS ===== */}
              <div className="divide-y mt-3">
                {order.items?.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 py-3 items-center"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <p className="text-sm font-semibold">
                      Rs. {item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              {/* ===== DELIVERY INFO ===== */}
              <div className="bg-gray-50 rounded-md p-4 mt-4 text-sm">
                <p className="font-semibold mb-1">Delivery Details</p>
                <p className="text-gray-600">
                  Name: {order.shipping?.name}
                </p>
                <p className="text-gray-600">
                  Phone: {order.shipping?.phone}
                </p>
                <p className="text-gray-600">
                  Address: {order.shipping?.address}
                </p>
              </div>

              {/* ===== FOOTER ===== */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-4">
                <p className="text-lg font-semibold">
                  Total: Rs. {order.total}
                </p>

                <button
                  onClick={() => navigate(`/order/${order._id}`)}
                  className="px-4 py-2 text-sm border rounded hover:bg-gray-100"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
    </div>
  );
};

export default MyOrders;
