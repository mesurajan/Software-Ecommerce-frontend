import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

function BuyNow() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  // ✅ NORMALIZE IMAGE ONCE (DO NOT OVERWRITE)
  const productForCheckout = product
    ? {
        ...product,
        chairimage:
          product.chairimage || // wishlist / cart / home
          product.image || // product details
          product.images?.[0] || // safety
          "",
      }
    : null;

  const [quantity, setQuantity] = useState(1);

  if (!productForCheckout) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold">No product selected!</h2>
        <button
          onClick={() => navigate("/product")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Back to Products
        </button>
      </div>
    );
  }

  const subtotal = Number(productForCheckout.price) * quantity;
  const deliveryFee = 140;
  const total = subtotal + deliveryFee;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow space-y-6">
      {/* Product Summary */}
      <div className="border p-4 rounded">
        <h3 className="text-lg font-bold mb-2">Order Summary</h3>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <img
            src={
              productForCheckout.chairimage
                ? productForCheckout.chairimage.startsWith("http")
                  ? productForCheckout.chairimage
                  : `${import.meta.env.VITE_BACKEND_URL}/uploads/product/${productForCheckout.chairimage}`
                : "/placeholder.png"
            }
            alt={productForCheckout.title}
            className="w-24 h-24 object-contain border"
          />

          <div className="flex-1">
            <p className="font-semibold">{productForCheckout.title}</p>
            <p className="text-green-600 font-bold">
              Rs. {productForCheckout.price}
            </p>

            {/* Quantity selector */}
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-2 py-1 border rounded"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-2 py-1 border rounded"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Fee & Total */}
      <div className="border p-4 rounded">
        <div className="flex justify-between">
          <span>Items Total:</span>
          <span>Rs. {subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Fee:</span>
          <span>Rs. {deliveryFee}</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-2">
          <span>Total:</span>
          <span>Rs. {total}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <Link
        to="/paymentprocessing"
        state={{
          product: { ...productForCheckout, quantity },
        }}
      >
        <button className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Proceed To Checkout
        </button>
      </Link>
    </div>
  );
}

export default BuyNow;
