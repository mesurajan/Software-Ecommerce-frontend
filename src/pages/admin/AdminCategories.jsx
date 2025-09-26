import React, { useState, useEffect } from "react";
import axios from "axios";

const BACKEND_URL = "http://localhost:5174"; // adjust if deployed

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", slug: "", description: "" });
  const [editingId, setEditingId] = useState(null);

  // helper to get token (adjust according to your auth flow)
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token"); // assumes login stored token
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    };
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/categories`, getAuthHeaders());
      setCategories(res.data);
    } catch (err) {
      console.error("Fetch categories error:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(
          `${BACKEND_URL}/api/categories/${editingId}`,
          form,
          getAuthHeaders()
        );
      } else {
        await axios.post(`${BACKEND_URL}/api/categories`, form, getAuthHeaders());
      }
      setForm({ name: "", slug: "", description: "" });
      setEditingId(null);
      fetchCategories();
    } catch (err) {
      console.error("Submit category error:", err);
    }
  };

  const handleEdit = (cat) => {
    setForm({ name: cat.name, slug: cat.slug, description: cat.description });
    setEditingId(cat._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/categories/${id}`, getAuthHeaders());
      fetchCategories();
    } catch (err) {
      console.error("Delete category error:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Manage Categories</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Category Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Slug"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editingId ? "Update Category" : "Add Category"}
        </button>
      </form>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Categories List</h2>
        <ul>
          {categories.map((cat) => (
            <li key={cat._id} className="flex justify-between border-b py-2">
              <div>
                <strong>{cat.name}</strong> ({cat.slug}) - {cat.description}
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(cat)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(cat._id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminCategories;
