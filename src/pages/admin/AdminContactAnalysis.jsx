import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function ContactAnalysis() {
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

  const total = contacts.length;
  const resolved = contacts.filter((c) => c.resolved).length;
  const pending = total - resolved;

  const data = {
    labels: ["Pending", "Resolved"],
    datasets: [
      {
        label: "# of Messages",
        data: [pending, resolved],
        backgroundColor: ["#F87171", "#34D399"],
        borderColor: ["#F87171", "#34D399"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto px-6 py-8 text-mainbackground">
      <h1 className="text-3xl font-bold mb-6">Contact Messages Analysis</h1>
      {loading ? (
        <p>Loading analysis...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-backgroundlite p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">Total Messages</h2>
              <p className="text-3xl font-bold">{total}</p>
            </div>
            <div className="bg-backgroundlite p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">Resolved Messages</h2>
              <p className="text-3xl font-bold text-green-500">{resolved}</p>
            </div>
            <div className="bg-backgroundlite p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">Pending Messages</h2>
              <p className="text-3xl font-bold text-red-500">{pending}</p>
            </div>
          </div>

          <div className="bg-backgroundlite p-6 rounded shadow w-full md:w-1/2 mx-auto">
            <h2 className="text-xl font-semibold mb-4">Message Status Distribution</h2>
            <Pie data={data} />
          </div>
        </>
      )}
    </div>
  );
}

export default ContactAnalysis;
