// src/pages/admin/AdminTopCategories.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = "http://localhost:5174";

const AdminTopCategories = () => {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [chairs, setChairs] = useState([
    { title: "", price: "", image: null, chairimage: "", productLink: "" },
    { title: "", price: "", image: null, chairimage: "", productLink: "" },
    { title: "", price: "", image: null, chairimage: "", productLink: "" },
    { title: "", price: "", image: null, chairimage: "", productLink: "" },
  ]);
  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem("token");

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/topcategories`);
      setCategories(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChairChange = (index, field, value) => {
    const updated = [...chairs];
    updated[index][field] = value;
    setChairs(updated);
  };

  const resetForm = () => {
    setTitle("");
    setChairs([
      { title: "", price: "", image: null, chairimage: "", productLink: "" },
      { title: "", price: "", image: null, chairimage: "", productLink: "" },
      { title: "", price: "", image: null, chairimage: "", productLink: "" },
      { title: "", price: "", image: null, chairimage: "", productLink: "" },
    ]);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return alert("You must be logged in!");

    try {
      const formData = new FormData();
      formData.append("title", title);

      const chairsData = chairs.map((c) => ({
        title: c.title,
        price: c.price,
        chairimage: c.image ? c.image.name : c.chairimage || "",
        productLink: c.productLink,
      }));
      formData.append("chairs", JSON.stringify(chairsData));

      chairs.forEach((c) => {
        if (c.image) formData.append("images", c.image);
      });

      if (editingId) {
        // Update
        await axios.put(`${BACKEND_URL}/api/topcategories/${editingId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        alert("✅ Category updated successfully!");
      } else {
        // Create
        await axios.post(`${BACKEND_URL}/api/topcategories`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        alert("✅ Category created successfully!");
      }

      resetForm();
      fetchCategories();
    } catch (err) {
      console.error("Error saving category:", err);
      alert("❌ Failed to save category.");
    }
  };

  const handleDelete = async (id) => {
    if (!token) return alert("You must be logged in!");
    if (!window.confirm("Delete this category?")) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/topcategories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("🗑️ Category deleted!");
      fetchCategories();
    } catch (err) {
      console.error("Error deleting category:", err);
      alert("❌ Failed to delete category.");
    }
  };

  const handleEdit = (category) => {
    setEditingId(category._id);
    setTitle(category.title);
    setChairs(
      category.chairs.map((c) => ({
        title: c.title,
        price: c.price,
        chairimage: c.chairimage,
        image: null,
        productLink: c.productLink,
      }))
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getImageUrl = (path) => {
    if (!path) return `${BACKEND_URL}/uploads/Default/lightimage.png`;
    return `${BACKEND_URL}/${path.replace(/\\/g, "/")}`;
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Manage Top Categories</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow rounded p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">
          {editingId ? "Edit Category" : "Create New Category"}
        </h2>
        <div className="mb-4">
          <label className="block font-medium mb-1">Category Header</label>
          <input
            type="text"
            className="border rounded w-full p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <h3 className="font-medium mb-2">Chairs (4 per category)</h3>
        {chairs.map((chair, index) => (
          <div
            key={index}
            className="border rounded p-3 mb-3 flex flex-col md:flex-row gap-3"
          >
            <input
              type="text"
              placeholder="Chair title"
              className="border p-2 rounded flex-1"
              value={chair.title}
              onChange={(e) =>
                handleChairChange(index, "title", e.target.value)
              }
              required
            />
            <input
              type="number"
              placeholder="Price"
              className="border p-2 rounded w-28"
              value={chair.price}
              onChange={(e) =>
                handleChairChange(index, "price", e.target.value)
              }
              required
            />
            <input
              type="text"
              placeholder="Product ID or Name"
              className="border p-2 rounded flex-1"
              value={chair.productLink}
              onChange={(e) =>
                handleChairChange(index, "productLink", e.target.value)
              }
            />

            {chair.chairimage && !chair.image && (
              <img
                src={getImageUrl(chair.chairimage)}
                alt="chair"
                className="w-16 h-16 object-cover"
              />
            )}

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleChairChange(index, "image", e.target.files[0])
              }
              required={!editingId}
            />
          </div>
        ))}

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editingId ? "Save Changes" : "Create Category"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Existing Categories */}
      <h2 className="text-lg font-semibold mb-2">Existing Categories</h2>
      {categories.map((category) => (
        <div key={category._id} className="border p-4 rounded mb-3 bg-gray-50">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold">{category.title}</h3>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(category)}
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(category._id)}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {category.chairs?.map((chair, i) => (
              <div key={i} className="border rounded p-2 text-center">
                <img
                  src={getImageUrl(chair.chairimage)}
                  alt={chair.title}
                  className="w-24 h-24 object-cover mx-auto"
                />
                <p className="font-semibold">{chair.title}</p>
                <p className="text-sm text-gray-600">Rs.{chair.price}</p>
                {chair.productLink && (
                  <p className="text-xs text-blue-600">
                    Product Id: {chair.productLink}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminTopCategories;
