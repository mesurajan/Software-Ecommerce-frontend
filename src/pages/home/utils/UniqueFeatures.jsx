// src/components/Home/UniqueFeatures.jsx
import React from 'react';
import BigSofa from "../../../assets/images/chairs/Bigsofa.png";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../Apps/Reducers/cartSlice"; 
import { useNavigate } from "react-router-dom";

function UniqueFeatures() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user); // ✅ get logged-in user

  const product = {
    id: 1,
    title: "B&B Italian Sofa",
    price: 32.00,
    chairimage: BigSofa,
  };

  const handleAddToCart = () => {
    if (!user) {
   alert("Please login to add products to your cart!");
      navigate("/login");
      return;
    }

    // ✅ add to cart if user is logged in
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      chairimage: product.chairimage,
    }));
  };;
  
  
  return (
    <div>
         {/* Unique Features  */}
     <section className="container bg-backgroundlite  mt-25 px-4">
      <div className=" flex flex-col md:flex-row items-center justify-center lg:flex-row  ">
        <div className="#">
          <img src={BigSofa} alt="bigsofa" className="#"/>
          
        </div>

        <div className="">
          <h1 className="text-2xl sm:text-3xl md:text-[35px] font-bold text-[#0A174E] max-w-full sm:max-w-sm md:max-w-[450px] text-center md:text-left">
            Unique Features of Latest &
            Trending Products
          </h1>

    <ul className="sm:py-6 md:py-8 lg:py-8 text-[14px] sm:text-[15px] text-[#0A174E] max-w-full sm:max-w-sm md:max-w-[450px] space-y-3 sm:space-y-4">    
        <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></span>
            All frames constructed with hardwood solids and laminates
        </li>
        <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-900 rounded-full flex-shrink-0"></span>
            Reinforced with double wood dowels, corner and machine nails
        </li>
        <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
            Arms, backs and seats are structurally reinforced
        </li>
        </ul>


          <div className="sm:mt-6 flex flex-row items-center justify-centre gap-10 py-[25px] ">
          {/* Button */}
          <div>
            <button
                onClick={handleAddToCart}
                className="primary-btn sm:py-10 md:py-4 md:px-12"
              >
                Add to Cart
            </button>
          </div>

          {/* Title & Price */}
          <div className="text-center sm:text-left ">
            <h1 className="font-semibold">B&B Italian Sofa</h1>
            <p className="text-gray-600">$32.00</p>
          </div>
        </div>

        </div>
      </div>
     </section>
    </div>
  )
}

export default UniqueFeatures