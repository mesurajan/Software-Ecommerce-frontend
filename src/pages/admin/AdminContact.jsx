import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

function AdminContact() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchContacts = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/contact`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        setContacts(res.data.contacts);
      } else {
        toast.error("Failed to fetch contacts");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error while fetching contacts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;

    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/contact/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        toast.success("Message deleted successfully");
        setContacts((prev) => prev.filter((c) => c._id !== id));
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete message");
    }
  };

const handleResolve = async (id) => {
  try {
    const res = await axios.patch(
      `${import.meta.env.VITE_BACKEND_URL}/api/contact/${id}/resolve`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (res.data.success) {
      toast.success(res.data.message);
      // Update state immediately
      setContacts((prev) =>
        prev.map((c) =>
          c._id === id ? { ...c, resolved: true } : c
        )
      );
    } else {
      toast.error(res.data.message);
    }
  } catch (err) {
    console.error(err);
    toast.error("Failed to mark as resolved");
  }
};
  return (
    <div className="container mx-auto px-6 py-8 text-mainbackground">
      <h1 className="text-3xl font-bold mb-6">Contact Messages</h1>
      {loading ? (
        <p>Loading messages...</p>
      ) : contacts.length === 0 ? (
        <p>No messages submitted yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-backgroundlite rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 text-left">User Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Subject</th>
                <th className="py-3 px-4 text-left">Message</th>
                <th className="py-3 px-4 text-left">Resolved</th>
                <th className="py-3 px-4 text-left">Submitted At</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <tr
                  key={c._id}
                  className={`border-b hover:bg-gray-100 ${
                    c.resolved ? "bg-green-50" : ""
                  }`}
                >
                  <td className="py-2 px-4">{c.user?.name || c.name}</td>
                  <td className="py-2 px-4">{c.user?.email || c.email}</td>
                  <td className="py-2 px-4">{c.subject}</td>
                  <td className="py-2 px-4">{c.message}</td>
                  <td className="py-2 px-4">
                    {c.resolved ? "✅ Resolved" : "❌ Pending"}
                  </td>
                  <td className="py-2 px-4">
                    {new Date(c.createdAt).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 flex gap-2">
                    {!c.resolved && (
                      <button
                        disabled={c.resolved}
                        onClick={() => handleResolve(c._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Resolve
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminContact;
