// src/pages/AdminProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5174";

function AdminProductDetails() {
  const { id, slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null); // ✅ single file
  const token = localStorage.getItem("token");

  // Fetch product
  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `${BACKEND_URL}/api/products/${id}${slug ? "/" + slug : ""}`
      );

      if (res.data.redirect) {
        navigate(res.data.redirect, { replace: true });
      } else {
        const normalized = {
          ...res.data,
          id: res.data._id || res.data.id,
          stock: res.data.stock || 0,
          subtitle: res.data.subtitle || "",
          description: res.data.description || "",
          colors: Array.isArray(res.data.colors)
            ? res.data.colors.join(", ")
            : res.data.colors || "",
          videoUrl: res.data.videoUrl || "",
          additionalInfo: res.data.additionalInfo || "",
          brand: res.data.brand || "",
          sku: res.data.sku || "",
          discount: res.data.discount || 0,
          oldPrice: res.data.oldPrice || "",
          weight: res.data.weight || "",
          length: res.data.length || "",
          width: res.data.width || "",
          height: res.data.height || "",
          material: res.data.material || "",
          warranty: res.data.warranty || "",
          delivery: res.data.delivery || "",
          image: res.data.image || "", // ✅ single image
        };
        setProduct(normalized);
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

    // Normal fields
    formData.append("title", product.title);
    formData.append("subtitle", product.subtitle || "");
    formData.append("price", product.price);
    formData.append("oldPrice", product.oldPrice || "");
    formData.append("stock", product.stock);
    formData.append("description", product.description || "");
    formData.append("videoUrl", product.videoUrl || "");
    formData.append("additionalInfo", product.additionalInfo || "");
    formData.append("brand", product.brand || "");
    formData.append("sku", product.sku || "");
    formData.append("discount", product.discount || 0);
    formData.append("weight", product.weight || "");
    formData.append("length", product.length || "");
    formData.append("width", product.width || "");
    formData.append("height", product.height || "");
    formData.append("material", product.material || "");
    formData.append("warranty", product.warranty || "");
    formData.append("delivery", product.delivery || "");
    formData.append(
      "category",
      typeof product.category === "object"
        ? product.category._id
        : product.category
    );

    // Colors → array
    if (product.colors) {
      product.colors
        .split(",")
        .map((c) => c.trim())
        .filter((c) => c)
        .forEach((c) => formData.append("colors", c));
    }

    // ✅ Single image upload
    if (file) {
      formData.append("image", file);
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
        {/* Title */}
        <input
          type="text"
          name="title"
          value={product.title}
          onChange={handleChange}
          placeholder="Enter product title"
          className="border p-2 w-full"
          required
        />

        {/* Subtitle */}
        <input
          type="text"
          name="subtitle"
          value={product.subtitle}
          onChange={handleChange}
          placeholder="Enter product subtitle"
          className="border p-2 w-full"
        />

        {/* Brand */}
        <input
          type="text"
          name="brand"
          value={product.brand}
          onChange={handleChange}
          placeholder="Enter product brand"
          className="border p-2 w-full"
        />

        {/* SKU */}
        <input
          type="text"
          name="sku"
          value={product.sku}
          onChange={handleChange}
          placeholder="Enter product SKU"
          className="border p-2 w-full"
        />

        {/* Price */}
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Enter product price"
          className="border p-2 w-full"
          required
        />

        {/* Old Price */}
        <input
          type="number"
          name="oldPrice"
          value={product.oldPrice}
          onChange={handleChange}
          placeholder="Enter old price (for discount display)"
          className="border p-2 w-full"
        />

        {/* Discount */}
        <input
          type="number"
          name="discount"
          value={product.discount}
          onChange={handleChange}
          placeholder="Enter discount %"
          className="border p-2 w-full"
        />

        {/* Stock */}
        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          placeholder="Enter stock quantity"
          className="border p-2 w-full"
        />

        {/* Weight */}
        <input
          type="number"
          step="0.01"
          name="weight"
          value={product.weight}
          onChange={handleChange}
          placeholder="Enter weight (kg)"
          className="border p-2 w-full"
        />

        {/* Dimensions */}
        <div className="grid grid-cols-3 gap-2">
          <input
            type="number"
            step="0.1"
            name="length"
            value={product.length}
            onChange={handleChange}
            placeholder="Length (cm)"
            className="border p-2 w-full"
          />
          <input
            type="number"
            step="0.1"
            name="width"
            value={product.width}
            onChange={handleChange}
            placeholder="Width (cm)"
            className="border p-2 w-full"
          />
          <input
            type="number"
            step="0.1"
            name="height"
            value={product.height}
            onChange={handleChange}
            placeholder="Height (cm)"
            className="border p-2 w-full"
          />
        </div>

        {/* Material */}
        <input
          type="text"
          name="material"
          value={product.material}
          onChange={handleChange}
          placeholder="Enter product material"
          className="border p-2 w-full"
        />

        {/* Warranty */}
        <input
          type="text"
          name="warranty"
          value={product.warranty}
          onChange={handleChange}
          placeholder="Enter warranty details"
          className="border p-2 w-full"
        />

        {/* Delivery */}
        <input
          type="text"
          name="delivery"
          value={product.delivery}
          onChange={handleChange}
          placeholder="Enter delivery info"
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
          <option value="">Select category</option>
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
          placeholder="Enter detailed product description"
          className="border p-2 w-full"
        />

        {/* Colors */}
        <input
          type="text"
          name="colors"
          value={product.colors}
          onChange={handleChange}
          placeholder="Enter colors (comma separated)"
          className="border p-2 w-full"
        />

        {/* Video URL */}
        <input
          type="text"
          name="videoUrl"
          value={product.videoUrl}
          onChange={handleChange}
          placeholder="Enter product video URL (optional)"
          className="border p-2 w-full"
        />

        {/* Additional Info */}
        <textarea
          name="additionalInfo"
          value={product.additionalInfo}
          onChange={handleChange}
          placeholder="Enter any additional product info"
          className="border p-2 w-full"
        />

        {/* ✅ Single Image Preview */}
        {product.image && (
          <div className="my-2">
            <img
              src={`${BACKEND_URL}${
                product.image.startsWith("/") ? product.image : "/" + product.image
              }`}
              alt={product.title}
              className="h-20 w-20 object-cover border"
            />
          </div>
        )}

        {/* Upload new image */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
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
