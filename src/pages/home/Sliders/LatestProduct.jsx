import React, { useState, useRef } from "react";
import Slider from "react-slick";
import { latestProducts } from '../../../assets/latestProducts ';
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../Apps/Reducers/cartSlice";
import { FaRegHeart } from "react-icons/fa";
import { BsCart } from "react-icons/bs";
import { addToWishlist } from "../../../Apps/Reducers/wishlistSlice";

function LatestProductSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const dispatch = useDispatch();
  const navItems = ["New Arrivals", "Best Seller", "Featured", "Special Offer"];
const navigate = useNavigate();
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    beforeChange: (_, next) => setCurrentSlide(next),
  };



  if (!latestProducts.length) return null;

    const handleAddToWishlist = (chair) => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to add products to your Wishlist!");
        navigate("/login");
        return;
      }
      dispatch(addToWishlist(chair));
    };
  

   const handleAddToCart = (chair) => {
     const token = localStorage.getItem("token");
     if (!token) {
       alert("Please login to add products to your cart!");
       navigate("/login");
       return;
     }
 
     dispatch(
       addToCart({
         id: chair.id,
         title: chair.title,
         price: chair.price,
         chairimage: chair.chairimage,
       })
     );
   };

  return (
    <div className="px-4 mx-auto slider-container max-w-7xl md:px-0">
      {/* Heading */}
      <div className="flex justify-center mb-4">
        <h2 className="text-[28px] md:text-[32px] font-semibold text-[#0A174E]">
          Latest Products
        </h2>
      </div>

      {/* Navigation tabs */}
      <ul className="flex justify-center gap-4 md:gap-10 mb-6 text-[12px]">
        {navItems.map((item, index) => (
          <li
            key={index}
            onClick={() => sliderRef.current?.slickGoTo(index)}
            className={`cursor-pointer font-medium transition-colors duration-300 ${
              currentSlide === index ? "text-[#0A174E]" : "text-gray-400"
            }`}
          >
            {item}
          </li>
        ))}
      </ul>

      {/* Slider */}
      <Slider ref={sliderRef} {...settings}>
        {latestProducts.map((slide) => (
          <div key={slide.id} className="grid grid-cols-1 gap-4">
            {/* Chunk chairs into rows of 3 */}
            {Array.from(
              { length: Math.ceil(slide.chairs.length / 3) },
              (_, rowIndex) => (
                <div
                  key={rowIndex}
                  className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {slide.chairs
                    .slice(rowIndex * 3, rowIndex * 3 + 3)
                    .map((chair) => (
                      <div
                        key={chair.id}
                        className="relative flex flex-col items-center justify-center p-4 rounded bg-background-secondary hover:border-2 hover:border-blue-900"
                      >
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => handleAddToWishlist(chair)}
                      className="p-2 bg-white rounded-full shadow hover:bg-pink-100"
                      title="Add to Wishlist"
                    >
                      <FaRegHeart className="text-pink-500" />
                    </button>
                    <button
                      onClick={() => handleAddToCart(chair)} // ✅ calls Redux addToCart
                      className="p-2 bg-white rounded-full shadow hover:bg-blue-100"
                      title="Add to Cart"
                    >
                      <BsCart className="text-blue-600" />
                    </button>
                  </div>
                        <img
                          src={chair.chairimage}
                          alt={chair.title}
                          className="w-full max-w-[220px] max-h-[240px] mt-0"
                        />
                        <div className="mt-2 text-center">
                          <h3 className="text-sm font-semibold">
                            {chair.title}
                          </h3>
                          <p className="text-xs text-gray-600">
                            {chair.price}
                          </p>
                        </div>

                        <Link to={`/productDetails/${chair.id}`}>
                          <button className="mt-6 primary-btn">
                            View details
                          </button>
                        </Link>
                      </div>
                    ))}
                </div>
              )
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default LatestProductSlider;
