import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Building, Calendar, Edit2, Save, X, Camera } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import AppBreadcrumbs from './Breadcrumbs';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    role: '',
  });
  const [editData, setEditData] = useState(profileData);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');

  const token = JSON.parse(localStorage.getItem('user') || '{}')?.token;

  // Fetch profile from backend
  useEffect(() => {
  const fetchProfile = async () => {
    if (!token) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/profile/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      const mappedData = {
        fullName: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        role: data.role,
      };

      setProfileData(mappedData);
      setEditData(mappedData);
    } catch (err) {
      alert(err.message || "Failed to load profile");
    }
  };

  fetchProfile();
}, [token]);


  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => { setIsEditing(false); setEditData(profileData); setPhotoFile(null); };

  const handleInputChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  const handleSave = () => {
    // Since backend does not support update, just mock frontend update
    setProfileData(editData);
    setIsEditing(false);
    setPhotoFile(null);
    alert('Profile updated locally (backend update not supported)');
  };

  if (!profileData) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className=" container min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
  

      {/* Breadcrumb Section */}
      <div className="bg-backgroundlite py-4 pt-20">
        <h1 className="text-xl md:text-3xl font-bold px-4 text-white">User Profile</h1>
        <AppBreadcrumbs />
      </div>

      {/* Profile Header */}
      <div className=" bg-white z-40 shadow-md border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Separator orientation="vertical" className="h-6" />
            <h1 className="text-2xl font-bold text-gray-900">Manage Your Profile</h1>
          </div>
          {!isEditing ? (
            <Button onClick={handleEdit} className="flex items-center space-x-2">
              <Edit2 className="h-4 w-4" /><span>Edit Profile</span>
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button onClick={handleSave} className="flex items-center space-x-2">
                <Save className="h-4 w-4" /><span>Save</span>
              </Button>
              <Button variant="outline" onClick={handleCancel} className="flex items-center space-x-2">
                <X className="h-4 w-4" /><span>Cancel</span>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Profile Content */}
      <div className="container mx-auto px-4 py-8 pt-24 grid md:grid-cols-3 gap-8">
        {/* Profile Overview */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="text-2xl">{profileData.fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-xl">{profileData.fullName}</CardTitle>
              <Badge variant="secondary" className="mt-2">{profileData.role}</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3"><Mail className="h-4 w-4 text-gray-500" /><span className="text-sm">{profileData.email || 'Not set'}</span></div>
              <div className="flex items-center space-x-3"><Phone className="h-4 w-4 text-gray-500" /><span className="text-sm">{profileData.phone || 'Not set'}</span></div>
              <div className="flex items-center space-x-3"><Building className="h-4 w-4 text-gray-500" /><span className="text-sm">{profileData.address || 'Not set'}</span></div>
              <div className="flex items-center space-x-3"><Calendar className="h-4 w-4 text-gray-500" /><span className="text-sm">Role: {profileData.role}</span></div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" /><span>Personal Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              {['fullName', 'email', 'phone', 'address'].map(field => (
                <div key={field} className="space-y-2">
                  <Label>{field === 'fullName' ? 'Full Name' : field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                  {isEditing ? (
                    <Input value={editData[field]} onChange={(e) => handleInputChange(field, e.target.value)} />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded">{profileData[field] || 'Not set'}</p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

     
    </div>
  );
};

export default Profile;
