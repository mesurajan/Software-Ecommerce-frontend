// src/components/Admin/AdminPage.jsx
import React from "react";

export default function AdminPage({ title, action, children }) {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 transition-all">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        {action}
      </div>

      {children}
    </div>
  );
}
