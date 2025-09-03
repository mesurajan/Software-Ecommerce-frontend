import React, { useEffect, useState } from "react";
import axios from "axios";
import UserTable from "../../components/Admin/UserTable";

function AdminCustomers() {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5174/api/auth/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCustomers(res.data.filter(u => u.role === "user"));
    } catch (err) {
      console.error("Error fetching customers:", err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return <UserTable title="All Customers" data={customers} refreshData={fetchCustomers} />;
}

export default AdminCustomers;
