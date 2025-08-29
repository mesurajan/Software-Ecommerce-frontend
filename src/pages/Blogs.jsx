import React from 'react'
import AppBreadcrumbs from "../components/Breadcrumbs";
import { Link } from 'react-router-dom';
import workspace01 from '../assets/images/blogs/workspace01.png';
import workspace02 from '../assets/images/blogs/workspace02.png';
import workspace03 from '../assets/images/blogs/workspace03.png';
import post01 from '../assets/images/blogs/post01.png';
import post02 from '../assets/images/blogs/post02.png';
import post03 from '../assets/images/blogs/post03.png';
import post04 from '../assets/images/blogs/post04.png';
import Vector from '../assets/images/Home/Vector.png';
import Vector2 from '../assets/images/Home/vector2.png';
import { CiSearch } from "react-icons/ci";

function Blogs() {
  return (
    <div className='container bg-white text-[#0A174E]'>

      {/* Header */}
      <div className='bg-backgroundlite py-6 md:py-10'>
        <header>
          <h1 className='px-4 text-3xl font-bold'>Our Blogs</h1>
        </header>
        <AppBreadcrumbs />
      </div>

     <div className='px-2 py-2'>
      <header>
        <h1 className='px-2 mt-2 text-xl md:text-3xl font-bold text-[#0A174E]'>
          Where Design Meets Comfort 🛋️
        </h1>
        <p className='px-2 mt-2 text-gray-700 text-sm md:text-base text-justify'>
          Explore curated ideas, tips, and inspiration to create spaces that are both stylish and cozy. 
          Every corner of your home can reflect your personality while keeping comfort at its heart. 
          From modern minimalism to warm, inviting nooks, we showcase designs that spark creativity. 
          Let your space tell a story that’s uniquely yours, combining beauty, function, and comfort.
        </p>
      </header>
    </div>


      {/* Body starts */}
      <div className='flex flex-col md:flex-row gap-8 px-4 py-8 mt-6 md:mt-10'>
        {/* Left side (Blog content) */}
        <div className='w-full md:w-3/4 text-[#0A174E]'>
          <img 
            src={workspace01} 
            alt='workspace01' 
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
            Elegant designs crafted with precision for your home.
          </h2>  

          <p className='text-gray-700 mb-4 text-justify'>
            Discover the art of interior design with our expert tips, creative ideas, 
            and practical guides. From sleek modern minimalism to warm and cozy rustic 
            styles, we cover every trend and timeless classic to inspire you. Our goal 
            is to help you design a space that not only looks beautiful but also 
            reflects your unique personality, lifestyle, and comfort.
          </p>

          <Link to="#" className='font-semibold hover:underline'>Read More...</Link>
        </div>

        {/* Right side (Sidebar) */}
        <div className='w-full md:w-1/4 flex flex-col md:gap-8 hidden md:flex md:py-4'>
          {/* Search */}
          <div className='border p-4 rounded-lg shadow-sm'>
            <h3 className='font-semibold mb-3 text-2xl'>Search</h3>
              <div className="items-center justify-end flex-1 hidden max-w-xs gap-0 md:flex">
                  <input
                      type="text"
                      className="w-full h-8 px-2 border-2 focus:outline-none"
                      placeholder=" "
                        />
                  <div className="flex items-center justify-center h-8 px-3 cursor-pointer bg-primary">
                     <CiSearch color="white" size={20} />
                  </div>
              </div>
          </div>

          {/* Categories */}
          <div className='border p-4 rounded-lg shadow-sm'>
            <h3 className='font-semibold mb-3'>Categories</h3>
            <ul className='space-y-2 text-gray-700 cursor-pointer'>
              <li>Living Room Inspirations(14)</li>
              <li>Bedroom Comfort(21)</li>
              <li>Dining & Kitchen(10)</li>
              <li>Office Furniture(8)</li>
              <li>Outdoor & Patio(4)</li>
              <li>Storage & Organization(12)</li>
            </ul>
          </div>

          {/* Recent posts */}
          <div className='border p-4 rounded-lg shadow-sm'>
            <h3 className='font-semibold mb-3'>Recent Posts</h3>
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
        </div>
      </div>


      {/* Second Blog Post */}
    <div className='flex flex-col md:flex-row gap-8 px-4 py-8 mt-2 md:mt-4'>
        
        {/* Left side (Blog content) */}
        <div className='w-full md:w-3/4 text-[#0A174E]'>
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
        <div className='w-full md:w-1/4 flex flex-col md:gap-8 md:py-4 gap-4'>
          {/* Sale Products */}
          <div className='border p-4 rounded-lg shadow-sm'>
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
            <div className="border p-4 rounded-lg shadow-sm">
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



    {/* Third Blogs */}
      <div className='flex flex-col md:flex-row gap-8 px-4 py-8 mt-2 md:mt-4'>
        {/* Left side (Blog content) */}
        <div className='w-full md:w-3/4 text-[#0A174E]'>
          <img 
            src={workspace03} 
            alt='workspace03' 
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
            Designs that blend beauty with functionality.
          </h2>  

          <p className='text-gray-700 mb-4 text-justify'>
         Furniture should be more than just beautiful—it should work for your lifestyle. 
        Our collections combine modern aesthetics with smart design, giving you pieces 
        that look stunning while serving everyday needs. From minimalist elegance to 
        bold statement styles, find inspiration to create a home that is both practical 
        and stylish.
          </p>

          <Link to="#" className='font-semibold hover:underline'>Read More...</Link>
        </div>

        {/* Right side (Sidebar) */}
        <div className='w-full md:w-1/4 flex flex-col md:gap-8 md:py-4 gap-4'>
          {/* Discounted Products */}
            <div className='border p-4 rounded-lg shadow-sm'>
              <h3 className='font-semibold mb-3 text-2xl'>Discounted Products</h3>
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


        {/* Tags */}
        <div className='border p-4 rounded-lg shadow-sm'>
          <h3 className='font-semibold mb-3 text-2xl'>Tags We Adore ✨</h3>
          <ul className='space-y-2 text-gray-700'>
            <li>Cozy Corners (14)</li>
            <li>Bold & Bright (21)</li>
            <li>Minimal Magic (10)</li>
            <li>Artful Spaces (8)</li>
            <li>Urban Oasis (12)</li>
            <li>Dreamy Nooks (9)</li>
          </ul>
        </div>

        </div>

      </div>
    </div>
  )
}

export default Blogs
