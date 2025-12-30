import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Plus,
  Pencil,
  Trash2,
  ImagePlus,
  Link2,
  Percent,
  Type,
  FileText,
  Upload,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/layout/Header";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5174";

function AdminBanner1() {
  const [banners, setBanners] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subtitle: "",
    productLink: "",
    discountPercentage: 0,
  });
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const token = localStorage.getItem("token");

  /* ======================
     FETCH BANNERS
  ====================== */
  const fetchBanners = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/banner`);
      setBanners(res.data);
    } catch (err) {
      console.error("Fetch banners error:", err);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  /* ======================
     HELPERS
  ====================== */
  const getImageUrl = (path) => {
    if (!path) return `${BACKEND_URL}/uploads/Default/lightimage.png`;
    return `${BACKEND_URL}${path}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setImageFile(e.target.files[0]);
    }
  };

  /* ======================
     CREATE / UPDATE
  ====================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return alert("You must be logged in");

    const data = new FormData();
    Object.keys(formData).forEach((key) =>
      data.append(key, formData[key])
    );
    if (imageFile) data.append("image", imageFile);

    try {
      if (editingId) {
        await axios.put(`${BACKEND_URL}/api/banner/${editingId}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await axios.post(`${BACKEND_URL}/api/banner`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      setFormData({
        title: "",
        description: "",
        subtitle: "",
        productLink: "",
        discountPercentage: 0,
      });
      setImageFile(null);
      setEditingId(null);
      fetchBanners();
    } catch (err) {
      console.error("Submit banner error:", err);
      alert("Something went wrong");
    }
  };

  /* ======================
     EDIT
  ====================== */
  const handleEdit = (banner) => {
    setEditingId(banner._id);
    setFormData({
      title: banner.title,
      description: banner.description,
      subtitle: banner.subtitle || "",
      productLink: banner.productLink || "",
      discountPercentage: banner.discountPercentage || 0,
    });
    setImageFile(null);
  };

  /* ======================
     DELETE
  ====================== */
  const handleDelete = async (id) => {
    if (!token) return alert("You must be logged in");
    if (!confirm("Delete this banner?")) return;

    try {
      await axios.delete(`${BACKEND_URL}/api/banner/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBanners();
    } catch (err) {
      console.error("Delete banner error:", err);
      alert("Failed to delete banner");
    }
  };

  const displayedBanners = banners.slice(0, itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-0">
     

      <div className="container mx-auto px-4 ">
        {/* PAGE HEADER */}
      <div className="bg-[#1e293b] text-white px-10 py-8">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="p-2 bg-gradient-to-br from-primary to-accent rounded-xl">
            <ImagePlus className="h-6 w-6 text-primary-foreground" />
          </div>

          {/* Text */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-white">
              Banner Management
            </h1>
            <p className="text-white/80 mt-1">
              Create and manage promotional banners
            </p>
          </div>
        </div>
      </div>
        {/* FORM */}
        <Card className="mb-10">
          <CardHeader>
            <CardTitle>
              {editingId ? "Edit Banner" : "Create Banner"}
            </CardTitle>
            <CardDescription>
              Upload banner details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
                <Input name="subtitle" placeholder="Subtitle" value={formData.subtitle} onChange={handleChange} />
                <Input name="productLink" placeholder="Product Link" value={formData.productLink} onChange={handleChange} />
                <Input type="number" name="discountPercentage" placeholder="Discount %" value={formData.discountPercentage} onChange={handleChange} />
                <Textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
                <Input type="file" onChange={handleFileChange} />
              </div>

              <Button type="submit">
                {editingId ? "Update Banner" : "Create Banner"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* TABLE */}
        <Card>
          <CardHeader>
            <CardTitle>All Banners</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="
                    py-2 px-4 border-2" >Main</TableHead>
                  <TableHead className="
                    py-2 px-4 border-2">Title</TableHead>
                  <TableHead className="
                    py-2 px-4 border-2">Description</TableHead>
                  <TableHead className="text-right border-2">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedBanners.map((banner) => (
                  <TableRow key={banner._id}>
                    <TableCell className="
                    py-2 px-4 border-2
                    w-[85px] sm:w-[85px] md:w-[85px] lg:w-[85px]
                    whitespace-normal
                    break-words
                  ">
                      <img src={getImageUrl(banner.image)} className="w-16 h-16 object-cover" />
                    </TableCell>
                    <TableCell className="py-2 px-4 border-2
                    w-[80px] sm:w-[120px] md:w-[200px] lg:w-[200px]
                    whitespace-normal
                    break-words">{banner.title}</TableCell>
                <TableCell
                  className="
                    py-2 px-4 border-2
                    w-[280px] sm:w-[390px] md:w-[520px] lg:w-[560px]
                    whitespace-normal
                    break-words
                  "
                >
                  {banner.description}
                </TableCell>


                    <TableCell className="text-right space-x-2  py-2 px-4 border-2
                    w-[120px] sm:w-[120px] md:w-[120px] lg:w-[120px]
                    whitespace-normal
                    ">
                      <Button size="sm" onClick={() => handleEdit(banner)}>
                        <Pencil size={14} />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(banner._id)}>
                        <Trash2 size={14} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdminBanner1;
