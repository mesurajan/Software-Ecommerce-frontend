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
import {
  Users,
  DollarSign,
  Clock,
  RefreshCcw,
  Activity,
} from "lucide-react";

import AdminPage from "../../components/Admin/AdminPage";

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
      <div className="px-10 py-0">
      {/* Header */}
      <div className="flex justify-between items-center   shadow py-10 bg-[#1e293b] text-white px-15">
        <h1 className="text-3xl font-bold">Admin - Dashboard</h1>
      
      </div>

 
      {/* RIGHT GAP = 12px */}
      <div className="pr-3">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8 mt-4">
          {[
            { icon: Users, label: "Total Users", value: "1,235", color: "text-indigo-600" },
            { icon: DollarSign, label: "Total Income", value: "$56k", color: "text-green-600" },
            { icon: Clock, label: "Pending Items", value: "1,120", color: "text-yellow-600" },
            { icon: RefreshCcw, label: "New Updates", value: "89", color: "text-blue-600" },
            { icon: Activity, label: "Active Sessions", value: "342", color: "text-red-600" },
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow">
              <item.icon className={`${item.color} mb-2`} size={28} />
              <p className="text-sm text-gray-500">{item.label}</p>
              <p className="text-2xl font-bold">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="font-semibold mb-4">Monthly Income</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={incomeData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="income" fill="#6366F1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="font-semibold mb-4">User Growth</h2>
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
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
            <h2 className="font-semibold mb-4">Session Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={sessionsData} dataKey="value" outerRadius={100} label>
                  {sessionsData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
