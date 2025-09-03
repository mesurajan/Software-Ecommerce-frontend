import React, { useEffect, useState } from "react";
import axios from "axios";
import UserTable from "../../components/Admin/UserTable";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5174/api/auth/users", {
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

  return <UserTable title="All Users" data={users} refreshData={fetchUsers} />;
}

export default AdminUsers;
