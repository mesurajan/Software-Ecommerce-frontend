// src/pages/admin/AdminBillManagement.jsx
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Search,
  Eye,
  CheckCircle,
  FileText,
  Download,
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

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5174";

const AdminBillManagement = () => {
  const [bills, setBills] = useState([]);
  const [search, setSearch] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filterStatus, setFilterStatus] = useState(""); // Paid / Pending / Overdue

  const token = localStorage.getItem("token");

  // Fetch bills (orders)
  const fetchBills = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${BACKEND_URL}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBills(res.data.orders || []);
    } catch (err) {
      console.error("Fetch bills error:", err);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  // Filter by search + payment status
  const filteredBills = useMemo(() => {
    return bills.filter((bill) => {
      const matchesSearch =
        !search.trim() ||
        bill._id.toLowerCase().includes(search.toLowerCase()) ||
        bill.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
        bill.paymentStatus?.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = !filterStatus || bill.paymentStatus === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [bills, search, filterStatus]);

  const displayedBills = filteredBills.slice(0, itemsPerPage || filteredBills.length);

  // Update payment status
  const markPaid = async (id) => {
    try {
      await axios.put(
        `${BACKEND_URL}/api/orders/${id}`,
        { paymentStatus: "PAID" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchBills();
    } catch (err) {
      console.error("Update status error:", err);
      alert("Failed to update status");
    }
  };

  const statusVariant = (status) =>
    status === "PAID" ? "success" : status === "PENDING" ? "warning" : "destructive";

  return (
    <Card className="w-full border-0 shadow-xl">
      <CardHeader className="pb-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <CardTitle className="text-xl font-bold">Bill Management</CardTitle>
          <p className="text-sm text-muted-foreground">
            {filteredBills.length} bills found
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={filterStatus === "" ? "default" : "outline"}
              onClick={() => setFilterStatus("")}
            >
              All
            </Button>
            <Button
              size="sm"
              variant={filterStatus === "PAID" ? "default" : "outline"}
              onClick={() => setFilterStatus("PAID")}
            >
              Paid
            </Button>
            <Button
              size="sm"
              variant={filterStatus === "PENDING" ? "default" : "outline"}
              onClick={() => setFilterStatus("PENDING")}
            >
              Pending
            </Button>
            <Button
              size="sm"
              variant={filterStatus === "OVERDUE" ? "default" : "outline"}
              onClick={() => setFilterStatus("OVERDUE")}
            >
              Overdue
            </Button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search invoice / customer / status..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 w-full sm:w-64"
            />
          </div>

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
        <div className="overflow-x-auto rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="py-2 px-4 border-2">Invoice ID</TableHead>
                <TableHead className="py-2 px-4 border-2">Customer</TableHead>
                <TableHead className="py-2 px-4 border-2">Amount</TableHead>
                <TableHead className="py-2 px-4 border-2">Payment Status</TableHead>
                <TableHead className="py-2 px-4 border-2">Payment Method</TableHead>
                <TableHead className="text-center border-2">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {displayedBills.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center border-2">
                    No bills found
                  </TableCell>
                </TableRow>
              ) : (
                displayedBills.map((bill) => (
                  <TableRow key={bill._id} className="group">
                    <TableCell className="font-mono text-xs border-2">{bill._id}</TableCell>
                    <TableCell className="text-xs border-2">{bill.user?.name || "Guest"}</TableCell>
                    <TableCell className="font-semibold border-2">Rs. {bill.total}</TableCell>
                    <TableCell className="border-2">
                      <Badge variant={statusVariant(bill.paymentStatus)}>
                        {bill.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="border-2">{bill.paymentMethod || "N/A"}</TableCell>
                    <TableCell className="w-[140px]">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" /> View
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="max-w-2xl">
                            <AlertDialogHeader>
                              <AlertDialogTitle>Invoice Details</AlertDialogTitle>
                            </AlertDialogHeader>
                            <div className="space-y-4 text-sm">
                              <div className="rounded-lg border p-3">
                                <p><strong>Name:</strong> {bill.user?.name}</p>
                                <p><strong>Email:</strong> {bill.user?.email}</p>
                              </div>
                              <div className="rounded-lg border p-3">
                                <p className="font-semibold mb-2">Items</p>
                                {bill.items.map((i, idx) => (
                                  <div key={idx} className="flex justify-between">
                                    <span>{i.title} × {i.quantity}</span>
                                    <span>Rs. {i.price * i.quantity}</span>
                                  </div>
                                ))}
                              </div>
                              <div className="rounded-lg border p-3">
                                <p><strong>Subtotal:</strong> Rs. {bill.subtotal}</p>
                                <p><strong>Delivery Fee:</strong> Rs. {bill.deliveryFee}</p>
                                <p className="font-semibold"><strong>Total:</strong> Rs. {bill.total}</p>
                                <p><strong>Payment Method:</strong> {bill.paymentMethod}</p>
                                <p><strong>Status:</strong> {bill.paymentStatus}</p>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                <p>Invoice ID: {bill._id}</p>
                                <p>Created: {new Date(bill.createdAt).toLocaleString()}</p>
                              </div>
                            </div>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Close</AlertDialogCancel>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                        {bill.paymentStatus !== "PAID" && (
                          <Button size="sm" onClick={() => markPaid(bill._id)}>
                            <CheckCircle className="h-4 w-4 mr-1" /> Mark Paid
                          </Button>
                        )}

                        <Button size="sm" variant="outline">
                          <FileText className="h-4 w-4 mr-1" /> PDF
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          Showing {displayedBills.length} of {filteredBills.length} bills
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminBillManagement;
