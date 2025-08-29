import AppBreadcrumbs from '@/components/Breadcrumbs';
import React from 'react'
import WhatshopOffers from "./home/utils/WhatshopOffers";
import { Link } from 'react-router-dom';
import AboutImage from "../assets/images/about/about.png";
import workspace02 from '../assets/images/blogs/workspace02.png';
import post01 from '../assets/images/blogs/post01.png';
import post02 from '../assets/images/blogs/post02.png';
import post03 from '../assets/images/blogs/post03.png';
import post04 from '../assets/images/blogs/post04.png';
import Vector from '../assets/images/Home/Vector.png';
import Vector2 from '../assets/images/Home/vector2.png';
import image01 from '../assets/images/about/image01.png';
import image02 from '../assets/images/about/image02.png';
import image03 from '../assets/images/about/image03.png';
import image04 from '../assets/images/about/image04.png';
import BrandPromotion from "../assets/images/Home/BrandPromotion.png";

function AboutUs() {
  return (
    <div className='container'>
      {/* Starting OF page  */}

      <div className='bg-backgroundlite py-2 md:py-4 mb-6 '>
        <p className=' px-4 py-2 font-bold text-2xl'>About Us </p>
        <AppBreadcrumbs />
      </div>

      {/* body section */}

      <div className='flex flex-col md:flex-row gap-8 justify-center mb-10 px-4'>
        <div className='flex md:w-[800px] md:h-[500px] rounded shadow-sm transform transition-transform duration-300 hover:scale-105 hover:shadow-md'>
          <img src={AboutImage} alt="About Us" 
          className=" w-full h-auto md:w-[800px] md:h-[450px] 
          rounded-2xl object-cover shadow-lg " />
        </div>

        <div className='md:w-[450px] flex flex-col justify-start md:mt-8'>
          <h2 className='text-xl md:text-3xl font-semibold mb-4 text-[#0A174E]'>
            Crafted for comfort, built to last, bringing elegance to every corner.
          </h2>
          <p className='text-sm md:text-base text-justify text-[#0A174E] mb-4'>
            Discover furniture that blends timeless design with everyday comfort. 
            Each piece is meticulously crafted, built to last, and designed to 
            transform your home. From cozy corners to elegant living spaces, 
            we combine style and functionality, making every room a sanctuary. 
            Explore our collection and indulge in warmth, sophistication, and 
            unmatched quality. Every piece tells a story of comfort, elegance, 
            and lasting beauty.
          </p>

          <Link to="/contact">
          <button className='bg-[#0A174E] mt-4 md:mt-10 
          text-white py-2 px-4 rounded-md hover:bg-[#0A174E]/80'>
            Contact Us
          </button>
          </Link>
        </div>
      </div>



      <div className='flex flex-col md:flex-row gap-8 justify-center mb-10 px-4'>
              
              {/* Left side (Blog content) */}
              <div className='w-full md:w-[800px] text-[#0A174E] rounded shadow-sm transform transition-transform duration-300 hover:scale-105 hover:shadow-md'>
                <img 
                  src={workspace02} 
                  alt='workspace02' 
                  className='w-full h-90 md:h-[550px] object-cover rounded-lg mb-4'
                />
      
                <div className='flex flex-row justify-start gap-8'>
                  <div className='flex flex-row items-center gap-2 py-4'>
                    <img src={Vector2} alt='logo' />
                    <p>Surajan Shrestha</p>
                  </div>
                  <div className='flex flex-row items-center gap-2'>
                    <img src={Vector} alt='logo' className='w-4 h-4' />
                    <p>Aug 09 2020</p>
                  </div>
                </div>
      
                <h2 className='text-2xl font-bold mb-2'>
                 Bringing comfort and style to every corner of your space.
                </h2>  
      
                <p className='text-gray-700 mb-4 text-justify'>
                    Your home deserves furniture that balances elegance with everyday living. From cozy
                    living rooms to inspiring workspaces, we bring you designs that add warmth, style, 
                    and functionality to every corner. Explore timeless collections crafted to reflect 
                    your personality and make your space truly feel like home.
                </p>
      
                <Link to="#" className='font-semibold hover:underline'>Read More...</Link>
              </div>
      
              {/* Right side (Sidebar) */}
              <div className='md:w-[450px] flex flex-col justify-start md:mt-8 gap-6'>
                {/* Sale Products */}
                <div className='border p-4 rounded-lg shadow-sm rounded shadow-sm transform transition-transform duration-300 hover:scale-105 hover:shadow-md' >
                  <h3 className='font-semibold mb-3 text-2xl'>Sale Products</h3>
                    <ul className='space-y-3 text-sm text-gray-600'>
                    <li className="flex items-start space-x-3">
                        <img 
                          src={post01}
                          alt="icon" 
                          className="w-16 h-18 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1">
                          <p className="text-gray-800 text-justify">
                            ✨ "Your home deserves furniture that inspires comfort & elegance. 
                            Discover our latest collection today!"<br></br>
                            <span className="text-gray-400"> - Aug 09 2020</span>
                          </p>
                        </div>
                      </li>
      
                         <li className="flex items-start space-x-3">
                        <img 
                          src={post02}
                          alt="icon" 
                          className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1">
                          <p className="text-gray-800 text-justify">
                            🛋️ "A sofa is not just a seat—it’s where memories are made. 
                            Find yours now.<br></br>
                            <span className="text-gray-400"> - Aug 11 2025</span>
                          </p>
                        </div>
                      </li>
      
      
                         <li className="flex items-start space-x-3">
                        <img 
                          src={post03}
                          alt="icon" 
                          className="w-16 h-18 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1">
                          <p className="text-gray-800 text-justify">
                            🌿 "Turn your patio into a relaxing paradise with our 
                            outdoor furniture range."<br></br>
                            <span className="text-gray-400"> - Aug 13 2025</span>
                          </p>
                        </div>
                      </li>
                         <li className="flex items-start space-x-3">
                        <img 
                          src={post04}
                          alt="icon" 
                          className="w-16 h-18 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1">
                          <p className="text-gray-800 text-justify">
                            🛏️ "Sleep better, live better. Explore bedroom furniture designed
                             for true comfort."<br></br>
                            <span className="text-gray-400"> - Aug 15 2025</span>
                          </p>
                        </div>
                      </li>
                  </ul>
                </div>
      
      
                  {/* Other Products */}
                  <div className="border p-4 rounded-lg shadow-sm rounded shadow-sm transform transition-transform duration-300 hover:scale-105 hover:shadow-md">
                    <h3 className="font-semibold mb-3 text-2xl">Other Products</h3>
                    
                    <div className="grid grid-cols-2 gap-2">
                      {/* Item 1 */}
                      <div className="flex flex-col items-center text-center cursor-pointer">
                        <img 
                          src={post01} 
                          alt="Living Room Inspirations" 
                          className="w-20 h-20 object-cover rounded-lg shadow-sm mb-2" 
                        />
                        <p className="text-gray-700 font-medium">Living Room</p>
                      </div>
      
                      {/* Item 2 */}
                      <div className="flex flex-col items-center text-center cursor-pointer">
                        <img 
                          src={post02} 
                          alt="Bedroom Comfort" 
                          className="w-20 h-20 object-cover rounded-lg shadow-sm mb-2" 
                        />
                        <p className="text-gray-700 font-medium">Bedroom</p>
                      </div>
      
                      {/* Item 3 */}
                      <div className="flex flex-col items-center text-center cursor-pointer">
                        <img 
                          src={post03} 
                          alt="Dining & Kitchen" 
                          className="w-20 h-20 object-cover rounded-lg shadow-sm mb-2" 
                        />
                        <p className="text-gray-700 font-medium">Dining</p>
                      </div>
      
                      {/* Item 4 */}
                      <div className="flex flex-col items-center text-center cursor-pointer">
                        <img 
                          src={post04} 
                          alt="Office Furniture" 
                          className="w-20 h-20 object-cover rounded-lg shadow-sm mb-2" 
                        />
                        <p className="text-gray-700 font-medium">Office</p>
                      </div>
                    </div>
                  </div>
      
              </div>
            </div>



            {/* Our Workspace  */}
            <div className='text-xl md:text-4xl font-semibold text-center text-[#0A174E] mb-6 px-4 md:mt-18 md:mb-10'>
             A glimpse into our creative space
            </div>

            <div className='grid grid-cols-1 md:grid-cols-4 
            gap-6 mb-10 px-4 text-center text-[#0A174E]  '>
              <div className='flex flex-col items-center rounded shadow-sm transform transition-transform duration-300 hover:scale-105 hover:shadow-md'>
                <img src={image01} alt="firstimage" 
                className='mb-4 rounded-md w-full h-48 object-cover'
                 />
                <h1 className='text-xl font-semibold mb-2 mt-6'>
                  <Link to="/">Home Page</Link>
                </h1>
                <p className='text-sm text-gray-600 px-4 text-justify mb-6'>
                  Welcome to our home page, where you can explore the essence 
                  of our brand and offerings. Here, we showcase our core values, 
                  latest updates, and a glimpse into what makes our work unique. 
                  Navigate through our features and discover how we bring style, 
                  comfort, and functionality together for every space.</p>
              </div>


              <div className='flex flex-col items-center rounded shadow-sm transform transition-transform duration-300 hover:scale-105 hover:shadow-md'>
                <img src={image02} alt="firstimage" 
                className='mb-4 rounded-md w-full h-48 object-cover'
                />
                <h1 className='text-xl font-semibold mb-2 mt-6'>
                  <Link to="/product">Our Products</Link>
                </h1>
                <p className='text-sm text-gray-600 px-4 text-justify mb-6'>
                  Explore our diverse range of products, crafted to combine style, quality, and 
                  functionality. Each piece is thoughtfully designed to enhance your living space 
                  while providing lasting comfort. From timeless classics to modern innovations, 
                  our collection showcases the best of craftsmanship, ensuring every product brings 
                  elegance and practicality to your home.</p>
              </div>

              <div className='flex flex-col items-center rounded shadow-sm transform transition-transform duration-300 hover:scale-105 hover:shadow-md'>
                <img src={image03} alt="firstimage"
                className='mb-4 rounded-md w-full h-48 object-cover'
                 />
                <h1 className='text-xl font-semibold mb-2 mt-6'>
                  <Link to="/wishlist">Some WhishLists</Link>
                </h1>
                <p className='text-sm text-gray-600 px-4 text-justify mb-6'>
                  Your Wishlist keeps all your favorite products in one place for easy access.
                  Browse and save items that inspire you, and plan your perfect living space at your own pace.
                   Every product you add reflects your taste, helping you curate a collection of pieces that truly 
                   resonate with your style and needs.</p>
              </div>


              <div className='flex flex-col items-center rounded shadow-sm transform transition-transform duration-300 hover:scale-105 hover:shadow-md'>
                <img src={image04} alt="firstimage" 
                className='mb-4 rounded-md w-full h-48 object-cover'
                />
                <h1 className='text-xl font-semibold mb-2 mt-6'>
                  <Link to="/cart">Cart Section</Link>
                </h1>
                <p className='text-sm text-gray-600 px-4 text-justify mb-6'>
                   The Cart is where your selected products come together before checkout. Review your 
                   choices, adjust quantities, and ensure everything fits your home and lifestyle. 
                   Designed for convenience, it helps you manage your purchases efficiently while keeping 
                   track of your selections in a simple, organized way.</p>
              </div>
          </div>



      <section className="mt-18">
              <WhatshopOffers />
        </section>


       <section>
            <div className="container flex items-center justify-center mt-10 mb-10">
              <img src={BrandPromotion} alt="brandpromotion" className="sm:h-10 md:h-20 sm:px-4 md:px-10"/>
            </div>
          </section>


    </div>
  )
}

export default AboutUs;