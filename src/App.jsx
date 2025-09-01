// src/App.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
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
function App() {
  return (
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
        <Route path="/Buynow"  element={  <ProtectedRoute>  <BuyNow /></ProtectedRoute>
  } 
/>
      </Route>

      {/* routes for login and signup */}
      <Route path="login" element={<LoginForm />} />
      <Route path="signup" element={<SignupForm />} />

      {/* Admin routes (protected) */}
      <Route 
        path="/admin"  
        element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} 
      />
      <Route 
        path="/admin/products"  
        element={<ProtectedRoute><ProductManagement /></ProtectedRoute>} 
      />
    </Routes>
  );
}

export default App;
