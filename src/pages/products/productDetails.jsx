// src/pages/ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AppBreadcrumbs from "../../components/Breadcrumbs";
import { addToCart } from "../../Apps/Reducers/cartSlice";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5174";

function ProductDetails() {
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${BACKEND_URL}/api/products/${id}/${slug || ""}`
        );

        // Normalize product data
        const normalizedProduct = {
          ...data,
          image: data?.image
            ? data.image.startsWith("http")
              ? data.image
              : `${BACKEND_URL}${data.image}`
            : "",
          videoUrl: data.videoUrl || data.video || "",
          colors: Array.isArray(data.colors)
            ? data.colors.join(", ")
            : data.colors || "",
          stock: data.stock ?? 0,
          discount: data.discount ?? 0,
          brand: data.brand || "",
          sku: data.sku || "",
          weight: data.weight || "",
          length: data.length || "",
          width: data.width || "",
          height: data.height || "",
          material: data.material || "",
          warranty: data.warranty || "",
          delivery: data.delivery || "",
          subtitle: data.subtitle || "",
          additionalInfo: data.additionalInfo || "",
          reviews: data.reviews || [],
          category: data.category || null,
          createdBy: data.createdBy || null,
          createdAt: data.createdAt || null,
          updatedAt: data.updatedAt || null,
        };

        setProduct(normalizedProduct);

        // ✅ Handle redirect if slug mismatch
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

  const isAvailable = product.stock && product.stock > 0;

  const discountedPrice = product.discount
    ? (product.price - (product.price * product.discount) / 100).toFixed(2)
    : null;

  return (
    <div className="bg-white container">
      {/* Header */}
      <div className="bg-backgroundlite py-4">
        <h1 className="text-3xl font-bold px-4 text-mainbackground">
          Product Details
        </h1>
        <AppBreadcrumbs />
      </div>

      {/* Product Section */}
      <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-6 px-4 py-8 mt-6">
        {/* Images */}
        <div className="flex gap-4 hover:scale-110 transition-transform duration-300 ease-in-out">
          <div className="flex flex-col gap-2 ">
            {[...Array(3)].map((_, i) => (
              <img
                key={i}
                src={product.image}
                alt={product.title}
                className="p-1 border w-20 h-22 object-cover md:w-[120px] md:h-[145px]"
              />
            ))}
          </div>
          <div className="relative">
            <img
              src={product.image}
              alt={product.title}
              className="w-[250px] h-[280px] rounded shadow object-cover md:w-[350px] md:h-[450px]"
            />
            {product.discount ? (
              <span className="absolute top-6 right-2 bg-red-600 text-white text-sm font-bold px-2 py-1 rounded">
                -{product.discount}% OFF
              </span>
            ) : null}
          </div>
        </div>

        {/* Info */}
        <div>
          <h2 className=" text-2xl md:text-3xl font-bold px-5">{product.title}</h2>

         
          {/* Ratings */}
          <div className="flex items-center gap-2 mt-2 text-yellow-500 px-5">
            ⭐⭐⭐⭐☆{" "}
            <span className="text-sm text-gray-500">
              ({product.reviews?.length || 0} reviews)
            </span>
          </div>

          {/* Availability */}
          <div className="mt-2 px-5">
            {isAvailable ? (
              <span className="inline-block px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                ✅ Available ({product.stock} in stock)
              </span>
            ) : (
              <span className="inline-block px-3 py-1 text-sm font-medium text-red-700 bg-red-100 rounded-full">
                ❌ Sold Out
              </span>
            )}
          </div>

          {/* Price */}
          <div className="mt-4 px-5">
            {discountedPrice ? (
              <div>
                <span className=" md:text-lg text-gray-500 line-through">
                  Rs.{product.price}
                </span>
                <span className="ml-2 text-2xl font-bold text-blue-900">
                  Rs.{discountedPrice}
                </span>
                <span className="ml-2 text-green-600 font-medium">
                  ({product.discount}% OFF)
                </span>
              </div>
            ) : (
              <span className="text-2xl font-bold text-blue-900">
                Rs.{product.price}
              </span>
            )}

             <p className="mt-1 text-gray-600 text-justify">
            {product.subtitle || "No short description available."}
          </p>

          </div>

          {/* Extra info */}
          <ul className="mt-4 text-sm text-gray-700 space-y-1 px-5">
            <li>
              <b>Brand:</b> {product.brand || "N/A"}
            </li>
            <li>
              <b>Colors:</b> {product.colors || "N/A"}
            </li>
            <li>
              <b>Material:</b> {product.material || "N/A"}
            </li>
            <li>
              <b>Warranty:</b> {product.warranty || "N/A"}
            </li>
           
            <li>
              <b>Video:</b>{" "}
              {product.videoUrl ? (
                <a
                  href={product.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  Watch
                </a>
              ) : (
                "N/A"
              )}
            </li>
          </ul>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6 px-5">
            <button
              onClick={handleAddToCart}
              className="px-6 py-3 text-white shadow-md primary-btn hover:bg-primary rounded-[6px]"
            >
              Add to Cart
            </button>
            <button onClick={handleBuyNow} className="buynow-btn">
              Buy Now
            </button>
          </div>

          {/* Category & Share */}
          <div className="mt-6 text-sm text-gray-600 px-5">
            {/* <p>
              Category:{" "}
              <span className="font-medium">
                {product.category?.name || "Uncategorized"}
              </span>
            </p>
            <p>
              Created By: {product.createdBy?.name || "Admin"}
            </p>
            <p>
              Last Updated:{" "}
              {product.updatedAt
                ? new Date(product.updatedAt).toLocaleDateString()
                : "N/A"}
            </p> */}
            <p>
              Share:{" "}
              <span className="text-blue-600 cursor-pointer">Facebook</span>,{" "}
              <span className="text-blue-400 cursor-pointer">Twitter</span>
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container py-12 px-5 md:px-15">
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
        <div className="mt-6 leading-relaxed text-gray-600 ">
          {activeTab === "description" && (
            <div
              className="prose max-w-none mt-1 text-gray-600 text-justify" 
              dangerouslySetInnerHTML={{
                __html:
                  product.description ||
                  "<p>No detailed description available.</p>",
              }}
            />
          )}

          {activeTab === "additional" && (
            <div className="mt-4 space-y-6 text-gray-600 text-justify">
              {/* Structured details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <p>
                    <strong>Brand:</strong> {product.brand || "N/A"}
                  </p>
                  <p>
                    <strong>SKU:</strong> {product.sku || "N/A"}
                  </p>
                  <p>
                    <strong>Weight:</strong>{" "}
                    {product.weight ? `${product.weight} kg` : "N/A"}
                  </p>
                  <p>
                    <strong>Dimensions:</strong>{" "}
                    {product.length && product.width && product.height
                      ? `${product.length} x ${product.width} x ${product.height} cm`
                      : "N/A"}
                  </p>
                </div>

                <div>
                  <p>
                    <strong>Material:</strong> {product.material || "N/A"}
                  </p>
                  <p>
                    <strong>Warranty:</strong> {product.warranty || "N/A"}
                  </p>
                  <p>
                    <strong>Delivery:</strong> {product.delivery || "N/A"}
                  </p>
                  <p>
                    <strong>Colors:</strong> {product.colors || "N/A"}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <h3 className="text-lg font-semibold mb-2">Brief details</h3>
                {product.additionalInfo ? (
                  <div
                    className="prose max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{ __html: product.additionalInfo }}
                  />
                ) : (
                  <p className="text-sm text-gray-600">
                    No additional information provided.
                  </p>
                )}
              </div>
            </div>
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
    </div>
  );
}

export default ProductDetails;
