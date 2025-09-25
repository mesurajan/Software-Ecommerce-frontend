// src/pages/admin/AdminLatestProduct.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = "http://localhost:5174";

function AdminLatestProduct() {
  const [latestProducts, setLatestProducts] = useState([]);
  const [category, setCategory] = useState("New Arrivals");
  const [products, setProducts] = useState([
    { productId: "", title: "", price: "", image: null },
    { productId: "", title: "", price: "", image: null },
    { productId: "", title: "", price: "", image: null },
  ]);

  const token = localStorage.getItem("token");

  const fetchLatestProducts = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/latestproduct`);
      setLatestProducts(data || []);
    } catch (err) {
      console.error("Error fetching latest products:", err);
    }
  };

  useEffect(() => {
    fetchLatestProducts();
  }, []);

  const handleProductChange = (index, field, value) => {
    const updated = [...products];
    updated[index][field] = value;
    setProducts(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return alert("Login required");

    try {
      const formData = new FormData();
      formData.append("category", category);

      const productsData = products.map((p) => ({
        productId: p.productId,
        title: p.title,
        price: p.price,
        productImage: p.image ? p.image.name : "",
      }));
      formData.append("products", JSON.stringify(productsData));

      products.forEach((p) => {
        if (p.image) formData.append("images", p.image);
      });

      await axios.post(`${BACKEND_URL}/api/latestproduct`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ Latest products added");
      setProducts([
        { productId: "", title: "", price: "", image: null },
        { productId: "", title: "", price: "", image: null },
        { productId: "", title: "", price: "", image: null },
      ]);
      fetchLatestProducts();
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      alert("❌ Failed to create latest product entry");
    }
  };

  // delete entire category (all docs merged by backend, so this deletes the category)
  const handleDeleteCategory = async (categoryName) => {
    if (!token) return alert("Login required");
    if (!window.confirm(`Delete all items for "${categoryName}"?`)) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/latestproduct/category/${encodeURIComponent(categoryName)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchLatestProducts();
    } catch (err) {
      console.error("Error deleting:", err);
      alert("Delete failed");
    }
  };

  // utility to make path->url for img stored like 'uploads/latestproducts/filename.png'
  const getImageUrl = (path) => {
    if (!path) return `${BACKEND_URL}/uploads/Default/lightimage.png`;
    // ensure correct slashes
    if (path.startsWith("uploads/")) return `${BACKEND_URL}/${path.replace(/\\/g, "/")}`;
    return `${BACKEND_URL}/uploads/latestproducts/${path.replace(/\\/g, "/")}`;
  };

  // Group fetched docs by category and flatten products
  const grouped = latestProducts.reduce((acc, doc) => {
    acc[doc.category] = acc[doc.category] || [];
    if (Array.isArray(doc.products)) acc[doc.category].push(...doc.products);
    return acc;
  }, {});

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-6">Manage Latest Products</h1>

      <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded mb-8">
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

        <h3 className="font-medium mb-2">Products (3 per submission)</h3>
        {products.map((p, i) => (
          <div key={i} className="flex flex-col md:flex-row gap-3 mb-3 border p-3 rounded">
            <input
              type="text"
              placeholder="Product ID (slug or id)"
              value={p.productId}
              onChange={(e) => handleProductChange(i, "productId", e.target.value)}
              className="border p-2 rounded w-40"
              required
            />
            <input
              type="text"
              placeholder="Title"
              value={p.title}
              onChange={(e) => handleProductChange(i, "title", e.target.value)}
              className="border p-2 rounded flex-1"
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={p.price}
              onChange={(e) => handleProductChange(i, "price", e.target.value)}
              className="border p-2 rounded w-28"
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleProductChange(i, "image", e.target.files[0])}
              required
            />
          </div>
        ))}

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Latest Product
        </button>
      </form>

      {/* Table grouped by category */}
      <table className="min-w-full bg-white rounded shadow-md">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Category</th>
            <th className="py-2 px-4 border">Products</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(grouped).length === 0 && (
            <tr>
              <td colSpan={3} className="p-4 text-center text-gray-500">
                No latest products yet
              </td>
            </tr>
          )}

          {Object.entries(grouped).map(([cat, prods]) => (
            <tr key={cat}>
              <td className="py-2 px-4 border align-top">{cat}</td>
              <td className="py-2 px-4 border">
                <div className="flex gap-3 flex-wrap">
                  {prods.map((p, i) => (
                    <div key={i} className="text-center w-40">
                      <img src={getImageUrl(p.productImage)} alt={p.title} className="w-20 h-20 object-cover mx-auto" />
                      <p className="text-xs text-gray-500">ID: {p.productId}</p>
                      <p className="text-sm">{p.title}</p>
                      <p className="text-xs text-gray-500">Rs.{p.price}</p>
                    </div>
                  ))}
                </div>
              </td>
              <td className="py-2 px-4 border align-top">
                <button
                  onClick={() => handleDeleteCategory(cat)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete category
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminLatestProduct;
