import React, { useEffect, useState } from "react";
import axios from "axios";
import UserTable from "../../components/Admin/UserTable";

function AdminSellers() {
  const [sellers, setSellers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    age: "",
    role: "seller",
  });

  const fetchSellers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5174/api/auth/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // ✅ Only sellers
      setSellers(res.data.filter((u) => u.role === "seller"));
    } catch (err) {
      console.error("Error fetching sellers:", err);
    }
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  const handleAddSeller = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5174/api/auth/signup", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowForm(false);
      setFormData({ name: "", email: "", password: "", phone: "", address: "", age: "", role: "seller" });
      fetchSellers();
    } catch (err) {
      console.error("Error adding seller:", err);
      alert("Failed to add seller");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Sellers Management</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow"
        >
          {showForm ? "Close" : "Add Seller"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleAddSeller}
          className="bg-gray-100 p-4 rounded mb-6 grid grid-cols-2 gap-4"
        >
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="border p-2 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="border p-2 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Age"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="col-span-2 bg-green-600 text-white py-2 rounded"
          >
            Save Seller
          </button>
        </form>
      )}

      {/* ✅ Reusing UserTable here */}
      <UserTable title="All Sellers" data={sellers} refreshData={fetchSellers} />
    </div>
  );
}

export default AdminSellers;
