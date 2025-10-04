import React from "react";
import SimpleSlider from "./Sliders/Slider1";
import SimpleSlider2 from "./Sliders/Slider2";
import TopCategories from "./Sliders/TopCategories";
import LatestProduct from "./Sliders/LatestProduct";
import DiscountItem from "./Sliders/DisItem";
import LatestBlog from "./Sliders/LatestBlog";
import { BannerData, BannerData2,TopCategory,latestProducts  } from "../../assets/mockdata"; 

import WhatshopOffers from "./utils/WhatshopOffers";
import UniqueFeatures from "./utils/UniqueFeatures";
import  TrendingProducts from "./utils/TrendingProducts";


import BgImage from "../../assets/images/Home/newsLetter.png"; 
import BrandPromotion from "../../assets/images/Home/BrandPromotion.png";
import {Link} from 'react-router-dom'


function Home() {
  return (
   <div className="bg-white">


    {/* Main slider */}
     <section className="sliderone ">
        <SimpleSlider BannerData={BannerData} />
      </section>


    {/* 2nd slider */}
       <section className="sliderone mt-10 md:mt-[40px] lg:mt-[40px]">
        <SimpleSlider2 BannerData={BannerData2} />
      </section>


       {/* Latest Products component */}
      <section className="mt-18">
        <LatestProduct BannerData={latestProducts} />
      </section>

     {/* What shop Offers */}
        <section className="mt-18">
        <WhatshopOffers />
       </section>

      {/* Unique Features  */}
        <section className="mt-18">
        <UniqueFeatures />
       </section>

       <section className="mt-18">
        <TrendingProducts/>
       </section>


        <section className=" sliderone mt-10 md:mt-[40px] lg:mt-[40px]">
        <DiscountItem/>
      </section>


      {/* Top categories */}
       <section className=" sliderone mt-10 md:mt-[40px] lg:mt-[40px]">
        <TopCategories BannerData={TopCategory} />
      </section>

      {/* Background PNG section */}
      <section
        className=" container mt-20 bg-no-repeat bg-center bg-cover h-[350px] sm:h-[400px] md:h-[400px] "
        style={{ backgroundImage: `url(${BgImage})` }}>
      <div className="flex flex-row flex-wrap items-center justify-center h-full md:flex-col ">
        <div className="#">
          <h2 className=" text-[#0A174E] text-center text-2xl sm:text-2xl md:text-4xl font-bold sm:mx-auto md:max-w-[650px] mt-12">
            Discover Your Sapce For Creativity 
          </h2>
          <h3 className=" text-[#0A174E] text-center text-[18px]  font-semibold sm:mx-auto md:max-w-[650px] md:mt-4 mt-2 ">
            Find Unique Ideas & Daily Inspiration
          </h3>
        </div>

         <div className="py-2 md:py-10">
          <Link to="/product"> 
              <button className="px-10 primary-btn rounded-[6px] py-4">Explore Now</button>
          </Link>
        </div>
      </div>
      </section>


      {/*  Brand promotion */}
      <section>
        <div className="container flex items-center justify-center mt-10">
          <img src={BrandPromotion} alt="brandpromotion" className="sm:h-10 md:h-20 sm:px-4 md:px-10"/>
        </div>
      </section>


      {/* Latest Blog */}
      <section>
          <LatestBlog/>
      </section>
      



   </div>
  );
}

export default Home;
