// src/pages/admin/AdminDashboard.jsx
import React, { useState } from "react";
import { Menu, X } from "lucide-react"; 
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "../../components/Admin/AdminSidebar";

function AdminDashboard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="flex relative min-h-screen">
        {/* Mobile Burger */}
        <button
          className="p-2 md:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white rounded"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Dark Backdrop */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-40
            ${isOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0 md:static md:w-72 flex flex-col`}
        >
          {/* Make sure AdminSidebar uses full height */}
          <div className="flex-1 overflow-y-auto">
            <AdminSidebar />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 md:ml-72 transition-all duration-300">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="mt-2">
            Welcome to the admin portal. Your content will be displayed here.
          </p>
        </div>
      </div>
    </SidebarProvider>

  );
}

export default AdminDashboard;
