import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Menu, X, LayoutDashboard, Users, MessageSquare, BarChart3,
  PhoneCall, ClipboardList, FileText, CreditCard, Database,
  Shield, Bell, LogOut
} from "lucide-react";
import {
  SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton,
  SidebarMenuItem, SidebarHeader
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

export function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [isOpen, setIsOpen] = useState(false);

  // 👇 get logged-in role
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "guest";

  const isActive = (path) => currentPath.startsWith(path);

  const getNavCls = (active) =>
    active
      ? "bg-blue-800/40 text-white font-medium border-r-2 border-blue-400"
      : "hover:bg-blue-700/30 hover:text-[#001f3f] text-gray-300";

  // 👇 define menu items
  const menuItems = [
    {
      title: "Overview",
      items: [
        { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
        { title: "Analytics", url: "/admin/analytics", icon: BarChart3 }
      ]
    },
    ...(role === "admin"
      ? [
          {
            title: "User Management",
            items: [
              { title: "All User List", url: "/admin/users", icon: Users },
              { title: "Customers List", url: "/admin/customers", icon: Users },
              { title: "Sellers List", url: "/admin/sellers", icon: Users },
              { title: "User Analytics", url: "/admin/users/analytics", icon: BarChart3 }
            ]
          }
        ]
      : []),

    {
      title: "Products",
      items: [
        { title: "Manage Products", url: "/admin/products", icon: ClipboardList },
        { title: "Categories & Collections", url: "/admin/categories", icon: ClipboardList },
        { title: "Product Approval", url: "/admin/approval", icon: ClipboardList }
      ]
    },
    {
      title: "Orders & Sales",
      items: [
        { title: "All Orders", url: "/admin/orders", icon: ClipboardList },
        { title: "Returns / Refund Requests", url: "/admin/refunds", icon: ClipboardList },
        { title: "Delivery Management", url: "/admin/delivery", icon: ClipboardList }
      ]
    },
    {
      title: "Complaints & Support",
      items: [
        { title: "All Complaints", url: "/admin/complaints", icon: MessageSquare },
        { title: "All Contacts", url: "/admin/contacts", icon: PhoneCall },
        { title: "All Feedback", url: "/admin/feedback", icon: ClipboardList },
        { title: "Complaint Analytics", url: "/admin/complaints/analytics", icon: BarChart3 }
      ]
    },
    {
      title: "Billing & Payments",
      items: [
        { title: "Bills Management", url: "/admin/bills", icon: FileText },
        { title: "Payment Processing", url: "/admin/payments", icon: CreditCard },
        { title: "Billing Analytics", url: "/admin/billing/analytics", icon: BarChart3 }
      ]
    },
    {
      title: "System & Security",
      items: [
        { title: "System Health", url: "/admin/system", icon: Database },
        { title: "Security", url: "/admin/security", icon: Shield },
        { title: "Notifications", url: "/admin/notifications", icon: Bell }
      ]
    }
  ];

  // 👇 logout handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
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
        className={`fixed top-0 left-0 h-full w-64 bg-[#1e293b] shadow-lg transform transition-transform duration-300 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:w-72 flex flex-col`}
      >
        {/* Header */}
        <SidebarHeader className="border-b border-white/20 p-4">
          <h2 className="text-lg font-bold text-white">Hekto Furniture</h2>
          <p className="text-xs text-gray-400">
            {role === "admin" ? "Admin Portal" : "Seller Portal"}
          </p>
        </SidebarHeader>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <SidebarContent className="px-2 py-4">
            {menuItems.map((group, groupIndex) => (
              <SidebarGroup key={groupIndex} className="mb-6">
                <SidebarGroupLabel className="text-xs font-semibold uppercase mb-2 text-gray-400">
                  {group.title}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item, i) => (
                      <SidebarMenuItem key={i}>
                        <SidebarMenuButton asChild>
                          <NavLink
                            to={item.url}
                            className={`${getNavCls(isActive(item.url))} flex items-center space-x-3 px-3 py-2 rounded-md`}
                          >
                            <item.icon className="h-5 w-5" />
                            <span className="text-sm">{item.title}</span>
                            {item.badge && (
                              <Badge
                                variant="secondary"
                                className="ml-auto text-xs bg-blue-600 text-white"
                              >
                                {item.badge}
                              </Badge>
                            )}
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>
        </div>

        {/* ✅ Logout button */}
        <div className="p-4 border-t border-white/20">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/20 rounded-md"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
