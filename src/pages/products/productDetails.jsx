// src/pages/ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AppBreadcrumbs from "../../components/Breadcrumbs";
import { addToCart } from "../../Apps/Reducers/cartSlice";
import axios from "axios";

const BACKEND_URL = "http://localhost:5174"; // ✅ Centralized base URL

function ProductDetails() {
  const { id, slug } = useParams(); // Route: /productdetails/:id/:slug
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("description");

  // ✅ Fetch product from backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${BACKEND_URL}/api/products/${id}`);

        // Normalize image path
        const normalizedProduct = {
          ...data,
          image: data.image?.startsWith("http")
            ? data.image
            : `${BACKEND_URL}${data.image}`,
        };

        setProduct(normalizedProduct);

        // ✅ Redirect to correct slug if mismatch
        if (normalizedProduct.slug && normalizedProduct.slug !== slug) {
          navigate(
            `/productdetails/${normalizedProduct._id}/${normalizedProduct.slug}`,
            { replace: true }
          );
        }
      } catch (err) {
        setError("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id, slug, navigate]);

  if (loading) {
    return (
      <div className="container py-10">
        <p>Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container py-10">
        <h1>{error || "Product not found"}</h1>
      </div>
    );
  }

  // ✅ Add to cart handler
  const handleAddToCart = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to add products to your cart!");
      navigate("/login");
      return;
    }

    dispatch(
      addToCart({
        id: product._id,
        title: product.title,
        price: product.price,
        chairimage: product.image,
      })
    );
    alert("Product added to cart!");
  };

  // ✅ Buy now handler
  const handleBuyNow = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to proceed with purchase!");
      navigate("/login");
      return;
    }

    dispatch(
      addToCart({
        id: product._id,
        title: product.title,
        price: product.price,
        chairimage: product.image,
      })
    );

    navigate("/Buynow", { state: { product } });
  };

  // ✅ Availability: If stock > 0 → Available
  const isAvailable = product.stock && product.stock > 0;

  return (
    <div className="bg-white container">
      {/* Header with Breadcrumbs */}
      <div className="bg-backgroundlite py-4">
        <h1 className="text-3xl font-bold px-4 text-mainbackground">
          Product Details
        </h1>
        <AppBreadcrumbs />
      </div>

      {/* Main Product Section */}
      <div className="container grid gap-6 px-4 py-12 mt-10 md:grid-cols-2 md:px-15">
        {/* Left Side - Images */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-2">
            {[...Array(3)].map((_, i) => (
              <img
                key={i}
                src={product.image}
                alt={product.title}
                className="p-1 border w-20 h-20 object-cover"
              />
            ))}
          </div>
          <img
            src={product.image}
            alt={product.title}
            className="max-w-[320px] max-h-[400px] rounded shadow object-cover"
          />
        </div>

        {/* Right Side - Info */}
        <div>
          <h2 className="text-3xl font-bold">{product.title}</h2>

          {/* Ratings */}
          <div className="flex items-center gap-2 mt-2 text-yellow-500">
            ⭐⭐⭐⭐☆{" "}
            <span className="text-sm text-gray-500">
              ({product.reviews?.length || 0} reviews)
            </span>
          </div>

          {/* Availability Badge */}
          <div className="mt-2">
            {isAvailable ? (
              <span className="inline-block px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                ✅ Available
              </span>
            ) : (
              <span className="inline-block px-3 py-1 text-sm font-medium text-red-700 bg-red-100 rounded-full">
                ❌ Sold Out
              </span>
            )}
          </div>

          {/* Price */}
          <div className="mt-4">
            <span className="text-2xl font-bold text-blue-900">
              Rs.{product.price}
            </span>
          </div>

          {/* Short description */}
          <p className="mt-4 text-gray-600 text-justify">
            {product.description ||
              "Detailed description is not available for this product."}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleAddToCart}
              className="px-6 py-3 text-white shadow-md primary-btn hover:bg-primary"
            >
              Add to Cart
            </button>
            <button onClick={handleBuyNow} className="buynow-btn">
              Buy Now
            </button>
          </div>

          {/* Categories & Share */}
          <div className="mt-6 text-sm text-gray-600">
            <p>
              Category:{" "}
              <span className="font-medium">
                {product.category?.name || "Uncategorized"}
              </span>
            </p>
            <p>
              Share:{" "}
              <span className="text-blue-600 cursor-pointer">Facebook</span>,{" "}
              <span className="text-blue-400 cursor-pointer">Twitter</span>
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="container py-12">
        <div className="flex gap-6 border-b">
          {["description", "additional", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 font-medium ${
                activeTab === tab
                  ? "border-b-2 border-pink-500 text-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {tab === "description"
                ? "Description"
                : tab === "additional"
                ? "Additional Info"
                : "Reviews"}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-6 leading-relaxed text-gray-600">
          {activeTab === "description" && <p>{product.description}</p>}
          {activeTab === "additional" && (
            <ul className="list-disc pl-6 space-y-2">
              <li>Material: {product.material || "Premium Quality"}</li>
              <li>Dimensions: {product.dimensions || "Standard Size"}</li>
              <li>
                Warranty: {product.warranty || "1 Year Manufacturer Warranty"}
              </li>
              <li>Delivery: Free Home Delivery within 7 days</li>
            </ul>
          )}
          {activeTab === "reviews" && (
            <div>
              <p className="font-medium">Customer Reviews</p>
              {product.reviews?.length > 0 ? (
                product.reviews.map((rev, idx) => (
                  <p key={idx} className="text-gray-500 mt-2">
                    {rev.rating}★ – {rev.comment}
                  </p>
                ))
              ) : (
                <p className="text-gray-500 mt-2">
                  No reviews yet for this product.
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Related Items Section */}
      <div className="container py-10">
        <h2 className="text-xl font-bold mb-4">Related Items</h2>
        <p className="text-gray-500">Coming soon...</p>
      </div>
    </div>
  );
}

export default ProductDetails;
