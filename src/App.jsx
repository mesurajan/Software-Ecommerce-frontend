// src/App.jsx
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/home/Home";
import LoginForm from './pages/auth/login';
import SignupForm from './pages/auth/signup';
import Product from './pages/products/product';
import ProductDetails from './pages/products/productDetails';
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import Blogs from "./pages/Blogs";
import Cart from './pages/products/Cart'; 
import ProtectedRoute from './hoc/ProtectedRoutes'; 
import WhishList from './pages/products/WhishList';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductManagement from "./pages/admin/ProductManagement";
import PaymentProcessing from "./components/paymentprocessing";
import BuyNow from "./components/BuyNow";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminLayout from "./layout/AdminLayout";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminSellers from "./pages/admin/AdminSellers";
import AdminBanners from "./pages/admin/AdminBanner1";

// ScrollToTop Component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

function App() {
  return (
    <>
      <ScrollToTop /> {/* Ensures every route scrolls to top */}
      <Routes>
        {/* routes for general layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home/>} />
          <Route path="product" element={<Product/>}/>
          <Route path="productDetails/:id" element={<ProductDetails/>}/>
          <Route path="contact" element={<Contact/>}/>
          <Route path="blogs" element={<Blogs/>}/>
          <Route path="about" element={<AboutUs/>}/>
          
          {/* Protected routes */}
          <Route path="cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="wishlist" element={<ProtectedRoute><WhishList /></ProtectedRoute>} />
          <Route path="paymentprocessing" element={<ProtectedRoute><PaymentProcessing /></ProtectedRoute>} />
          <Route path="/Buynow"  element={<ProtectedRoute><BuyNow /></ProtectedRoute>} />
        </Route>

        {/* routes for login and signup */}
        <Route path="login" element={<LoginForm />} />
        <Route path="signup" element={<SignupForm />} />

        {/* Admin routes (protected with layout) */}
        <Route 
          path="/admin"  
          element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}
        >
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />
          <Route path="customers" element={<ProtectedRoute><AdminCustomers /></ProtectedRoute>} />
          <Route path="sellers" element={<ProtectedRoute><AdminSellers /></ProtectedRoute>} />
          <Route path="/admin/banners" element={<AdminBanners />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
