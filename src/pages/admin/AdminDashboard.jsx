import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Users, DollarSign, Clock, RefreshCcw, Activity } from "lucide-react";

function AdminDashboard() {
  const incomeData = [
    { month: "Jan", income: 4000 },
    { month: "Feb", income: 3000 },
    { month: "Mar", income: 5000 },
    { month: "Apr", income: 2500 },
    { month: "May", income: 6000 },
  ];

  const usersData = [
    { month: "Jan", users: 800 },
    { month: "Feb", users: 1200 },
    { month: "Mar", users: 1800 },
    { month: "Apr", users: 2200 },
    { month: "May", users: 2800 },
  ];

  const sessionsData = [
    { name: "Desktop", value: 400 },
    { name: "Mobile", value: 300 },
    { name: "Tablet", value: 200 },
  ];

  const COLORS = ["#6366F1", "#10B981", "#F59E0B"];

  return (
    <main className="flex-1 p-6 bg-gray-100">
      <div className="container mx-auto space-y-8">
        <h1 className="text-2xl font-bold mb-5">Admin Dashboard</h1>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="p-6 bg-white rounded shadow flex flex-col items-start">
            <Users className="text-indigo-600 mb-2" size={28} />
            <h2 className="text-sm font-semibold text-gray-600">Total Users</h2>
            <p className="text-2xl font-bold mt-1">1,235</p>
          </div>

          <div className="p-6 bg-white rounded shadow flex flex-col items-start">
            <DollarSign className="text-green-600 mb-2" size={28} />
            <h2 className="text-sm font-semibold text-gray-600">Total Income</h2>
            <p className="text-2xl font-bold mt-1">$56k</p>
          </div>

          <div className="p-6 bg-white rounded shadow flex flex-col items-start">
            <Clock className="text-yellow-600 mb-2" size={28} />
            <h2 className="text-sm font-semibold text-gray-600">Pending Items</h2>
            <p className="text-2xl font-bold mt-1">1,120</p>
          </div>

          <div className="p-6 bg-white rounded shadow flex flex-col items-start">
            <RefreshCcw className="text-blue-600 mb-2" size={28} />
            <h2 className="text-sm font-semibold text-gray-600">New Updates</h2>
            <p className="text-2xl font-bold mt-1">89</p>
          </div>

          <div className="p-6 bg-white rounded shadow flex flex-col items-start">
            <Activity className="text-red-600 mb-2" size={28} />
            <h2 className="text-sm font-semibold text-gray-600">Active Sessions</h2>
            <p className="text-2xl font-bold mt-1">342</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Monthly Income</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={incomeData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="income" fill="#6366F1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">User Growth</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={usersData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded shadow lg:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Session Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sessionsData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {sessionsData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminDashboard;
