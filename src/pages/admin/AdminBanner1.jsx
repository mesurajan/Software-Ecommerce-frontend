// src/pages/admin/AdminBanner1.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const BACKEND_URL = "http://localhost:5174"; // change if hosted online

function AdminBanner1() {
  const [banners, setBanners] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subtitle: "",
    productLink: "",
    discountPercentage: 0,
  });
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch banners from backend
  const fetchBanners = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/banner`);
      setBanners(res.data);
    } catch (err) {
      console.error("Error fetching banners:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) return alert("You must be logged in!");

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (imageFile) data.append("image", imageFile);

    try {
      if (editingId) {
        // Update banner
        await axios.put(`${BACKEND_URL}/api/banner/${editingId}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        // Create banner
        await axios.post(`${BACKEND_URL}/api/banner`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      // Reset form
      setFormData({
        title: "",
        description: "",
        subtitle: "",
        productLink: "",
        discountPercentage: 0,
      });
      setImageFile(null);
      setEditingId(null);

      fetchBanners();
    } catch (err) {
      console.error("Error submitting banner:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleEdit = (banner) => {
    setEditingId(banner._id);
    setFormData({
      title: banner.title,
      description: banner.description,
      subtitle: banner.subtitle || "",
      productLink: banner.productLink || "",
      discountPercentage: banner.discountPercentage || 0,
    });
    setImageFile(null);
  };

  const handleDelete = async (id) => {
    if (!token) return alert("You must be logged in!");
    if (!window.confirm("Are you sure you want to delete this banner?")) return;

    try {
      await axios.delete(`${BACKEND_URL}/api/banner/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBanners();
    } catch (err) {
      console.error("Error deleting banner:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to delete banner");
    }
  };

  const getImageUrl = (path) => {
    if (!path) return `${BACKEND_URL}/uploads/Default/lightimage.png`; // fallback
    return `${BACKEND_URL}${path}`;
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-5">Admin Banner Management</h1>

      {/* Banner Form */}
      <form onSubmit={handleSubmit} className="mb-10 bg-white p-6 rounded shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="border p-2 rounded" required />
          <input type="text" name="subtitle" placeholder="Subtitle" value={formData.subtitle} onChange={handleChange} className="border p-2 rounded" />
          <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border p-2 rounded" required />
          <input type="text" name="productLink" placeholder="Product Name or ID" value={formData.productLink} onChange={handleChange} className="border p-2 rounded" />
          <input type="number" name="discountPercentage" placeholder="Discount %" value={formData.discountPercentage} onChange={handleChange} className="border p-2 rounded" />
          <input type="file" onChange={handleFileChange} className="border p-2 rounded col-span-2" />
        </div>
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
          {editingId ? "Update Banner" : "Add Banner"}
        </button>
      </form>

      {/* Banner Table */}
      <table className="min-w-full bg-white rounded shadow-md">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Main Image</th>
            <th className="py-2 px-4 border">Left Image</th>
            <th className="py-2 px-4 border">Title</th>
            <th className="py-2 px-4 border">Description</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {banners.map((banner) => (
            <tr key={banner._id}>
              <td className="py-2 px-4 border">
                <img src={getImageUrl(banner.image)} alt={banner.title} className="w-20 h-20 object-cover" />
              </td>
              <td className="py-2 px-4 border">
                <img src={getImageUrl(banner.leftImage)} alt="left" className="w-20 h-20 object-cover" />
              </td>
              <td className="py-2 px-4 border">{banner.title}</td>
              <td className="py-2 px-4 border">{banner.description}</td>
              <td className="py-2 px-4 border space-x-2">
                <button onClick={() => handleEdit(banner)} className="px-2 py-1 bg-yellow-500 text-white rounded">Edit</button>
                <button onClick={() => handleDelete(banner._id)} className="px-2 py-1 bg-red-600 text-white rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminBanner1;
