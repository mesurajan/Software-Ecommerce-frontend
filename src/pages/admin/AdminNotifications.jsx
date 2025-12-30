import React, { useState } from "react";
import { Bell, CheckCircle, XCircle, Info, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const sampleNotifications = [
  {
    id: "1",
    title: "New Order Received",
    message: "Order #1234 has been placed by John Doe.",
    type: "order",
    status: "unread",
    createdAt: "2025-12-30T13:30:00Z",
  },
  {
    id: "2",
    title: "Payment Failed",
    message: "Payment for Order #1233 failed due to insufficient balance.",
    type: "payment",
    status: "unread",
    createdAt: "2025-12-30T12:00:00Z",
  },
  {
    id: "3",
    title: "New Admin User Added",
    message: "User Jane Smith was added as an admin.",
    type: "user",
    status: "read",
    createdAt: "2025-12-29T18:45:00Z",
  },
];

const typeIcon = (type) => {
  switch (type) {
    case "order":
      return <CheckCircle className="h-5 w-5 text-blue-500" />;
    case "payment":
      return <CreditCard className="h-5 w-5 text-red-500" />;
    case "system":
      return <Info className="h-5 w-5 text-yellow-500" />;
    case "user":
      return <Bell className="h-5 w-5 text-green-500" />;
    default:
      return <Bell className="h-5 w-5 text-gray-500" />;
  }
};

function AdminNotifications() {
  const [notifications, setNotifications] = useState(sampleNotifications);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, status: "read" } : n
      )
    );
  };

  return (
    <Card className="w-full border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Notifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 max-h-[600px] overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="text-center text-muted-foreground">No notifications</p>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`flex items-start justify-between p-3 border rounded-lg transition ${
                n.status === "unread" ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-start gap-3">
                {typeIcon(n.type)}
                <div>
                  <h4 className="font-semibold">{n.title}</h4>
                  <p className="text-sm text-muted-foreground">{n.message}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(n.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                {n.status === "unread" && (
                  <Button size="sm" onClick={() => markAsRead(n.id)}>
                    Mark Read
                  </Button>
                )}
                <Badge variant={n.status === "unread" ? "secondary" : "default"}>
                  {n.status.toUpperCase()}
                </Badge>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}

export default AdminNotifications;
