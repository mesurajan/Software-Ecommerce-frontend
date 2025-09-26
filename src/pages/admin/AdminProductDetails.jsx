// src/pages/AdminProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = "http://localhost:5174";

function AdminProductDetails() {
  const { id, slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [files, setFiles] = useState([]); // multiple new images
  const token = localStorage.getItem("token");

  // Fetch product
  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `${BACKEND_URL}/api/products/${id}/${slug || ""}`
      );

      if (res.data.redirect) {
        navigate(res.data.redirect, { replace: true });
      } else {
        // Ensure default values to avoid undefined
        setProduct({
          ...res.data,
          stock: res.data.stock || 0,
          colors: Array.isArray(res.data.colors)
            ? res.data.colors.join(", ")
            : res.data.colors || "",
          videoUrl: res.data.videoUrl || "",
          additionalInfo: res.data.additionalInfo || "",
        });
      }
    } catch (err) {
      console.error("Fetch product error:", err);
      alert("❌ Failed to load product.");
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/categories`);
      setCategories(res.data);
    } catch (err) {
      console.error("Fetch categories error:", err);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, [id, slug]);

  if (!product) return <p className="p-6">Loading...</p>;

  // Handle input changes
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Save updates
  const handleSave = async (e) => {
    e.preventDefault();
    if (!token) return alert("❌ You must be logged in!");

    const formData = new FormData();

    // Convert colors (comma → array)
    if (product.colors) {
      product.colors
        .split(",")
        .map((c) => c.trim())
        .filter((c) => c)
        .forEach((c) => formData.append("colors", c));
    }

    // Append normal fields
    formData.append("title", product.title);
    formData.append("price", product.price);
    formData.append("stock", product.stock);
    formData.append("description", product.description || "");
    formData.append("videoUrl", product.videoUrl || "");
    formData.append("additionalInfo", product.additionalInfo || "");
    formData.append(
      "category",
      typeof product.category === "object"
        ? product.category._id
        : product.category
    );

    // New images
    if (files.length > 0) {
      files.forEach((f) => formData.append("images", f));
    }

    try {
      await axios.put(`${BACKEND_URL}/api/products/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("✅ Product updated!");
      navigate("/admin/products");
    } catch (err) {
      console.error("Update product error:", err);
      alert("❌ Failed to update product.");
    }
  };

  // Delete product
  const handleDelete = async () => {
    if (!token) return alert("❌ You must be logged in!");
    if (!window.confirm("Delete this product?")) return;

    try {
      await axios.delete(`${BACKEND_URL}/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("🗑️ Product deleted!");
      navigate("/admin/products");
    } catch (err) {
      console.error("Delete product error:", err);
      alert("❌ Failed to delete product.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Edit Product</h1>
      <form onSubmit={handleSave} className="space-y-3">
        {/* Basic fields */}
        <input
          type="text"
          name="title"
          value={product.title}
          onChange={handleChange}
          placeholder="Title"
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="border p-2 w-full"
        />

        {/* Category */}
        <select
          name="category"
          value={
            typeof product.category === "object"
              ? product.category._id
              : product.category
          }
          onChange={handleChange}
          className="border p-2 w-full"
        >
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Description */}
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 w-full"
        />

        {/* Colors */}
        <input
          type="text"
          name="colors"
          value={product.colors}
          onChange={handleChange}
          placeholder="Colors (comma separated)"
          className="border p-2 w-full"
        />

        {/* Video URL */}
        <input
          type="text"
          name="videoUrl"
          value={product.videoUrl}
          onChange={handleChange}
          placeholder="Video URL"
          className="border p-2 w-full"
        />

        {/* Additional Info */}
        <textarea
          name="additionalInfo"
          value={product.additionalInfo}
          onChange={handleChange}
          placeholder="Additional Info"
          className="border p-2 w-full"
        />

        {/* Image previews */}
        {product.images &&
          product.images.map((img, i) => (
            <img
              key={i}
              src={`${BACKEND_URL}${img.startsWith("/") ? img : "/" + img}`}
              alt={`${product.title}-${i}`}
              className="h-20 object-cover inline-block mr-2"
            />
          ))}

        {/* Upload new images */}
        <input
          type="file"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files))}
        />

        <div className="space-x-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminProductDetails;
