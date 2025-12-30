import React, { useState, useMemo } from "react";
import axios from "axios";
import { Search, Pencil, Trash2, Save, X, Users, Mail, Phone, MapPin, Calendar, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5174";

function UserTable({ title, data, refreshData }) {
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", address: "", age: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter data based on search
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    const query = searchQuery.toLowerCase();
    return data.filter(
      (user) =>
        user.name?.toLowerCase().includes(query) ||
        user.email?.toLowerCase().includes(query) ||
        user.phone?.toLowerCase().includes(query) ||
        user.address?.toLowerCase().includes(query) ||
        user.role?.toLowerCase().includes(query)
    );
  }, [data, searchQuery]);

  const displayedData = filteredData.slice(0, itemsPerPage || filteredData.length);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BACKEND_URL}/api/auth/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      refreshData();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Error deleting user");
    }
  };

  const startEdit = (user) => {
    setEditingUser(user._id);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      age: String(user.age),
    });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${BACKEND_URL}/api/auth/users/${editingUser}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingUser(null);
      refreshData();
    } catch (err) {
      console.error("Update failed:", err);
      alert("Error updating user");
    }
  };

  const getRoleBadgeVariant = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "destructive";
      case "moderator":
        return "default";
      default:
        return "secondary";
    }
  };

  return (
    <Card className="w-full border-0 shadow-xl bg-gradient-to-br from-card to-card/80">
      <CardHeader className="pb-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold">{title}</CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                {filteredData.length} {filteredData.length === 1 ? "user" : "users"} found
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full sm:w-64 bg-background/50 border-border/50 focus:border-primary"
              />
            </div>

            {/* Items per page */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground whitespace-nowrap">Show:</span>
              <Input
                type="number"
                min={1}
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value) || 10)}
                className="w-20 bg-background/50 border-border/50 text-center"
              />
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-xl border border-border/50 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableHead className="font-semibold">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      Name
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      Email
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" />
                      Phone
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      Address
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      Age
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      Role
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-32 text-center">
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Users className="h-8 w-8 opacity-50" />
                        <p>No users found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  displayedData.map((u) => (
                    <TableRow key={u._id} className="group hover:bg-muted/20 transition-colors">
                      {editingUser === u._id ? (
                        <>
                          <TableCell>
                            <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="h-8 bg-background" />
                          </TableCell>
                          <TableCell>
                            <Input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="h-8 bg-background" />
                          </TableCell>
                          <TableCell>
                            <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="h-8 bg-background" />
                          </TableCell>
                          <TableCell>
                            <Input value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="h-8 bg-background" />
                          </TableCell>
                          <TableCell>
                            <Input value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} className="h-8 w-16 bg-background" />
                          </TableCell>
                          <TableCell>
                            <Badge variant={getRoleBadgeVariant(u.role)}>{u.role}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-end gap-2">
                              <Button size="sm" onClick={handleSave} className="h-8 gap-1.5">
                                <Save className="h-3.5 w-3.5" /> Save
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => setEditingUser(null)} className="h-8 gap-1.5">
                                <X className="h-3.5 w-3.5" /> Cancel
                              </Button>
                            </div>
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell className="font-medium">{u.name}</TableCell>
                          <TableCell className="text-muted-foreground">{u.email}</TableCell>
                          <TableCell className="text-muted-foreground">{u.phone}</TableCell>
                          <TableCell className="text-muted-foreground max-w-[200px] truncate">{u.address}</TableCell>
                          <TableCell className="text-muted-foreground">{u.age}</TableCell>
                          <TableCell>
                            <Badge variant={getRoleBadgeVariant(u.role)}>{u.role}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button size="sm" variant="outline" onClick={() => startEdit(u)} className="h-8 gap-1.5 hover:bg-primary hover:text-primary-foreground">
                                <Pencil className="h-3.5 w-3.5" /> Edit
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button size="sm" variant="outline" className="h-8 gap-1.5 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive">
                                    <Trash2 className="h-3.5 w-3.5" /> Delete
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete User</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete {u.name}? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDelete(u._id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <p>Showing {displayedData.length} of {filteredData.length} users</p>
          {searchQuery && (
            <Button variant="ghost" size="sm" onClick={() => setSearchQuery("")} className="h-7 text-xs">
              Clear search
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default UserTable;
