// src/pages/admin/AdminSlider2.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = "http://localhost:5174";

const AdminSlider2 = () => {
  const [sliders, setSliders] = useState([]);
  const [title, setTitle] = useState("");
  const [chairs, setChairs] = useState([
    { title: "", price: "", image: null, productLink: "" },
    { title: "", price: "", image: null, productLink: "" },
    { title: "", price: "", image: null, productLink: "" },
    { title: "", price: "", image: null, productLink: "" },
  ]);
  const token = localStorage.getItem("token");

  // Fetch sliders
  const fetchSliders = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/slider`);
      setSliders(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      console.error("Error fetching sliders:", err);
    }
  };
  useEffect(() => {
    fetchSliders();
  }, []);

  const handleChairChange = (index, field, value) => {
    const updated = [...chairs];
    updated[index][field] = value;
    setChairs(updated);
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
        chairimage: c.image ? c.image.name : "",
        productLink: c.productLink,
      }));
      formData.append("chairs", JSON.stringify(chairsData));

      chairs.forEach((c) => {
        if (c.image) formData.append("images", c.image);
      });

      await axios.post(`${BACKEND_URL}/api/slider`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ Slider created successfully!");
      setTitle("");
      setChairs([
        { title: "", price: "", image: null, productLink: "" },
        { title: "", price: "", image: null, productLink: "" },
        { title: "", price: "", image: null, productLink: "" },
        { title: "", price: "", image: null, productLink: "" },
      ]);
      fetchSliders();
    } catch (err) {
      console.error("Error creating slider:", err);
      alert("❌ Failed to create slider.");
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

  const getImageUrl = (path) => {
    if (!path) return `${BACKEND_URL}/uploads/Default/lightimage.png`;
    return `${BACKEND_URL}/${path.replace(/\\/g, "/")}`;
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Manage Sliders</h1>

      {/* Create Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow rounded p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Create New Slider</h2>
        <div className="mb-4">
          <label className="block font-medium mb-1">Slider Title</label>
          <input
            type="text"
            className="border rounded w-full p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <h3 className="font-medium mb-2">Chairs (4 per slider)</h3>
        {chairs.map((chair, index) => (
          <div
            key={index}
            className="border rounded p-3 mb-3 flex flex-col md:flex-row gap-3"
          >
            <input
              type="text"
              placeholder="Chair title"
              className="border p-2 rounded flex-1"
              value={chair.title}
              onChange={(e) =>
                handleChairChange(index, "title", e.target.value)
              }
              required
            />
            <input
              type="number"
              placeholder="Price"
              className="border p-2 rounded w-28"
              value={chair.price}
              onChange={(e) =>
                handleChairChange(index, "price", e.target.value)
              }
              required
            />
           
            <input
              type="text"
              placeholder="Product ID or Name"
              className="border p-2 rounded flex-1"
              value={chair.productLink}
              onChange={(e) =>
                handleChairChange(index, "productLink", e.target.value)
              }
            />

             <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleChairChange(index, "image", e.target.files[0])
              }
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Slider
        </button>
      </form>

      {/* Existing Sliders */}
      <h2 className="text-lg font-semibold mb-2">Existing Sliders</h2>
      {sliders.map((slider) => (
        <div key={slider._id} className="border p-4 rounded mb-3 bg-gray-50">
          <h3 className="font-bold mb-2">{slider.title}</h3>
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
                {chair.productLink && (
                  <p className="text-xs text-blue-600">
                    Product Id: {chair.productLink}
                  </p>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={() => handleDelete(slider._id)}
            className="mt-3 text-red-600 hover:underline"
          >
            Delete Slider
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminSlider2;
