import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AppBreadcrumbs from "../../components/Breadcrumbs";
import { latestProducts } from "../../assets/mockdata";
import { addToCart } from "../../Apps/Reducers/cartSlice";
import { Products } from "../../assets/productmockdata";
import { TopCategory } from "../../assets/mockdata";

function ProductDetails() {
  const { id } = useParams();
  const productId = parseInt(id);
  const navigate = useNavigate();

  // Combine products from both sources
  const allLatest = latestProducts.flatMap((group) => group.chairs);
  const allTopCategories = TopCategory.flatMap((group) => group.chairs);
  const allProducts = [...allLatest, ...Products, ...allTopCategories];

  // ✅ Find the product by ID
  const product = allProducts.find((item) => item.id === productId);

  const dispatch = useDispatch();

  if (!product) {
    return (
      <div className="container py-10">
        <h1>Product not found</h1>
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
        id: product.id,
        title: product.title,
        price: product.price,
        // ✅ fix image issue: use chairimage OR image
        chairimage: product.chairimage || product.image,
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

    // First add to cart
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        chairimage: product.chairimage || product.image,
      })
    );

    // Then redirect to cart/checkout page
    navigate("/cart");
  };

  return (
    <div className="bg-white">
      {/* Header with Breadcrumbs */}
      <div className="container bg-backgroundlite">
        <h1 className="font-bold text-[40px] py-6 px-4">Product Details</h1>
        <AppBreadcrumbs />
      </div>

      {/* Main Product Section */}
      <div className="container grid gap-2 px-4 py-12 mt-10 md:grid-cols-2 md:px-15">
        {/* Left Side - Images */}
        <div className="flex gap-2">
          <div className="flex flex-col gap-2">
            <img
              src={product.chairimage || product.image}
              alt={product.title}
              className="p-1 border max-w-25 max-h-30"
            />
            <img
              src={product.chairimage || product.image}
              alt={product.title}
              className="p-1 border max-w-25 max-h-30"
            />
            <img
              src={product.chairimage || product.image}
              alt={product.title}
              className="p-1 border max-w-25 max-h-30"
            />
          </div>
          <img
            src={product.chairimage || product.image}
            alt={product.title}
            className="max-w-[300px] max-h-[380px] rounded shadow"
          />
        </div>

        {/* Right Side - Info */}
        <div>
          <h2 className="text-3xl font-bold">{product.title}</h2>

          {/* Ratings */}
          <div className="flex items-center gap-2 mt-2 text-yellow-500">
            ⭐⭐⭐⭐☆ <span className="text-sm text-gray-500">(120 reviews)</span>
          </div>

          {/* Price */}
          <div className="mt-4">
            <span className="text-2xl font-bold text-blue-900">
              ${product.price}
            </span>
            <span className="ml-3 text-gray-400 line-through">$500</span>
          </div>

          {/* Short description */}
          <p className="mt-4 text-gray-600 text-justify">
            {product.description ||
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
          </p>

          {/* Colors */}
          <div className="mt-4">
            <span className="font-medium">Color:</span>
            <div className="flex gap-2 mt-2">
              <div className="w-3 h-3 bg-red-500 rounded-full cursor-pointer"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full cursor-pointer"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full cursor-pointer"></div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleAddToCart}
              className="px-6 py-3 text-white shadow-md primary-btn hover:bg-primary"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="px-6 py-3 text-white bg-green-600 rounded shadow-md hover:bg-green-700"
            >
              Buy Now
            </button>
          </div>

          {/* Categories & Share */}
          <div className="mt-6 text-sm text-gray-600">
            <p>
              Category:{" "}
              <span className="font-medium">
                {product.category || "Furniture"}
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
          <button className="pb-2 font-medium border-b-2 border-pink-500">
            Description
          </button>
          <button className="pb-2 text-gray-500 hover:text-black">
            Additional Info
          </button>
          <button className="pb-2 text-gray-500 hover:text-black">Reviews</button>
          <button className="pb-2 text-gray-500 hover:text-black">Video</button>
        </div>
        <div className="mt-6 leading-relaxed text-gray-600">
          <p>
            Various versions have evolved over the years, sometimes by accident,
            sometimes on purpose. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.
          </p>
        </div>
      </div>

      <div className="container">Related items</div>
    </div>
  );
}

export default ProductDetails;
