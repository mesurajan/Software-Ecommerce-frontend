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
  const [editing, setEditing] = useState(null);

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

  const handleEditSave = async () => {
    if (!editing) return;
    try {
      const formData = new FormData();
      formData.append("title", editing.title);
      formData.append("price", editing.price);
      if (editing.image) formData.append("image", editing.image);

      await axios.put(
        `${BACKEND_URL}/api/latestproduct/${editing.productId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("✅ Product updated");
      setEditing(null);
      fetchLatestProducts();
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
      alert("❌ Update failed");
    }
  };

  const handleDeleteCategory = async (categoryName) => {
    if (!token) return alert("Login required");
    if (!window.confirm(`Delete all items for "${categoryName}"?`)) return;
    try {
      await axios.delete(
        `${BACKEND_URL}/api/latestproduct/category/${encodeURIComponent(
          categoryName
        )}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchLatestProducts();
    } catch (err) {
      console.error("Error deleting category:", err);
      alert("Delete category failed");
    }
  };

  // 🆕 Delete a single product
  const handleDeleteProduct = async (productId) => {
    if (!token) return alert("Login required");
    if (!window.confirm("Delete this product?")) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/latestproduct/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Product deleted");
      fetchLatestProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("❌ Failed to delete product");
    }
  };

  const getImageUrl = (path) => {
    if (!path) return `${BACKEND_URL}/uploads/Default/lightimage.png`;
    if (path.startsWith("uploads/"))
      return `${BACKEND_URL}/${path.replace(/\\/g, "/")}`;
    return `${BACKEND_URL}/uploads/latestproducts/${path.replace(/\\/g, "/")}`;
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-6">Manage Latest Products</h1>

      {/* ADD NEW FORM */}
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
          <div
            key={i}
            className="flex flex-col md:flex-row gap-3 mb-3 border p-3 rounded"
          >
            <input
              type="text"
              placeholder="Product ID"
              value={p.productId}
              onChange={(e) =>
                handleProductChange(i, "productId", e.target.value)
              }
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

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Latest Product
        </button>
      </form>

      {/* EXISTING PRODUCTS TABLE */}
      {latestProducts.map((doc) => (
        <div key={doc._id} className="bg-white p-4 shadow rounded mb-8">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold">{doc.category}</h2>
            <button
              onClick={() => handleDeleteCategory(doc.category)}
              className="px-3 py-1 bg-red-600 text-white rounded"
            >
              Delete Category
            </button>
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Image</th>
                <th className="border p-2">Product ID</th>
                <th className="border p-2">Title</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {doc.products.map((p) => (
                <tr key={p._id}>
                  <td className="border p-2 text-center">
                    <img
                      src={getImageUrl(p.productImage)}
                      alt={p.title}
                      className="w-16 h-16 object-cover mx-auto"
                    />
                  </td>
                  <td className="border p-2">{p.productId}</td>
                  <td className="border p-2">
                    {editing?.productId === p._id ? (
                      <input
                        type="text"
                        value={editing.title}
                        onChange={(e) =>
                          setEditing({ ...editing, title: e.target.value })
                        }
                        className="border p-1 w-full"
                      />
                    ) : (
                      p.title
                    )}
                  </td>
                  <td className="border p-2">
                    {editing?.productId === p._id ? (
                      <input
                        type="number"
                        value={editing.price}
                        onChange={(e) =>
                          setEditing({ ...editing, price: e.target.value })
                        }
                        className="border p-1 w-full"
                      />
                    ) : (
                      `Rs.${p.price}`
                    )}
                  </td>
                  <td className="border p-2 text-center">
                    {editing?.productId === p._id ? (
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={handleEditSave}
                          className="bg-green-600 text-white px-2 py-1 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditing(null)}
                          className="bg-gray-400 text-white px-2 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() =>
                            setEditing({
                              docId: doc._id,
                              productId: p._id,
                              title: p.title,
                              price: p.price,
                              image: null,
                            })
                          }
                          className="bg-blue-600 text-white px-2 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p._id)}
                          className="bg-red-600 text-white px-2 py-1 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default AdminLatestProduct;
