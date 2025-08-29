import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, PlusCircle } from "lucide-react";

const API_URL = "http://localhost:5174/api/products";

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_URL);
      setProducts(res.data); // must be array
    } catch (err) {
      console.error("❌ Error fetching products:", err);
      setProducts([]); // fallback
    }
  };

  // Add new product
  const addProduct = async () => {
    try {
      await axios.post(API_URL, newProduct);
      setNewProduct({ name: "", price: "", image: "", description: "" });
      fetchProducts();
    } catch (err) {
      console.error("❌ Error adding product:", err);
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("❌ Error deleting product:", err);
    }
  };

  // Load products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Product Management</h1>

      {/* Add Product Form */}
      <div className="mb-6 p-4 border rounded-lg shadow-sm">
        <h2 className="font-semibold mb-3 flex items-center gap-2">
          <PlusCircle size={20} /> Add New Product
        </h2>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
            className="border p-2 rounded"
          />
          <textarea
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            className="border p-2 rounded"
          />
          <button
            onClick={addProduct}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Add Product
          </button>
        </div>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg p-4 shadow-sm flex flex-col"
            >
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-40 object-cover rounded mb-3"
                />
              )}
              <h3 className="font-bold text-lg">{product.name}</h3>
              <p className="text-gray-600">Price: ${product.price}</p>
              <p className="text-sm text-gray-500 mb-2">
                {product.description}
              </p>
              <button
                onClick={() => deleteProduct(product._id)}
                className="bg-red-600 text-white py-1 px-3 rounded flex items-center gap-2 hover:bg-red-700 mt-auto"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductManagement;
