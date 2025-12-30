import React, { useEffect, useState } from "react";
import axios from "axios";
import UserTable from "../../components/Admin/UserTable";
import { Users, Clock, Activity } from "lucide-react"; 
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5174";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BACKEND_URL}/api/auth/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="px-10 py-0">
      {/* Header */}
      <div className="flex justify-between items-center   shadow py-10 bg-[#1e293b] text-white px-15">
        <h1 className="text-3xl font-bold">Admin - User Management</h1>
      
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 mb-8 mt-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-2xl">{users.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Customer</h2>
          <p className="text-2xl">{users.filter(u => u.role === "user").length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Seller</h2>
          <p className="text-2xl">{users.filter(u => u.role === "seller").length}</p>
        </div>
      </div>

      {/* User Table */}
      <UserTable title="All Users" data={users} refreshData={fetchUsers} />
    </div>
  );
}

export default AdminUsers;
