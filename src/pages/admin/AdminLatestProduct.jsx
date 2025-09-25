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

  // Fetch
  const fetchLatestProducts = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/latestproduct`);
      setLatestProducts(data);
    } catch (err) {
      console.error("Error fetching latest products:", err);
    }
  };

  useEffect(() => {
    fetchLatestProducts();
  }, []);

  // Update local product inputs
  const handleProductChange = (index, field, value) => {
    const updated = [...products];
    updated[index][field] = value;
    setProducts(updated);
  };

  // Submit
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

  // Delete
  const handleDelete = async (id) => {
    if (!token) return alert("Login required");
    if (!window.confirm("Delete this category?")) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/latestproduct/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchLatestProducts();
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

const getImageUrl = (filename) => {
  if (!filename) return `${BACKEND_URL}/uploads/Default/lightimage.png`;
  return `${BACKEND_URL}/uploads/latestproducts/${filename}`;
};


  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-6">Manage Latest Products</h1>

      {/* Form */}
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

        <h3 className="font-medium mb-2">Products (3 per category)</h3>
        {products.map((p, i) => (
          <div
            key={i}
            className="flex flex-col md:flex-row gap-3 mb-3 border p-3 rounded"
          >
            <input
              type="text"
              placeholder="Product ID"
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
              onChange={(e) =>
                handleProductChange(i, "image", e.target.files[0])
              }
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Latest Product
        </button>
      </form>

      {/* Table */}
      <table className="min-w-full bg-white rounded shadow-md">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Category</th>
            <th className="py-2 px-4 border">Products</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {latestProducts.map((lp) => (
            <tr key={lp._id}>
              <td className="py-2 px-4 border">{lp.category}</td>
              <td className="py-2 px-4 border">
                <div className="flex gap-3">
                  {lp.products.map((p, i) => (
                    <div key={i} className="text-center">
                      <img
                        src={getImageUrl(p.productImage)}
                        alt={p.title}
                        className="w-20 h-20 object-cover mx-auto"
                      />
                      <p className="text-xs text-gray-500">ID: {p.productId}</p>
                      <p className="text-sm">{p.title}</p>
                      <p className="text-xs text-gray-500">Rs.{p.price}</p>
                    </div>
                  ))}
                </div>
              </td>
              <td className="py-2 px-4 border">
                <button
                  onClick={() => handleDelete(lp._id)}
                  className="px-2 py-1 bg-red-600 text-white rounded"
                >
                  Delete
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
