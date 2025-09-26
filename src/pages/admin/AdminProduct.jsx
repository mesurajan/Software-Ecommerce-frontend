// src/pages/AdminProduct.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ for navigation

const BACKEND_URL = "http://localhost:5174";

function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    productId: "",
    title: "",
    price: "",
    category: "",
    description: "",
  });
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // ✅ hook

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/products`);
      setProducts(res.data);
    } catch (err) {
      console.error("Fetch products error:", err);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/categories`);
      setCategories(res.data);
      if (res.data.length > 0 && !form.category) {
        setForm((prev) => ({ ...prev, category: res.data[0]._id }));
      }
    } catch (err) {
      console.error("Fetch categories error:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Submit product
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return alert("❌ You must be logged in!");

    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => formData.append(key, val));
    if (file) formData.append("image", file);

    try {
      if (editingId) {
        await axios.put(`${BACKEND_URL}/api/products/${editingId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        alert("✅ Product updated!");
      } else {
        await axios.post(`${BACKEND_URL}/api/products`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        alert("✅ Product added!");
      }

      setForm({
        productId: "",
        title: "",
        price: "",
        category: categories.length > 0 ? categories[0]._id : "",
        description: "",
      });
      setFile(null);
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      console.error("Submit product error:", err);
      alert("❌ Failed to save product.");
    }
  };

  const handleEdit = (product) => {
    setForm({
      productId: product.productId,
      title: product.title,
      price: product.price,
      category:
        typeof product.category === "object"
          ? product.category._id
          : product.category,
      description: product.description,
    });
    setEditingId(product._id);
  };

  const handleDelete = async (id) => {
    if (!token) return alert("❌ You must be logged in!");
    if (!window.confirm("Delete this product?")) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("🗑️ Product deleted!");
      fetchProducts();
    } catch (err) {
      console.error("Delete product error:", err);
      alert("❌ Failed to delete product.");
    }
  };

  // ✅ Navigate to AdminProductDetails
  const handleAdditionalInfo = (id) => {
    navigate(`/admin/product-details/${id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Manage Products</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Product ID"
          value={form.productId}
          onChange={(e) => setForm({ ...form, productId: e.target.value })}
          className="border p-2 w-full"
          required
          disabled={!!editingId}
        />
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="border p-2 w-full"
          required
        />

        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="border p-2 w-full"
        >
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 w-full"
        />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </form>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Products List</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Product ID</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Slug</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Image</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td className="border p-2">{p.productId}</td>
                <td className="border p-2">{p.title}</td>
                <td className="border p-2">{p.slug}</td>
                <td className="border p-2">Rs.{p.price}</td>
                <td className="border p-2">
                  {typeof p.category === "object"
                    ? p.category?.name
                    : p.category}
                </td>
                <td className="border p-2">
                  {p.image && (
                    <img
                      src={`${BACKEND_URL}${p.image}`}
                      alt={p.title}
                      className="h-12 object-cover"
                    />
                  )}
                </td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleAdditionalInfo(p._id)}
                    className="bg-green-600 text-white px-2 py-1 rounded"
                  >
                    Additional Info
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminProduct;
