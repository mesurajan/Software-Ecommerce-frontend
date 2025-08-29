import React from 'react'
import G14 from '../assets/images/about/g14.png';
import AppBreadcrumbs from '@/components/Breadcrumbs';
import Tel from '../assets/images/about/tel.png'
import Call from "../assets/images/offer/call.png";
import Car from "../assets/images/offer/car.png";
import Location from "../assets/images/about/location.png";
import Warehouse from "../assets/images/about/warehouse.png";
import Whyus from "../assets/images/about/whyus.png";
import BrandPromotion from "../assets/images/Home/BrandPromotion.png";

function Contact() {
  return (


    <div className='container text-mainbackground'>
      <div className='container bg-backgroundlite'>
        <h1 className='text-2xl font-bold p-4 md:text-4xl'>Contact US</h1>
        <AppBreadcrumbs />
      </div>

    {/* main body */}
      <div className='flex flex-col md:flex-row text-center justify-center mt-10 md:mt-24 mb-10 '>
       <div className='flex justify-center items-start flex-col gap-4 md:w-2/3 md:px-24'>
        <h1 className='text-2xl font-semibold md:font-bold md:text-4xl px-4'>Information About Us</h1>
        <p className='text-justify p-4 md:w-[95%]'>
        At Hekto Furniture, we believe every space deserves comfort, elegance, and durability. 
        Our mission is to bring you timeless designs that blend style with functionality, making 
        your home truly yours. From modern essentials to classic favorites, we’re here to craft 
        furniture that reflects your lifestyle and adds warmth to every corner. We are committed 
        to quality craftsmanship and sustainable materials that stand the test of time. With Hekto,
        you don’t just buy furniture—you create a home you’ll love....
        </p>

        <img src={Warehouse } alt='main logo warehouse' 
        className='p-4 md:w-[95%] md:h-[85%] rounded-md transform transition hover:scale-105'/>
       </div>


        {/* Contact Way */}
        <div className="flex justify-start items-center flex-col gap-4">
          <h1 className="text-2xl font-semibold md:font-bold md:text-4xl mb-4 px-4">
            Contact Way
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full px-4">
            {/* first one */}
            <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition">
              <img 
                src={Call} 
                alt="Call" 
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="text-gray-700 text-sm text-left">
                <p className="font-medium">Tel: +977 9816413787</p>
                <p className="font-medium">Email: hetkofurniture@gmail.com</p>
              </div>
            </div>

            {/* second one */}
            <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition">
              <img 
                src={Tel} 
                alt="Telephone" 
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="text-gray-700 text-sm text-left">
                <p className="font-medium">Support Forums </p>
                <p className="font-medium">24/7 Open For All</p>
              </div>
            </div>

            {/* third one */}
            <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition">
              <img 
                src={Location} 
                alt="Location" 
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="text-gray-700 text-sm text-left">
                <p className="font-medium">Sainamaina -10 Saljhandi</p>
                <p className="font-medium">Rupandehi, Mahindra highway</p>
              </div>
            </div>

            {/* fourth one */}
            <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition">
              <img 
                src={Car} 
                alt="delivery" 
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="text-gray-700 text-sm text-left">
                <p className="font-medium">Free standard Delivery</p>
                <p className="font-medium">all over Nepal</p>
              </div>
            </div>
          </div>

          <section className="mt-14 mb-10 flex flex-col items-center text-center gap-6 px-6">
          <h2 className="text-2xl md:text-3xl font-bold">Why Choose Us?</h2>
          <img 
            src={Whyus} 
            alt="Why Choose Us" 
            className="w-full md:w-[95%] lg:w-[95%] object-contain rounded-md shadow-md hover:scale-105 transition"
          />
          
          <p className="max-w-2xl text-justify py-4 ">
            We combine <span className="font-semibold">craftsmanship, sustainability, and timeless design</span> 
            to deliver furniture that transforms your space into a home. 
            With us, you get more than just furniture — you get comfort, 
            durability, and service that cares about you. 
            Our creations are built to inspire everyday living while adding a touch of elegance. 
            At Hekto Furniture, we turn houses into homes you’ll love coming back to.
          </p>
        </section>

        </div>   
      </div>



      <div className='flex flex-col md:flex-row text-center justify-center  mt-10 mb-10 gap-6 '>
        <div className='md:w-1/2 flex flex-col justify-center items-center gap-6 transition transform hover:scale-105'> 
          <div className=''>
          <p className='font-bold text-2xl md:text-4xl'>Get In Touch</p>
          <p className='text-justify px-6 py-6 md:py-10 md:w-165'> We’d love to hear from you! Whether you have a 
            question, feedback, or just want to say hello, feel 
            free to reach out. Our team is always ready to assist 
            you and make your experience better.</p>
          </div>

          {/* form section */}
            <form>
              <div className='flex flex-col md:flex-row gap-4 justify-center items-center'>
                <input type="text" placeholder='Your Name*' required className='w-80 md:w-65 h-10 rounded-sm text-black p-4 border-[1px] border-gray-300' />
                <input type="text" placeholder='Your Email*' required className='w-80 md:w-95 h-10 rounded-sm text-black p-4 border-[1px] border-gray-300' />
              </div>
              <div>
                <input type="text" placeholder='Subject*' required className='w-80 md:w-165 h-10 rounded-sm text-black p-4 border-[1px] border-gray-300 mt-4' />
                <textarea placeholder='Type Your Message*' required className='w-80 md:w-165 h-32 rounded-sm text-black p-4 border-[1px] border-gray-300 mt-4' />
              </div>
              <div className='flex justify-start items-start px-8 md:px-14'> 
               <button type='submit' 
              className='bg-mainbackground item-start text-gray-300 w-80 
              md:w-65 h-10 rounded-sm mt-4 transition-transform hover:scale-105'>
                Submit</button>
              </div>
            </form>
        </div>

        <div className='p-4 md:p-0 md:py-14'>
          <img src={G14} alt="Get In Touch"
           className='bg-mainbackground rounded-md transform transition hover:scale-105' />
        </div>
      </div>


        <section>
            <div className="container flex items-center justify-center mt-16 mb-16">
              <img src={BrandPromotion} alt="brandpromotion" className="sm:h-10 md:h-20 sm:px-4 md:px-10"/>
            </div>
        </section>
     
    </div>
  )
}

export default Contact