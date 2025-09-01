import React from 'react'
import {TrendingProduct , showcaseProducts}  from "../../../assets/productmockdata"
import showcase01 from "../../../assets/images/Home/showcase01.png"
import showcase02 from "../../../assets/images/Home/showcase02.png"
import ProductCard from "../../../components/ProductCard";
import { Link } from "react-router-dom";


function TrendingProducts() {
  return (
    // starting of this code
<div className='container'>
<div className="bg-gray-50  px-4  container">
      {/* Trending Products */}
      <h1 className="text-primary text-[42px] font-[700] text-center mt-10">Trending Product</h1>
        <section className="flex justify-center mt-10">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 max-w-6xl w-full">
            {TrendingProduct.map((el, i) => (
            <ProductCard key={i} product={el} />
            ))}
        </div>
        </section>



      {/*  Promo and Executive Products  */}
      <div className="flex flex-col lg:flex-row justify-between gap-4 py-10">

        <div className="bg-[#FFEFF4] p-6 rounded-lg w-full lg:w-1/3 flex flex-col justify-between items-start">
          <h2 className="text-[24px] font-bold text-[#03045E]">23% off in all products</h2>
          <Link to ="/product" className="text-pink-600 mt-2 font-semibold">Shop Now
          </Link>
        <img src={showcase01} alt="clock" className="mt-6 w-[213px] h-[207px] object-contain " />
        </div>


        <div className="bg-[#EBECFD] p-6 rounded-lg w-full lg:w-1/3 flex flex-col justify-between items-start">
          <h2 className="text-[24px] font-bold text-[#03045E]">23% off in all products</h2>
         <Link  to="/product"  className="text-pink-600 font-semibold"> View Collection</Link>

          <img src={showcase02} alt="furniture" className="mt-6" />
        </div>

                {/*  Product List  */}
        <div className="w-full md:w-[350px]  flex flex-col gap-4">
        {showcaseProducts.map((product) => (
            <div
            key={product.id}
            className="flex items-center gap-4 p-4 bg-white rounded-md shadow-sm hover:bg-gray-100 transition-all duration-300 cursor-pointer"
            >
            <img
                src={product.chairimage}   
                alt={product.title}        
                className="w-[60px] h-[70px] object-contain"
            />
            <div>
                <p className="text-[#03045E] font-semibold">{product.title}</p>
                <p className="text-black">{product.price}</p>
            </div>
            </div>
        ))}
        </div>

         
      </div>
    </div>
     </div>
  );
};


export default TrendingProducts