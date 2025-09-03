// src/layout/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import { AdminSidebar } from "../components/Admin/AdminSidebar";

// import provider from your shadcn/ui sidebar
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AdminLayout() {
  return (
    <SidebarProvider>
      <div className="flex flex-row">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white">
          <AdminSidebar />
        </aside>

        {/* Main content */}
        <main className="">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
