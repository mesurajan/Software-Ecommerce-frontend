import React, { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5174";

function AdminDiscountItem() {
  const [discountItems, setDiscountItems] = useState([]);
  const [form, setForm] = useState({
    productId: "",
    category: "",
    title: "",
    subtitle: "",
    description: "",
    features: "",
  });
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/discountitem`);
      setDiscountItems(res.data || []);
    } catch (err) {
      console.error("Error fetching discount items:", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🚨 Validation: require image when adding new item
    if (!editingId && !file) {
      alert("Image is required when adding a new discount item.");
      return;
    }

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (key === "features") {
        formData.append(
          key,
          JSON.stringify(form[key].split(",").map((f) => f.trim()))
        );
      } else {
        formData.append(key, form[key]);
      }
    });

    // ✅ always force buttonText = "Shop Now"
    formData.append("buttonText", "Shop Now");

    // Append image if uploading new one (required for new, optional for edit)
    if (file) formData.append("image", file);

    try {
      if (editingId) {
        await axios.put(
          `${BACKEND_URL}/api/discountitem/${editingId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post(`${BACKEND_URL}/api/discountitem`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
      }

      setForm({
        productId: "",
        category: "",
        title: "",
        subtitle: "",
        description: "",
        features: "",
      });
      setFile(null);
      setEditingId(null);
      fetchItems();
    } catch (err) {
      console.error("Error saving discount item:", err);
      alert("Error saving item. Please check your input or login status.");
    }
  };

  const handleEdit = (item) => {
    setForm({
      productId: item.productId,
      category: item.category,
      title: item.title,
      subtitle: item.subtitle,
      description: item.description,
      features: (item.features || []).join(", "),
    });
    setEditingId(item._id);
    setFile(null); // reset file (optional upload on edit)
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/discountitem/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchItems();
    } catch (err) {
      console.error("Error deleting discount item:", err);
      alert("Unauthorized: Please log in as admin.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">
        {editingId ? "Edit Discount Item" : "Add Discount Item"}
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-4 border rounded-md bg-gray-50"
      >
        <input
          type="text"
          name="productId"
          placeholder="Product ID"
          value={form.productId}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
        <input
          type="text"
          name="subtitle"
          placeholder="Subtitle"
          value={form.subtitle}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          type="text"
          name="features"
          placeholder="Features (comma separated)"
          value={form.features}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          type="file"
          onChange={handleFile}
          className="w-full"
          accept="image/*"
          // Required only when adding a new item
          required={!editingId}
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          {editingId ? "Update Item" : "Add Item"}
        </button>
      </form>

      {/* List */}
      <h2 className="text-lg font-semibold mt-6 mb-2">
        Existing Discount Items
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 bg-white rounded-lg shadow-sm">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Subtitle</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Product ID</th>
              <th className="px-4 py-2 border">Features</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {discountItems.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border text-center">
                  {item.chairImage ? (
                    <img
                      src={`${BACKEND_URL}/${item.chairImage}`}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-md mx-auto"
                    />
                  ) : (
                    <span className="text-gray-400 italic">No image</span>
                  )}
                </td>
                <td className="px-4 py-2 border font-semibold">{item.title}</td>
                <td className="px-4 py-2 border">{item.subtitle || "-"}</td>
                <td className="px-4 py-2 border">{item.category}</td>
                <td className="px-4 py-2 border text-xs text-gray-500">
                  {item.productId}
                </td>
                <td className="px-4 py-2 border">
                  {item.features?.length > 0 ? (
                    <ul className="list-disc pl-4 space-y-1">
                      {item.features.map((f, idx) => (
                        <li key={idx}>{f}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-gray-400 italic">None</span>
                  )}
                </td>
                <td
                  className="px-4 py-2 border max-w-xs truncate"
                  title={item.description}
                >
                  {item.description || "-"}
                </td>
                <td className="px-4 py-2 border text-center space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-xs"
                  >
                    Delete
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

export default AdminDiscountItem;
