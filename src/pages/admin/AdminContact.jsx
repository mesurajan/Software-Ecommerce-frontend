import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Eye, Trash2, CheckCircle, User } from "lucide-react";

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
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5174";

function AdminContact() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  /* ================= FETCH CONTACTS ================= */
  const fetchContacts = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/contact`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setContacts(res.data.contacts || []);
      } else {
        toast.error("Failed to fetch contacts");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error while fetching contacts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  /* ================= FILTER ================= */
  const filteredContacts = useMemo(() => {
    if (!search.trim()) return contacts;
    const q = search.toLowerCase();
    return contacts.filter(
      (c) =>
        c.subject?.toLowerCase().includes(q) ||
        c.message?.toLowerCase().includes(q) ||
        c.user?.name?.toLowerCase().includes(q) ||
        c.user?.email?.toLowerCase().includes(q)
    );
  }, [contacts, search]);

  const displayedContacts = filteredContacts.slice(
    0,
    itemsPerPage || filteredContacts.length
  );

  /* ================= ACTIONS ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;

    try {
      const res = await axios.delete(`${BACKEND_URL}/api/contact/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        toast.success("Message deleted successfully");
        setContacts((prev) => prev.filter((c) => c._id !== id));
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete message");
    }
  };

  const handleResolve = async (id) => {
    try {
      const res = await axios.patch(
        `${BACKEND_URL}/api/contact/${id}/resolve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setContacts((prev) =>
          prev.map((c) => (c._id === id ? { ...c, resolved: true } : c))
        );
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to mark as resolved");
    }
  };

  const statusVariant = (resolved) => (resolved ? "default" : "secondary");

  /* ================= RENDER ================= */
  return (
    <Card className="w-full border-0 shadow-xl">
      <CardHeader className="pb-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
            <User className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold">Contact Management</CardTitle>
            <p className="text-sm text-muted-foreground">
              {filteredContacts.length} messages found
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Input
              placeholder="Search subject / user / email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-3 w-full sm:w-64"
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
        {loading ? (
          <p>Loading messages...</p>
        ) : displayedContacts.length === 0 ? (
          <p>No messages submitted yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="py-2 px-4 border-2">User Name</TableHead>
                  <TableHead className="py-2 px-4 border-2">Email</TableHead>
                  <TableHead className="py-2 px-4 border-2">Subject</TableHead>
                  <TableHead className="py-2 px-4 border-2">Status</TableHead>
                  <TableHead className="py-2 px-4 text-right border-2">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {displayedContacts.map((c) => (
                  <TableRow
                    key={c._id}
                    className={`border-b hover:bg-gray-100 ${c.resolved ? "bg-green-50" : ""}`}
                  >
                    <TableCell className="py-2 px-4 border-2  w-[165px] sm:w-[165px] md:w-[325px] lg:w-[485px]">{c.user?.name || c.name}</TableCell>
                    <TableCell className="py-2 px-4 border-2  w-[95px] sm:w-[95px] md:w-[145px] lg:w-[485px]">{c.user?.email || c.email}</TableCell>
                    <TableCell className="py-2 px-4 border-2  w-[165px] sm:w-[165px] md:w-[325px] lg:w-[485px]">{c.subject}</TableCell>
                    <TableCell className="py-2 px-4 border-2  w-[85px] sm:w-[85px] md:w-[125px] lg:w-[185px]">
                      <Badge variant={statusVariant(c.resolved)}>
                        {c.resolved ? "✅ Resolved" : "❌ Pending"}
                      </Badge>
                    </TableCell>

                    <TableCell className="py-2 px-4 border-2 flex justify-end gap-2 ">
                      {/* VIEW DETAILS */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" /> View
                          </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent className="max-w-2xl">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Contact Details</AlertDialogTitle>
                          </AlertDialogHeader>
                          <div className="space-y-3 text-sm">
                            <p><strong>Name:</strong> {c.user?.name || c.name}</p>
                            <p><strong>Email:</strong> {c.user?.email || c.email}</p>
                            <p><strong>Subject:</strong> {c.subject}</p>
                            <p><strong>Message:</strong> {c.message}</p>
                            <p><strong>Status:</strong> {c.resolved ? "Resolved" : "Pending"}</p>
                            <p><strong>Submitted At:</strong> {new Date(c.createdAt).toLocaleString()}</p>
                          </div>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Close</AlertDialogCancel>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                      {!c.resolved && (
                        <Button
                          size="sm"
                          onClick={() => handleResolve(c._id)}
                          className="bg-green-500 text-white hover:bg-green-600"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Resolve
                        </Button>
                      )}

                      <Button
                        size="sm"
                        onClick={() => handleDelete(c._id)}
                        className="bg-red-500 text-white hover:bg-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="mt-4 text-sm text-muted-foreground">
              Showing {displayedContacts.length} of {filteredContacts.length} messages
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default AdminContact;
