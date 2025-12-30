import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Search,
  Eye,
  CheckCircle,
  ShoppingCart,
  User,
  CreditCard,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5174";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const token = localStorage.getItem("token");

  /* ================= FETCH ORDERS ================= */
  const fetchOrders = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${BACKEND_URL}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error("Fetch orders error:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /* ================= FILTER ================= */
  const filteredOrders = useMemo(() => {
    if (!search.trim()) return orders;
    const q = search.toLowerCase();

    return orders.filter(
      (o) =>
        o._id.toLowerCase().includes(q) ||
        o.user?._id?.toLowerCase().includes(q) ||
        o.user?.name?.toLowerCase().includes(q) ||
        o.paymentStatus?.toLowerCase().includes(q)
    );
  }, [orders, search]);

  const displayedOrders = filteredOrders.slice(
    0,
    itemsPerPage || filteredOrders.length
  );

  /* ================= UPDATE STATUS ================= */
  const markPaid = async (id) => {
    try {
      await axios.put(
        `${BACKEND_URL}/api/orders/${id}`,
        { paymentStatus: "PAID" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchOrders();
    } catch (err) {
      console.error("Update status error:", err);
      alert("Failed to update status");
    }
  };

  const statusVariant = (status) =>
    status === "PAID" ? "default" : "secondary";

  return (
    <Card className="w-full border-0 shadow-xl">
      <CardHeader className="pb-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
              <ShoppingCart className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold">
                Order Management
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {filteredOrders.length} orders found
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search order / user / status..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 w-full sm:w-64"
              />
            </div>

            <Input
              type="number"
              min={1}
              value={itemsPerPage}
              onChange={(e) =>
                setItemsPerPage(Number(e.target.value) || 10)
              }
              className="w-24 text-center"
            />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-xl border overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="
                    py-2 px-4 border-2" >Order ID</TableHead>
                  <TableHead className="
                    py-2 px-4 border-2">User</TableHead>
                  <TableHead className="
                    py-2 px-4 border-2">Items</TableHead>
                  <TableHead className="
                    py-2 px-4 border-2">Total</TableHead>
                  <TableHead className="
                    py-2 px-4 border-2">Status</TableHead>
                  <TableHead className="text-center  border-2">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody  className="
                    py-2 px-4 border-2" >
                {displayedOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center border-2">
                      No orders found
                    </TableCell>
                  </TableRow>
                ) : (
                  displayedOrders.map((order) => (
                    <TableRow key={order._id} className="group">
                      <TableCell className="font-mono text-xs border-2">
                        {order._id}
                      </TableCell>

                      <TableCell className=" text-xs border-2">
                        <div className="flex flex-col text-sm">
                          <span className="flex items-center gap-2 font-medium">
                            <User className="h-4 w-4 text-muted-foreground" />
                            {order.user?.name || "Guest"}
                          </span>
                          
                        </div>
                      </TableCell>

                      <TableCell className="max-w-[240px] whitespace-normal break-words border-2">
                        {order.items.map((i, idx) => (
                          <div key={idx}>
                            {i.title} × {i.quantity}
                          </div>
                        ))}
                      </TableCell>

                      <TableCell className="font-semibold border-2">
                        Rs. {order.total}
                      </TableCell>

                      <TableCell className=" border-2">
                        <Badge variant={statusVariant(order.paymentStatus)}>
                          {order.paymentStatus}
                        </Badge>
                      </TableCell>

                      <TableCell className ="  w-[85px] sm:w-[85px] md:w-[85px] lg:w-[85px]">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition
                         ">
                          {/* VIEW DETAILS */}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            </AlertDialogTrigger>

                            <AlertDialogContent className="max-w-2xl">
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Order Details
                                </AlertDialogTitle>
                              </AlertDialogHeader>

                              <div className="space-y-4 text-sm">
                                {/* USER */}
                                <div className="rounded-lg border p-3">
                                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    Customer
                                  </h4>
                                  <p><strong>Name:</strong> {order.user?.name}</p>
                                  <p><strong>User ID:</strong> {order.user?._id}</p>
                                  <p><strong>Email:</strong> {order.user?.email}</p>
                                </div>

                                {/* SHIPPING */}
                                <div className="rounded-lg border p-3">
                                  <h4 className="font-semibold mb-2">📦 Shipping</h4>
                                  <p><strong>Phone:</strong> {order.shipping?.phone}</p>
                                  <p><strong>Address:</strong> {order.shipping?.address}</p>
                                </div>

                                {/* ITEMS */}
                                <div className="rounded-lg border p-3">
                                  <h4 className="font-semibold mb-2">🛒 Items</h4>
                                  {order.items.map((i, idx) => (
                                    <div key={idx} className="flex justify-between">
                                      <span>{i.title} × {i.quantity}</span>
                                      <span>Rs. {i.price * i.quantity}</span>
                                    </div>
                                  ))}
                                </div>

                                {/* PAYMENT */}
                                <div className="rounded-lg border p-3">
                                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                                    <CreditCard className="h-4 w-4" />
                                    Payment
                                  </h4>
                                  <p><strong>Method:</strong> {order.paymentMethod}</p>
                                  <p><strong>Status:</strong> {order.paymentStatus}</p>
                                  <p><strong>Subtotal:</strong> Rs. {order.subtotal}</p>
                                  <p><strong>Delivery Fee:</strong> Rs. {order.deliveryFee}</p>
                                  <p className="font-semibold">
                                    <strong>Total:</strong> Rs. {order.total}
                                  </p>
                                </div>

                                {/* META */}
                                <div className="text-xs text-muted-foreground">
                                  <p>Order ID: {order._id}</p>
                                  <p>
                                    Created:{" "}
                                    {new Date(order.createdAt).toLocaleString()}
                                  </p>
                                </div>
                              </div>

                              <AlertDialogFooter>
                                <AlertDialogCancel>Close</AlertDialogCancel>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>

                          {order.paymentStatus !== "PAID" && (
                            <Button size="sm" onClick={() => markPaid(order._id)}>
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Mark Paid
                            </Button>
                          )}
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
          Showing {displayedOrders.length} of {filteredOrders.length} orders
        </div>
      </CardContent>
    </Card>
  );
}

export default AdminOrders;
