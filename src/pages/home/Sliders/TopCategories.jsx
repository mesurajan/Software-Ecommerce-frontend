import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../../../components/ProductCard";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5174";;

function TopCategories() {
  const [categories, setCategories] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/topcategories`);
        setCategories(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        console.error("Error fetching top categories:", err);
      }
    };
    fetchData();
  }, []);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (_, next) => setCurrentSlide(next),
    appendDots: () => (
      <ul className="flex justify-center gap-4 mt-6">
        {categories.map((_, idx) => (
          <li
            key={idx}
            onClick={() => sliderRef.current?.slickGoTo(idx)}
            className={`cursor-pointer rounded-sm ${
              idx === currentSlide ? "bg-[#0A174E]" : "bg-gray-400"
            }`}
            style={{ width: "16px", height: "4px" }}
          />
        ))}
      </ul>
    ),
  };

  // ✅ Fixed: removes trailing "/" from BACKEND_URL and leading "/" from path
  const getImageUrl = (path) => {
    if (!path) return `${BACKEND_URL}/uploads/Default/lightimage.png`;
    if (path.startsWith("http")) return path;
    return `${BACKEND_URL.replace(/\/$/, "")}/${path.replace(/^\/+/, "")}`;
  };

  if (!categories.length) return null;

  return (
    <div className="px-4 mx-auto max-w-7xl">
      <h1 className="text-center text-[35px] font-semibold  text-[#0A174E]">
        Top Categories
      </h1>

      <Slider ref={sliderRef} {...settings}>
        {categories.map((category) => (
          <div key={category._id}>
            {/* ✅ Category Header */}
            <h2 className="text:[8px] font-light text-center mb-6 text-[#0A174E] mt-4">
              {category.title}
            </h2>

            {/* ✅ Responsive Product Grid */}
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-4">
              {category.chairs.map((chair, idx) => {
                const productId = chair.product?._id || chair.product || idx;
                const productSlug =
                  chair.productSlug || chair.product?.slug || "unknown";

                const formattedChair = {
                  id: productId,
                  title: chair.title || chair.product?.title || "Untitled",
                  price: chair.price || chair.product?.price || 0,
                  image: getImageUrl(
                    chair.chairimage ||
                      chair.product?.images?.[0] ||
                      chair.product?.image
                  ),
                  slug: productSlug,
                };

                return <ProductCard key={idx} product={formattedChair} />;
              })}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default TopCategories;
