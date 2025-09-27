// src/components/Admin/Slider/AdminSlider2.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = "http://localhost:5174";

const AdminSlider2 = () => {
  const [sliders, setSliders] = useState([]);
  const [products, setProducts] = useState([]); // ✅ products from backend
  const [title, setTitle] = useState("");
  const [chairs, setChairs] = useState([
    { title: "", price: "", image: null, chairimage: "", product: "", productSlug: "" },
    { title: "", price: "", image: null, chairimage: "", product: "", productSlug: "" },
    { title: "", price: "", image: null, chairimage: "", product: "", productSlug: "" },
    { title: "", price: "", image: null, chairimage: "", product: "", productSlug: "" },
  ]);
  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem("token");

  // ✅ Fetch sliders
  const fetchSliders = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/slider`);
      setSliders(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      console.error("Error fetching sliders:", err);
    }
  };

  // ✅ Fetch products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/products`);
      setProducts(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchSliders();
    fetchProducts();
  }, []);

  const handleProductSelect = (index, productId) => {
    const selected = products.find((p) => p._id === productId);
    if (!selected) return;
    const updated = [...chairs];
    updated[index] = {
      ...updated[index],
      title: selected.title,
      price: selected.price,
      chairimage: selected.images?.[0] || "",
      image: null,
      product: selected._id,
      productSlug: selected.slug,
    };
    setChairs(updated);
  };

  const handleInputChange = (index, field, value) => {
    const updated = [...chairs];
    updated[index][field] = value;
    setChairs(updated);
  };

  const resetForm = () => {
    setTitle("");
    setChairs([
      { title: "", price: "", image: null, chairimage: "", product: "", productSlug: "" },
      { title: "", price: "", image: null, chairimage: "", product: "", productSlug: "" },
      { title: "", price: "", image: null, chairimage: "", product: "", productSlug: "" },
      { title: "", price: "", image: null, chairimage: "", product: "", productSlug: "" },
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
        product: c.product,
        productSlug: c.productSlug,
      }));
      formData.append("chairs", JSON.stringify(chairsData));

      chairs.forEach((c) => {
        if (c.image) formData.append("images", c.image);
      });

      if (editingId) {
        await axios.put(`${BACKEND_URL}/api/slider/${editingId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        alert("✅ Slider updated successfully!");
      } else {
        await axios.post(`${BACKEND_URL}/api/slider`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        alert("✅ Slider created successfully!");
      }

      resetForm();
      fetchSliders();
    } catch (err) {
      console.error("Error saving slider:", err);
      alert("❌ Failed to save slider.");
    }
  };

  const handleDelete = async (id) => {
    if (!token) return alert("You must be logged in!");
    if (!window.confirm("Delete this slider?")) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/slider/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("🗑️ Slider deleted!");
      fetchSliders();
    } catch (err) {
      console.error("Error deleting slider:", err);
      alert("❌ Failed to delete slider.");
    }
  };

  const handleEdit = (slider) => {
    setEditingId(slider._id);
    setTitle(slider.title);

    setChairs(
      slider.chairs.map((c) => ({
        title: c.title,
        price: c.price,
        chairimage: c.chairimage,
        image: null,
        product: c.product?._id || c.product || "",
        productSlug: c.productSlug || c.product?.slug || "",
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
      <h1 className="text-xl font-bold mb-4">Manage Sliders</h1>

      {/* Create / Edit Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow rounded p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">
          {editingId ? "Edit Slider" : "Create New Slider"}
        </h2>
        <div className="mb-4">
          <label className="block font-medium mb-1">Slider Title</label>
          <input
            type="text"
            className="border rounded w-full p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            
          />
        </div>

        <h3 className="font-medium mb-2">Please Choose Your Products</h3>
        {chairs.map((chair, index) => (
          <div
            key={index}
            className="border rounded p-3 mb-3 flex flex-col md:flex-row gap-3 items-center"
          >
            {/* Product Dropdown */}
            <select
              className="border p-2 rounded flex-1"
              value={chair.product}
              onChange={(e) => handleProductSelect(index, e.target.value)}
            >
              <option value="">-- Select Product --</option>
              {products.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.title} (Rs.{p.price})
                </option>
              ))}
            </select>

            {/* Manual Input Override */}
            <input
              type="text"
              className="border p-2 rounded flex-1"
              placeholder="Custom Title"
              value={chair.title}
              onChange={(e) => handleInputChange(index, "title", e.target.value)}
            />
            <input
              type="number"
              className="border p-2 rounded w-28"
              placeholder="Price"
              value={chair.price}
              onChange={(e) => handleInputChange(index, "price", e.target.value)}
            />

            {/* Preview */}
            {chair.chairimage && (
              <img
                src={getImageUrl(chair.chairimage)}
                alt={chair.title}
                className="w-16 h-16 object-cover"
              />
            )}

            {/* Upload override */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const updated = [...chairs];
                updated[index].image = e.target.files[0];
                setChairs(updated);
              }}
            />
          </div>
        ))}

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editingId ? "Save Changes" : "Create Slider"}
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

      {/* Existing Sliders */}
      <h2 className="text-lg font-semibold mb-2">Existing Sliders</h2>
      {sliders.map((slider) => (
        <div key={slider._id} className="border p-4 rounded mb-3 bg-gray-50">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold">{slider.title}</h3>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(slider)}
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(slider._id)}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {slider.chairs?.map((chair, i) => (
              <div key={i} className="border rounded p-2 text-center">
                <img
                  src={getImageUrl(chair.chairimage)}
                  alt={chair.title}
                  className="w-24 h-24 object-cover mx-auto"
                />
                <p className="font-semibold">{chair.title}</p>
                <p className="text-sm text-gray-600">Rs.{chair.price}</p>
                {chair.product && (
                  <p className="text-xs text-blue-600">
                    Product ID: {chair.product?._id || chair.product}
                  </p>
                )}
                {chair.productSlug && (
                  <p className="text-xs text-gray-500">Slug: {chair.productSlug}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminSlider2;
