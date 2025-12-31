// src/pages/admin/AdminNotifications.jsx
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Bell, CheckCircle, Trash2 } from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5174";

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [search, setSearch] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const token = localStorage.getItem("token");

  // Fetch notifications from backend
  const fetchNotifications = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${BACKEND_URL}/api/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(res.data || []);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

// Delete a notification with confirmation
const deleteNotification = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this notification?");
  if (!confirmDelete) return;

  try {
    await axios.delete(`${BACKEND_URL}/api/notifications/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchNotifications();
  } catch (err) {
    console.error("Delete error:", err);
    alert("Failed to delete notification");
  }
};


  // Mark as read
  const markAsRead = async (id) => {
    try {
      await axios.put(`${BACKEND_URL}/api/notifications/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNotifications();
    } catch (err) {
      console.error("Mark as read error:", err);
      alert("Failed to mark notification as read");
    }
  };

  // Determine badge color
  const typeVariant = (type) => {
    switch (type) {
      case "user": return "secondary";
      case "order": return "success";
      case "payment": return "warning";
      case "system": return "default";
      default: return "default";
    }
  };

  // Filtered notifications based on search
  const filteredNotifications = useMemo(() => {
    if (!search.trim()) return notifications;
    const q = search.toLowerCase();
    return notifications.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.message.toLowerCase().includes(q) ||
        n.type?.toLowerCase().includes(q)
    );
  }, [notifications, search]);

  const displayedNotifications = filteredNotifications.slice(0, itemsPerPage || filteredNotifications.length);

  useEffect(() => {
    fetchNotifications();
    // Optional: poll every 30s for live updates
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="w-full border-0 shadow-xl">
      <CardHeader className="pb-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Bell className="h-5 w-5" /> Notifications
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {filteredNotifications.length} notifications
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Search notifications..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-3 w-full sm:w-64"
          />
          <Input
            type="number"
            min={1}
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value) || 10)}
            className="w-24 text-center"
          />
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-xl border overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="py-2 px-4 border-2">Title</TableHead>
                  <TableHead className="py-2 px-4 border-2">Message</TableHead>
                  <TableHead className="py-2 px-4 border-2">Type</TableHead>
                  <TableHead className="py-2 px-4 border-2">Status</TableHead>
                  <TableHead className="py-2 px-4 border-2">Date</TableHead>
                  <TableHead className="text-right border-2">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {displayedNotifications.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center border-2">
                      No notifications found
                    </TableCell>
                  </TableRow>
                ) : (
                  displayedNotifications.map((n) => (
                    <TableRow key={n._id} className="group">
                      <TableCell className="font-semibold border-2">{n.title}</TableCell>
                      <TableCell className="text-sm border-2">{n.message}</TableCell>
                      <TableCell className="border-2">
                        <Badge variant={typeVariant(n.type)}>{n.type}</Badge>
                      </TableCell>
                      <TableCell className="border-2">
                        <Badge variant={n.status === "unread" ? "destructive" : "default"}>
                          {n.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs border-2">
                        {new Date(n.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell className="w-[150px]">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition">
                          {n.status === "unread" && (
                            <Button size="sm" onClick={() => markAsRead(n._id)}>
                              <CheckCircle className="h-4 w-4 mr-1" /> Mark Read
                            </Button>
                          )}
                          <Button size="sm" variant="destructive" onClick={() => deleteNotification(n._id)}>
                            <Trash2 className="h-4 w-4 mr-1" /> Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          Showing {displayedNotifications.length} of {filteredNotifications.length} notifications
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminNotifications;
