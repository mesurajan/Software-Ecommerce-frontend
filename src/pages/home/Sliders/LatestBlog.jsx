import React from 'react';
import latest01 from '../../../assets/images/Home/latest01.jpg';
import latest02 from '../../../assets/images/Home/latest02.jpg';
import latest03 from '../../../assets/images/Home/latest03.jpg';
import Vector from '../../../assets/images/Home/Vector.png';
import Vector2 from '../../../assets/images/Home/vector2.png';

function LatestBlog() {
  return (
    <div className='container mt-20 text-[#0A174E]'>
        <div className='flex flex-row justify-center'>
            <header>
                <h1 className='font-semibold text-[38px] '>Latest Blog</h1>
            </header>
        </div>


        <div className='grid justify-center grid-cols-1 gap-4 mt-10 md:grid-cols-3 md:flex-row md:gap-12'>
            {/* Section 01 */}
            <div className='px-10 py-10 transition-transform duration-300 cursor-pointer md:px-4 hover:scale-105'>
               <div className='flex flex-row justify-center'>
               <img src={latest01} alt='firstpic' className='max-w-[300px] max-h-[350px] md:max-w-[400px] md:max-h-[450px] rounded-xl'/>
               </div>

                {/* Date  and Name*/}
               <div className='flex flex-row justify-start gap-8'>
                    <div className='flex flex-row items-center gap-2 py-4'>
                        <img src={Vector2}alt='logo' />
                        <p>Saber Ali</p>
                    </div>

                    <div className='flex flex-row items-center gap-2'>
                        <img src={Vector}alt='logo' className='w-4 h-4' />
                        <p>21 August,2020</p>
                    </div>
                </div>

                {/* title & Descriptions */}
                <div className='py-2 md:py-4 md:px-4'>
                    <h1 className='py-2 font-semibold text-[20px]'>Top esssential Trends in 2021</h1>
                    <p className='text-[13px]'>More off this less hello samlande lied much over tightly circa horse taped mightly</p>
                </div>

                <div className='flex text-text-[12px] md:px-4'>
                    <a href="#" className="underline decoration-2 ">ReadMore</a>
                </div>
              
            </div>

               {/* Section 02 */}
            <div className='px-10 py-10 transition-transform duration-300 cursor-pointer md:px-4 hover:scale-105'>
               <div className='flex flex-row justify-center'>
               <img src={latest02} alt='firstpic' className='max-w-[300px] max-h-[350px] md:max-w-[400px] md:max-h-[450px] rounded-xl'/>
               </div>

                {/* Date  and Name*/}
               <div className='flex flex-row justify-start gap-8'>
                    <div className='flex flex-row items-center gap-2 py-4'>
                        <img src={Vector2}alt='logo' />
                        <p>Saber Ali</p>
                    </div>

                    <div className='flex flex-row items-center gap-2'>
                        <img src={Vector}alt='logo' className='w-4 h-4' />
                        <p>21 August,2020</p>
                    </div>
                </div>

                {/* title & Descriptions */}
                <div className='py-2 md:py-4 md:px-4'>
                    <h1 className='py-2 font-semibold text-[20px]'>Top esssential Trends in 2021</h1>
                    <p className='text-[13px]'>More off this less hello samlande lied much over tightly circa horse taped mightly</p>
                </div>

                <div className='flex text-text-[12px] md:px-4'>
                    <a href="#" className="underline decoration-2 ">ReadMore</a>
                </div>
              
            </div>

               {/* Section 03 */} 
            <div className='px-10 py-10 transition-transform duration-300 cursor-pointer md:px-4 hover:scale-105'>
               <div className='flex flex-row justify-center'>
               <img src={latest03} alt='firstpic' className='max-w-[300px] max-h-[350px] md:max-w-[400px] md:max-h-[450px] rounded-xl'/>
               </div>

                {/* Date  and Name*/}
               <div className='flex flex-row justify-start gap-8'>
                    <div className='flex flex-row items-center gap-2 py-4'>
                        <img src={Vector2}alt='logo' />
                        <p>Saber Ali</p>
                    </div>

                    <div className='flex flex-row items-center gap-2'>
                        <img src={Vector}alt='logo' className='w-4 h-4' />
                        <p>21 August,2020</p>
                    </div>
                </div>

                {/* title & Descriptions */}
                <div className='py-2 md:py-4 md:px-4'>
                    <h1 className='py-2 font-semibold text-[20px]'>Top esssential Trends in 2021</h1>
                    <p className='text-[13px]'>More off this less hello samlande lied much over tightly circa horse taped mightly</p>
                </div>

                <div className='flex text-text-[12px] md:px-4'>
                    <a href="#" className="underline decoration-2 ">ReadMore</a>
                </div>
              
            </div>

    
        </div>
    </div>
  )
}

export default LatestBlog