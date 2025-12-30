import React, { useEffect, useState } from "react";
import axios from "axios";
import UserTable from "../../components/Admin/UserTable";
import AdminPage from "../../components/Admin/AdminPage";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5174";

function AdminCustomers() {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BACKEND_URL}/api/auth/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Filter only customers
      const customerList = res.data.filter(u => u.role === "user");
      setCustomers(customerList);
    } catch (err) {
      console.error("Error fetching customers:", err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Calculate new customers in the last 7 days
  const newCustomersCount = customers.filter(u => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return new Date(u.createdAt) >= sevenDaysAgo;
  }).length;

  return (
    
    <div className="px-10 py-0">
      {/* Header */}
      <div className="flex justify-between items-center   shadow py-10 bg-[#1e293b] text-white px-15">
        <h1 className="text-3xl font-bold">Customers List</h1>
      
      </div>
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 mt-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Customers</h2>
          <p className="text-2xl">{customers.length}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">New Customers (Last 7 Days)</h2>
          <p className="text-2xl">{newCustomersCount}</p>
        </div>
      </div>

      {/* Customer Table */}
      <UserTable title="All Customers" data={customers} refreshData={fetchCustomers} />
    </div>
  );
}

export default AdminCustomers;
