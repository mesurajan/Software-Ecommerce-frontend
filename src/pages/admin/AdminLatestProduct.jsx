// src/pages/admin/AdminLatestProduct.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5174";

function AdminLatestProduct() {
  const [latestProducts, setLatestProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("New Arrivals");
  const [items, setItems] = useState([
    { product: "", productSlug: "", title: "", price: "", image: null, productImage: "" },
    { product: "", productSlug: "", title: "", price: "", image: null, productImage: "" },
    { product: "", productSlug: "", title: "", price: "", image: null, productImage: "" },
  ]);
  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem("token");

  // ✅ Fetch existing latest products
  const fetchLatestProducts = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/latestproduct`);
      setLatestProducts(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      console.error("Error fetching latest products:", err);
    }
  };

  // ✅ Fetch available products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/products`);
      setProducts(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchLatestProducts();
    fetchProducts();
  }, []);

  // ✅ Select product from dropdown
  const handleProductSelect = (index, productId) => {
    const selected = products.find((p) => p._id === productId);
    if (!selected) return;
    const updated = [...items];
    updated[index] = {
      ...updated[index],
      title: selected.title,
      price: selected.price,
      productImage: selected.images?.[0] || "",
      image: null,
      product: selected._id,
      productSlug: selected.slug,
    };
    setItems(updated);
  };

  // ✅ Manual input override
  const handleInputChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  // ✅ Reset form
  const resetForm = () => {
    setCategory("New Arrivals");
    setItems([
      { product: "", productSlug: "", title: "", price: "", image: null, productImage: "" },
      { product: "", productSlug: "", title: "", price: "", image: null, productImage: "" },
      { product: "", productSlug: "", title: "", price: "", image: null, productImage: "" },
    ]);
    setEditingId(null);
  };

  // ✅ Create / Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return alert("⚠️ You must be logged in as Admin!");

    try {
      const formData = new FormData();
      formData.append("category", category);

      const productsData = items.map((i) => ({
        product: i.product,
        productSlug: i.productSlug,
        title: i.title,
        price: i.price,
        productImage: i.image ? i.image.name : i.productImage || "",
      }));
      formData.append("products", JSON.stringify(productsData));

      // Append uploaded overrides
      items.forEach((i) => {
        if (i.image) formData.append("images", i.image);
      });

      if (editingId) {
        await axios.put(`${BACKEND_URL}/api/latestproduct/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });
        alert("✅ Latest product category updated!");
      } else {
        await axios.post(`${BACKEND_URL}/api/latestproduct`, formData, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });
        alert("✅ Latest product category created!");
      }

      resetForm();
      fetchLatestProducts();
    } catch (err) {
      console.error("Save error:", err.response?.data || err.message);
      alert("❌ Failed to save latest products.");
    }
  };

  // ✅ Delete entire category
  const handleDeleteCategory = async (categoryName) => {
    if (!token) return alert("⚠️ Login required!");
    if (!window.confirm(`Delete all items for "${categoryName}"?`)) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/latestproduct/category/${encodeURIComponent(categoryName)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("🗑️ Category deleted!");
      fetchLatestProducts();
    } catch (err) {
      console.error("Error deleting category:", err);
      alert("❌ Failed to delete category.");
    }
  };

  // ✅ Edit existing category
  const handleEdit = (doc) => {
    setEditingId(doc._id);
    setCategory(doc.category);
    setItems(
      doc.products.map((p) => ({
        product: p.product?._id || p.product || "",
        productSlug: p.productSlug || p.product?.slug || "",
        title: p.title || p.product?.title || "",
        price: p.price || p.product?.price || "",
        productImage: p.productImage || p.product?.images?.[0] || "",
        image: null,
      }))
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Image helper
  const getImageUrl = (path) => {
    if (!path) return `${BACKEND_URL}/uploads/Default/lightimage.png`;
    if (path.startsWith("http")) return path;
    return `${BACKEND_URL.replace(/\/$/, "")}/${path.replace(/^\/+/, "")}`;
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Manage Latest Products</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow rounded p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">
          {editingId ? "✏️ Edit Latest Product Category" : "➕ Create New Latest Product Category"}
        </h2>

        {/* Category Selector */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option>New Arrivals</option>
            <option>Best Seller</option>
            <option>Featured</option>
            <option>Special Offer</option>
          </select>
        </div>

        {/* Products */}
        <h3 className="font-medium mb-2">Please Choose Your Products</h3>
        {items.map((item, index) => (
          <div key={index} className="border rounded p-3 mb-3 flex flex-col md:flex-row gap-3 items-center">
            {/* Dropdown */}
            <select
              className="border p-2 rounded flex-1"
              value={item.product}
              onChange={(e) => handleProductSelect(index, e.target.value)}
            >
              <option value="">-- Select Product --</option>
              {products.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.title} (Rs.{p.price})
                </option>
              ))}
            </select>

            {/* Override Inputs */}
            <input
              type="text"
              className="border p-2 rounded flex-1"
              placeholder="Custom Title"
              value={item.title}
              onChange={(e) => handleInputChange(index, "title", e.target.value)}
            />
            <input
              type="number"
              className="border p-2 rounded w-28"
              placeholder="Price"
              value={item.price}
              onChange={(e) => handleInputChange(index, "price", e.target.value)}
            />

            {/* Preview */}
            {item.productImage && (
              <img
                src={getImageUrl(item.productImage)}
                alt={item.title}
                className="w-16 h-16 object-cover"
              />
            )}

            {/* Upload override */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const updated = [...items];
                updated[index].image = e.target.files[0];
                setItems(updated);
              }}
            />
          </div>
        ))}

        {/* Buttons */}
        <div className="flex gap-3">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {editingId ? "💾 Save Changes" : "📂 Create Category"}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Existing Categories */}
      <h2 className="text-lg font-semibold mb-2">Existing Latest Products</h2>
      {latestProducts.map((doc) => (
        <div key={doc._id} className="border p-4 rounded mb-3 bg-gray-50">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold">{doc.category}</h3>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(doc)}
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteCategory(doc.category)}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>

          {/* Products */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {doc.products?.map((p, i) => (
              <div key={i} className="border rounded p-2 text-center">
                <img
                  src={getImageUrl(p.productImage)}
                  alt={p.title}
                  className="w-24 h-24 object-cover mx-auto"
                />
                <p className="font-semibold">{p.title}</p>
                <p className="text-sm text-gray-600">Rs.{p.price}</p>
                {p.product && (
                  <p className="text-xs text-blue-600">
                    Product ID: {p.product?._id || p.product}
                  </p>
                )}
                {p.productSlug && (
                  <p className="text-xs text-gray-500">Slug: {p.productSlug}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminLatestProduct;
