import React from 'react'
import {TrendingProduct , showcaseProducts}  from "../../../assets/productmockdata"
import showcase01 from "../../../assets/images/Home/showcase01.png"
import showcase02 from "../../../assets/images/Home/showcase02.png"
import ProductCard from "../../../components/ProductCard";
import { Link } from "react-router-dom";


function TrendingProducts() {
  return (
    <div className='container'>
      <div>
        <header className='text-mainbackground text-[35px] font-semibold flex justify-center mt-10 mb-10'>
          <h1>Trending Products</h1>
        </header>
      </div>

      {/* section 01 chairs */}
      <div className="grid md:grid-cols-4 grid-cols-1 gap-8 md:gap-6 px-4 md:px-20 mb-10">
            {TrendingProduct.map((el, i) => (
            <ProductCard key={i} product={el} />
            ))}
        </div>


  {/*  Promo and Executive Products  */}
      <div className="flex md:flex-row flex-col justify-center gap-6 md:gap-4 px-4 ">

        <div className="bg-[#EBECFD] p-6 rounded-lg w-full lg:w-1/3 flex flex-col justify-between items-start">
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
                <p className="text-black">Rs.{product.price}</p>
            </div>
            </div>
        ))}
        </div>
      </div>
    </div>


  );
};


export default TrendingProducts