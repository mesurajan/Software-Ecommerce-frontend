import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  Package, 
  Pencil, 
  Trash2, 
  Plus, 
  Save, 
  X, 
  ImageIcon, 
  DollarSign, 
  Tag, 
  FileText, 
  Hash,
  Info
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
import { useToast } from "@/hooks/use-toast";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5174";

function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    productId: "",
    title: "",
    price: "",
    category: "",
    subtitle: "",
  });
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/products`);
      const normalizedProducts = res.data.map((p) => ({
        ...p,
        id: p._id,
        image: p.image
          ? p.image.startsWith("http")
            ? p.image
            : `${BACKEND_URL}${p.image}`
          : "/placeholder.png",
        category:
          typeof p.category === "object" ? p.category.name : p.category,
      }));
      setProducts(normalizedProducts);
    } catch (err) {
      console.error("❌ Fetch products error:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/categories`);
      setCategories(res.data);
      if (res.data.length > 0 && !form.category) {
        setForm((prev) => ({ ...prev, category: res.data[0]._id }));
      }
    } catch (err) {
      console.error("❌ Fetch categories error:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      toast({ title: "Error", description: "You must be logged in!", variant: "destructive" });
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => formData.append(key, val));
    if (file) formData.append("image", file);

    try {
      if (editingId) {
        await axios.put(`${BACKEND_URL}/api/products/${editingId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        toast({ title: "Success", description: "Product updated successfully!" });
      } else {
        await axios.post(`${BACKEND_URL}/api/products`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        toast({ title: "Success", description: "Product added successfully!" });
      }

      setForm({
        productId: "",
        title: "",
        price: "",
        category: categories.length > 0 ? categories[0]._id : "",
        subtitle: "",
      });
      setFile(null);
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      console.error("❌ Submit product error:", err);
      toast({ title: "Error", description: "Failed to save product.", variant: "destructive" });
    }
  };

  const handleEdit = (product) => {
    setForm({
      productId: product.productId,
      title: product.title,
      price: String(product.price),
      category: product.category,
      subtitle: product.subtitle || "",
    });
    setEditingId(product.id);
  };

  const handleCancelEdit = () => {
    setForm({
      productId: "",
      title: "",
      price: "",
      category: categories.length > 0 ? categories[0]._id : "",
      subtitle: "",
    });
    setFile(null);
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    if (!token) {
      toast({ title: "Error", description: "You must be logged in!", variant: "destructive" });
      return;
    }
    try {
      await axios.delete(`${BACKEND_URL}/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({ title: "Success", description: "Product deleted successfully!" });
      fetchProducts();
    } catch (err) {
      console.error("❌ Delete product error:", err);
      toast({ title: "Error", description: "Failed to delete product.", variant: "destructive" });
    }
  };

  const handleAdditionalInfo = (id) => {
    navigate(`/admin/product-details/${id}`);
  };

  const filteredProducts = products.filter((p) => {
    const query = searchQuery.toLowerCase();
    return (
      p.productId?.toLowerCase().includes(query) ||
      p.title?.toLowerCase().includes(query) ||
      p.category?.toLowerCase().includes(query) ||
      p.subtitle?.toLowerCase().includes(query)
    );
  });

  const displayedProducts = filteredProducts.slice(0, itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-0">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3  bg-[#1e293b] text-white px-10 py-8">
          <div className="p-3 bg-gradient-to-br from-primary to-primary/80 rounded-xl shadow-lg">
            <Package className="h-8 w-8  text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text  text-white">
              Product Management
            </h1>
            <p className=" text-white">Add, edit, and manage your products</p>
          </div>
        </div>

        {/* Add/Edit Product Form */}
        <Card className="border-0 shadow-xl bg-gradient-to-br from-card to-card/95">
          <CardHeader className="border-b border-border/50">
            <CardTitle className="flex items-center gap-2">
              {editingId ? (
                <>
                  <Pencil className="h-5 w-5 text-amber-500" />
                  Edit Product
                </>
              ) : (
                <>
                  <Plus className="h-5 w-5 text-primary" />
                  Add New Product
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Product ID */}
                <div className="space-y-2">
                  <Label htmlFor="productId" className="flex items-center gap-2">
                    <Hash className="h-4 w-4 text-muted-foreground" />
                    Product ID
                  </Label>
                  <Input
                    id="productId"
                    placeholder="Enter unique Product ID"
                    value={form.productId}
                    onChange={(e) => setForm({ ...form, productId: e.target.value })}
                    required
                    disabled={!!editingId}
                    className="border-border/50 focus:border-primary"
                  />
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    Title
                  </Label>
                  <Input
                    id="title"
                    placeholder="Enter product title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                    className="border-border/50 focus:border-primary"
                  />
                </div>

                {/* Price */}
               <div className="space-y-2">
                <Label htmlFor="price" className="flex items-center gap-2">
                  <span className="h-4 w-4 flex items-center justify-center text-muted-foreground">₹</span>
                  Price
                </Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="Enter product price"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  required
                  className="border-border/50 focus:border-primary"
                />
              </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category" className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    Category
                  </Label>
                  <Select
                    value={form.category}
                    onValueChange={(value) => setForm({ ...form, category: value })}
                  >
                    <SelectTrigger className="border-border/50 focus:border-primary">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat._id} value={cat._id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Image */}
                <div className="space-y-2">
                  <Label htmlFor="image" className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4 text-muted-foreground" />
                    Product Image
                  </Label>
                  <Input
                    id="image"
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="border-border/50 focus:border-primary file:bg-primary file:text-primary-foreground file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3"
                  />
                </div>

                {/* Subtitle */}
                <div className="space-y-2 md:col-span-2 lg:col-span-1">
                  <Label htmlFor="subtitle" className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    Subtitle / Short Description
                  </Label>
                  <Textarea
                    id="subtitle"
                    placeholder="Enter short description"
                    value={form.subtitle}
                    onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                    className="border-border/50 focus:border-primary resize-none"
                    rows={2}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg"
                >
                  {editingId ? (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Update Product
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Product
                    </>
                  )}
                </Button>
                {editingId && (
                  <Button type="button" variant="outline" onClick={handleCancelEdit}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card className="border-0 shadow-xl bg-gradient-to-br from-card to-card/95">
          <CardHeader className="border-b border-border/50">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                Products List
                <Badge variant="secondary" className="ml-2">
                  {filteredProducts.length} products
                </Badge>
              </CardTitle>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full sm:w-64 border-border/50"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground whitespace-nowrap">Show:</span>
                  <Input
                    type="number"
                    min={1}
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 border-border/50"
                  />
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30 hover:bg-muted/30">
                    <TableHead className="font-semibold border-2">
                      <div className="flex items-center gap-2"><Hash className="h-4 w-4" /> Product ID</div>
                    </TableHead>
                    <TableHead className="font-semibold border-2">
                      <div className="flex items-center gap-2"><ImageIcon className="h-4 w-4" /> Image</div>
                    </TableHead>
                    <TableHead className="font-semibold border-2">
                      <div className="flex items-center gap-2"><Tag className="h-4 w-4" /> Title</div>
                    </TableHead>
                    <TableHead className="font-semibold border-2">Slug</TableHead>
                    <TableHead className="font-semibold border-2">
                      <div className="flex items-center gap-2">
                        <span className="h-4 w-4 flex items-center justify-center">₹</span> Price
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold border-2">
                      <div className="flex items-center gap-2"><Package className="h-4 w-4" /> Category</div>
                    </TableHead>
                    <TableHead className="font-semibold border-2">Subtitle</TableHead>
                    <TableHead className="font-semibold text-right border-2">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {displayedProducts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="h-32 text-center border-2">
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                          <Package className="h-8 w-8" />
                          <p>No products found</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : displayedProducts.map((p, index) => (
                    <TableRow key={p.id} className="group hover:bg-muted/50 transition-colors">
                      <TableCell className="border-2"><Badge variant="outline" className="font-mono">{p.productId}</Badge></TableCell>
                      <TableCell className="border-2">
                        <div className="relative h-12 w-12 rounded-lg overflow-hidden border border-border/50 bg-muted/30">
                          {p.image ? <img src={p.image} alt={p.title} className="h-full w-full object-cover" /> :
                            <div className="h-full w-full flex items-center justify-center"><ImageIcon className="h-5 w-5 text-muted-foreground" /></div>}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium max-w-[150px] truncate border-2">{p.title}</TableCell>
                      <TableCell className="text-muted-foreground text-sm max-w-[100px] truncate border-2">{p.slug}</TableCell>
                      <TableCell className="border-2"><Badge className="bg-green-500/10 text-green-600 border-green-500/20 ">Rs. {p.price}</Badge></TableCell>
                      <TableCell className="border-2"><Badge variant="secondary">{p.category}</Badge></TableCell>
                      <TableCell className="text-muted-foreground text-sm max-w-[150px] truncate border-2">{p.subtitle || "-"}</TableCell>
                      <TableCell className="border-2">
                        <div className="flex items-center justify-end gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEdit(p)} className="h-8 w-8 p-0 hover:bg-amber-500/10 hover:text-amber-600 hover:border-amber-500/50"><Pencil className="h-4 w-4" /></Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="outline" className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50"><Trash2 className="h-4 w-4" /></Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Product</AlertDialogTitle>
                                <AlertDialogDescription>Are you sure you want to delete "{p.title}"? This action cannot be undone.</AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(p.id)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                          <Button size="sm" variant="outline" onClick={() => handleAdditionalInfo(p.id)} className="h-8 px-3 hover:bg-primary/10 hover:text-primary hover:border-primary/50">
                            <Info className="h-4 w-4 mr-1" /> Info
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredProducts.length > 0 && (
              <div className="px-6 py-4 border-t border-border/50 bg-muted/20">
                <p className="text-sm text-muted-foreground">Showing {displayedProducts.length} of {filteredProducts.length} products</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdminProduct;
