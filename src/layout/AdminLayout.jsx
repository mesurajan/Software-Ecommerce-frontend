// src/layout/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import { AdminSidebar } from "../components/Admin/AdminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AdminLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-100">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <main className="flex-1 min-w-0 overflow-x-hidden ml-0 md:ml-72 pr-[6px] transition-all">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
