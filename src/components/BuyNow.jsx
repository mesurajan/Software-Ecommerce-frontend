import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function BuyNow() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  if (!product) {
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

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      {/* Shipping Address */}
      <div className="mb-6 border p-4 rounded">
        <h3 className="text-lg font-bold mb-2">Shipping Address</h3>
        <p>Surajan Shrestha</p>
        <p>9816413787</p>
        <p>Saljhanda, Lumbini Province</p>
        <p className="text-sm text-orange-600 mt-2">
          ⚠️ This address may be incorrect. Please check it to avoid failed delivery.
        </p>
      </div>

      {/* Product Summary */}
      <div className="mb-6 border p-4 rounded">
        <h3 className="text-lg font-bold mb-2">Order Summary</h3>
        <div className="flex items-center gap-4">
          <img 
            src={product.chairimage} 
            alt={product.title} 
            className="w-24 h-24 object-contain border"
          />
          <div>
            <p className="font-semibold">{product.title}</p>
            <p className="text-green-600 font-bold">Rs. {product.price}</p>
            <p>Qty: 1</p>
          </div>
        </div>
      </div>

      {/* Delivery Fee & Total */}
      <div className="mb-6 border p-4 rounded">
        <div className="flex justify-between">
          <span>Items Total:</span>
          <span>Rs. {product.price}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Fee:</span>
          <span>Rs. 140</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-2">
          <span>Total:</span>
          <span>Rs. {parseInt(product.price) + 140}</span>
        </div>
      </div>

      {/* Checkout Button */}
      
        <Link to ={"/paymentprocessing"}>
              <button className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600">
                Proceed To Checkout
              </button>
              </Link>
    </div>
  );
}

export default BuyNow;
