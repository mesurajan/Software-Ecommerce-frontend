import React from 'react'

function TrendingProducts() {
  return (
    // starting of this code
    <div className='container'>
        <section className='first sectoion'>
            <div>
                <header>
                    <h1 className='text-4xl font-semibold flex justify-center text-[#0A174E]' >Trending Products</h1>
                </header>
            </div>

            <div className='mt-18 flex justify-center'>
                <div className='grid grid-cols-1 md:grid-cols-4 '> 
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>

                </div>
            </div>

        </section>


    </div>
  )
}

export default TrendingProducts