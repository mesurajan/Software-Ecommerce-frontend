import React from 'react'
import facebook from '../../assets/images/Home/fb.png';
import instagram from '../../assets/images/Home/insta.png' ;
import twitter from '../../assets/images/Home/twitter.png';
import { Link } from "react-router-dom";

function Footer() {
  return ( 
    <div className='container  bg-backgroundlite text-[#0A174E]'>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-10 md:py-[85px] px-8 md:px-4 py-20 ">
        
       <div className='md:px-4 '>
        <header>
          <h1 className='text-3xl font-bold '>Hekto</h1>
          </header>
        
        <div className='mt-4 space-y-4'>
          <div className='flex items-center'>
              <input placeholder='Enter Your Email' className='h-10 px-2 border border-[#0A174E]  focus:outline-none focus:ring-1 focus:ring-[#0A174E]'></input>
              <Link to ="signup">
                <button button className='h-10 px-6 primary-btn hover:bg-primary-btn whitespace-nowrap '>Sign up</button>
              </Link>

          </div>
          <div className='flex flex-col text-sm'>
            <p>Contact Info</p>
            <p>Ktm Lalitpur -Ganesh Margh Near Ganesh Mandir</p>
          </div>  
        </div>
       </div>


       <div className='md:px-10 '>
        <header>
          <h1 className='text-xl font-bold '>Categories</h1>
        </header>
          <div className='mt-4 text-sm'>
          <nav>
            <ul >
              <li className='py-1'><a href="/product">Beds</a></li>
              <li className='py-1'><a href="/product">Chairs</a></li>
              <li className='py-1'><a href="/product">Wardrobes</a></li>
              <li className='py-1'><a href="/product">Dining Table</a></li>
              <li className='py-1'><a href="/product">Door Frames</a></li>
            </ul>
          </nav>
          </div>
       </div>


       <div className='md:px-10 '>
        <header>
          <h1 className='text-xl font-bold '>Customer Care</h1>
        </header>
          <div className='mt-4 text-sm'>
          <nav>
            <ul >
              <li className='py-1'><a href="#">My Account</a></li>
              <li className='py-1'><a href="#">Discount</a></li>
              <li className='py-1'><a href="#">Returns</a></li>
              <li className='py-1'><a href="#">Orders History</a></li>
              <li className='py-1'><a href="#">Order Tracking</a></li>
            </ul>
          </nav>
          </div>
       </div>


      <div className='md:px-10 '>
              <header>
                <h1 className='text-xl font-bold '>Pages</h1>
              </header>
                <div className='mt-4 text-sm'>
                <nav>
                  <ul >
                    <li className='py-1'><a href="#">Blog</a></li>
                    <li className='py-1'><a href="#">Browse the Shop</a></li>
                    <li className='py-1'><a href="#">Category</a></li>
                    <li className='py-1'><a href="#"> Pre-Built Pages</a></li> 
                    <li className='py-1'><a href="#">Visual Composer Elements</a></li>
                    <li className='py-1'><a href="#">WooCommerce Pages</a></li>
                  </ul>
                </nav>
                </div>
            </div>
            


      </div>



     <div className='flex flex-row justify-center gap-6 py-2 mt-2 bg-mainbackground '>
      <div className='ml-2 text-white'>
        <p>&copy;Hekto -All Right Reserved .</p>
      </div>


      

        <div className='flex flex-row gap-2 mr-4'>
          <a href="https://www.facebook.com/shrestha.surajan">
            <img src={facebook} alt= "fb-logo" className='w-6 h-6 '/>
          </a>
          
          <a href="https://www.facebook.com/shrestha.surajan">
           <img src={instagram} alt= "insta-logo" className='w-6 h-6 '/>
          </a>

         <a href="https://www.facebook.com/shrestha.surajan">
          <img src={twitter} alt= "twitter-logo" className='w-6 h-6 '/>
         </a>
          
        </div>
   </div>
    
</div>
  )
}

export default Footer