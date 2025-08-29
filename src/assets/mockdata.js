import leftImage1 from "./images/Home/lightimage.png";
import rightImage1 from "./images/Home/banner.png";
import chair01 from "./images/chairs/chair01.png";
import chair02 from "./images/chairs/chair02.png";
import chair03 from "./images/chairs/chair03.png";
import chair04 from "./images/chairs/chair04.png";
import chair05 from "./images/chairs/chair05.png";
import chair06 from "./images/chairs/chair06.png";
import chair07 from "./images/chairs/chair07.png";
import chair08 from "./images/chairs/chair08.png";
import chair09 from "./images/chairs/chair09.png";
import chair10 from "./images/chairs/chair10.png";
import chair11 from "./images/chairs/chair11.png";
import chair12 from "./images/chairs/chair12.png";
import chair13 from "./images/chairs/chair13.png";

import DiscountChair from "./images/chairs/DiscountItem.png"

export const BannerData = [
  {
    id: 1,
    subtitle: "Best furniture For your Castle...",
    title1: "New Furniture Collection",
    title2: "Trends in 2020",
    description:
      "Discover the finest furniture crafted to make your home a true castle. Explore our new collection featuring the latest trends of 2020 stylish, comfortable, and made just for you.",
    leftImage: leftImage1,
    rightImage: rightImage1,
  },
  {
    id: 2,
    subtitle: "Modern Designs",
    title1: "Comfort & Style",
    title2: "For Every Home",
    description:
      "Experience the perfect blend of modern design and comfort with our exclusive furniture collection.",
    leftImage: leftImage1,
    rightImage: rightImage1,
  },
  {
    id: 3,
    subtitle: "Exclusive Offers",
    title1: "Furniture Sale",
    title2: "Up to 50% Off",
    description:
      "Don't miss our biggest sale! Upgrade your home with premium furniture at unbeatable prices.",
    leftImage: leftImage1,
    rightImage: rightImage1,
    discount:"50% OFF"
  },
];


export const BannerData2 = [
  {
    id: 1,
    chairs: [
      { 
        id: 1, 
        title: "Pure wooden chair", 
        price: "$350", 
        chairimage: chair01, 
        description: "A premium handcrafted chair made from 100% pure oak wood with a natural finish." 
      },
      { 
        id: 2, 
        title: "Modern comfy chair", 
        price: "$420", 
        chairimage: chair02, 
        description: "A stylish modern chair with soft cushions designed for long sitting comfort." 
      },
      { 
        id: 3, 
        title: "Classic style chair", 
        price: "$380", 
        chairimage: chair03, 
        description: "Elegant traditional chair with fine detailing and a durable wooden frame." 
      },
      { 
        id: 4, 
        title: "Ergonomic chair", 
        price: "$450", 
        chairimage: chair04, 
        description: "Designed for maximum back support and posture alignment, ideal for office use." 
      },
    ],
  },
  {
    id: 2,
    chairs: [
      { 
        id: 5, 
        title: "Vintage chair", 
        price: "$370", 
        chairimage: chair05, 
        description: "Rustic vintage chair with an antique finish that adds charm to any room." 
      },
      { 
        id: 6, 
        title: "Office chair", 
        price: "$390", 
        chairimage: chair06, 
        description: "Comfortable office chair with adjustable height and smooth rolling wheels." 
      },
      { 
        id: 7, 
        title: "Gaming chair", 
        price: "$430", 
        chairimage: chair07, 
        description: "Ergonomic gaming chair with headrest, lumbar support, and a reclining feature." 
      },
      { 
        id: 8, 
        title: "Minimalist chair", 
        price: "$400", 
        chairimage: chair08, 
        description: "Simple and sleek design with a lightweight wooden frame and clean aesthetics." 
      },
    ],
  },
  {
    id: 3,
    chairs: [
      { 
        id: 9, 
        title: "Luxury chair", 
        price: "$480", 
        chairimage: chair09, 
        description: "High-end luxury chair with premium leather and a solid hardwood base." 
      },
      { 
        id: 10, 
        title: "Outdoor chair", 
        price: "$360", 
        chairimage: chair10, 
        description: "Durable weather-resistant outdoor chair, perfect for patios and gardens." 
      },
      { 
        id: 11, 
        title: "Folding chair", 
        price: "$300", 
        chairimage: chair11, 
        description: "Lightweight folding chair, portable and easy to store for flexible use." 
      },
      { 
        id: 12, 
        title: "Classic wooden chair", 
        price: "$410", 
        chairimage: chair12, 
        description: "A timeless wooden chair with a smooth finish and sturdy construction." 
      },
    ],
  },
  {
    id: 4,
    chairs: [
      { 
        id: 13, 
        title: "Luxury chair", 
        price: "$480", 
        chairimage: chair12, 
        description: "A deluxe luxury chair with an upholstered seat and elegant wooden arms." 
      },
      { 
        id: 14, 
        title: "Outdoor chair", 
        price: "$360", 
        chairimage: chair13, 
        description: "Stylish outdoor chair made with durable rattan and metal legs." 
      },
      { 
        id: 15, 
        title: "Folding chair", 
        price: "$300", 
        chairimage: chair04, 
        description: "Compact and foldable, perfect for events, picnics, or extra seating at home." 
      },
      { 
        id: 16, 
        title: "Classic wooden chair", 
        price: "$410", 
        chairimage: chair02, 
        description: "A beautifully crafted wooden chair that blends modern and classic style." 
      },
    ],
  },
];



export const latestProducts = [
  {
    id: 1,
    chairs: [
      { id: 1, title: "Pure Wooden Chair", price: "$350", chairimage: chair01 },
      { id: 2, title: "Modern Comfy Chair", price: "$420", chairimage: chair02 },
      { id: 3, title: "Classic Style Chair", price: "$380", chairimage: chair03 },
      { id: 4, title: "Ergonomic Chair", price: "$450", chairimage: chair04 },
      { id: 5, title: "Designer Chair", price: "$430", chairimage: chair05 },
      { id: 6, title: "Luxury Chair", price: "$480", chairimage: chair06 },
    ],
  },
  {
    id: 2,
    chairs: [
      { id: 7, title: "Vintage Chair", price: "$370", chairimage: chair07 },
      { id: 8, title: "Office Chair", price: "$390", chairimage: chair08 },
      { id: 9, title: "Gaming Chair", price: "$430", chairimage: chair09 },
      { id: 10, title: "Minimalist Chair", price: "$400", chairimage: chair10 },
      { id: 11, title: "Outdoor Chair", price: "$360", chairimage: chair11 },
      { id: 12, title: "Folding Chair", price: "$300", chairimage: chair12 },
    ],
  },
  {
    id: 3,
    chairs: [ 
      { id: 13, title: "Luxury Chair", price: "$480", chairimage: chair13 },
      { id: 14, title: "Classic Wooden Chair", price: "$410", chairimage: chair12 },
      { id: 15, title: "Comfort Chair", price: "$450", chairimage: chair11 },
      { id: 16, title: "Modern Chair", price: "$420", chairimage: chair10 },
      { id: 17, title: "Ergonomic Chair", price: "$440", chairimage: chair09 },
      { id: 18, title: "Designer Chair", price: "$430", chairimage: chair08 },
    ],
  },
  {
    id: 4,
    chairs: [
      { id: 19, title: "Gaming Chair", price: "$430", chairimage: chair07 },
      { id: 20, title: "Minimalist Chair", price: "$400", chairimage: chair06 },
      { id: 21, title: "Outdoor Chair", price: "$360", chairimage: chair05 },
      { id: 22, title: "Folding Chair", price: "$300", chairimage: chair04 },
      { id: 23, title: "Vintage Chair", price: "$370", chairimage: chair03 },
      { id: 24, title: "Office Chair", price: "$390", chairimage: chair02 },
    ],
  },
];

export const TopCategory = [
  {
    id: 1,
    chairs: [
      { 
        id: 101, 
        title: "Pure wooden chair", 
        price: "$350", 
        chairimage: chair01,
        description: "A timeless solid wood chair crafted with durability and classic elegance. Made from high-quality hardwood, this chair provides excellent support and longevity. Perfect for dining, living rooms, or as an accent piece, it combines functionality with sophisticated design, enhancing any interior setting with its natural beauty and smooth finish."
      },
      { 
        id: 102, 
        title: "Modern comfy chair", 
        price: "$420", 
        chairimage: chair02,
        description: "Soft cushioning with a sleek, contemporary design that offers ultimate comfort. Upholstered with premium fabric, this chair is perfect for relaxing after a long day or entertaining guests. Its ergonomic shape supports proper posture while maintaining a stylish modern look that complements any living space or office environment."
      },
      { 
        id: 103, 
        title: "Classic style chair", 
        price: "$380", 
        chairimage: chair03,
        description: "A traditional design that blends sophistication with everyday comfort. Crafted with a sturdy wooden frame and elegantly upholstered seating, this chair is ideal for formal dining rooms, libraries, or cozy reading nooks. Its refined look ensures it seamlessly fits with both modern and classic decor, making it a versatile home furniture piece."
      },
      { 
        id: 104, 
        title: "Ergonomic chair", 
        price: "$450", 
        chairimage: chair04,
        description: "Designed for maximum comfort and posture support, this ergonomic chair is perfect for work or study areas. Features include adjustable height, lumbar support, and a breathable backrest to reduce fatigue during long hours of sitting. Built with premium materials, it ensures durability while maintaining a sleek, professional appearance suitable for offices and home workspaces."
      },
    ],
  },
  {
    id: 2,
    chairs: [
      { 
        id: 105, 
        title: "Vintage chair", 
        price: "$370", 
        chairimage: chair05,
        description: "Retro-inspired design with intricate detailing and rich finishes. This chair brings a nostalgic charm to any living space while providing comfortable seating. Ideal for cafes, lounges, or home interiors that embrace vintage aesthetics, it adds character and a sense of history to your decor, making every seating experience memorable."
      },
      { 
        id: 106, 
        title: "Office chair", 
        price: "$390", 
        chairimage: chair06,
        description: "A professional, adjustable chair built for productivity and extended use. Features include a cushioned seat, ergonomic backrest, and smooth rolling casters for mobility. Perfect for home offices or corporate environments, this chair supports proper posture, reduces strain, and ensures a comfortable working experience throughout the day."
      },
      { 
        id: 107, 
        title: "Gaming chair", 
        price: "$430", 
        chairimage: chair07,
        description: "Ergonomically designed for gamers, this chair provides superior support during long gaming sessions. Equipped with adjustable armrests, headrest, and lumbar cushions, it enhances posture and comfort. Made with premium materials, it combines durability with stylish aesthetics, creating an immersive and enjoyable gaming environment."
      },
      { 
        id: 108, 
        title: "Minimalist chair", 
        price: "$400", 
        chairimage: chair08,
        description: "Clean lines and modern simplicity make this chair a perfect fit for minimalist homes or offices. Lightweight yet sturdy, it is crafted from durable materials and designed to complement contemporary interiors. Its sleek design emphasizes functionality without sacrificing elegance, making it a versatile choice for any space."
      },
    ],
  },
  {
    id: 3,
    chairs: [
      { 
        id: 109, 
        title: "Luxury chair", 
        price: "$480", 
        chairimage: chair09,
        description: "Premium build with stylish upholstery, designed to elevate the aesthetic of any room. With plush cushioning, refined stitching, and a durable frame, this luxury chair offers maximum comfort while serving as a statement piece. Perfect for upscale living rooms, offices, or lounges, it combines opulence with everyday usability."
      },
      { 
        id: 110, 
        title: "Outdoor chair", 
        price: "$360", 
        chairimage: chair10,
        description: "Durable and weather-resistant, this outdoor chair is ideal for patios, gardens, balconies, or poolside areas. Constructed with rust-resistant metal and UV-protected materials, it withstands harsh conditions while providing comfort and style. Its lightweight yet robust design ensures easy mobility and long-lasting performance outdoors."
      },
      { 
        id: 111, 
        title: "Folding chair", 
        price: "$300", 
        chairimage: chair11,
        description: "Lightweight, portable, and easy to store, this folding chair is a practical solution for extra seating during events or gatherings. Made with sturdy materials, it offers stability and convenience, while its compact foldable design allows effortless storage. Suitable for both indoor and outdoor use, it provides functionality without compromising style."
      },
      { 
        id: 112, 
        title: "Classic wooden chair", 
        price: "$410", 
        chairimage: chair12,
        description: "Traditional craftsmanship meets sturdy wood construction in this classic chair. Ideal for dining rooms, libraries, or offices, it offers both comfort and durability. The elegantly carved frame and polished finish make it a timeless piece that enhances the charm of any interior setting, providing a lasting investment in quality furniture."
      },
    ],
  },
];

export const  DiscountItem=[
    {
    id: 1,
    title: "20% Discount Of All Products",
    subtitle: "Eams Sofa Compact",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu eget feugiat habitasse nec, bibendum condimentum.",
    features: [
      "Material expose like metals",
      "Simple neutral colours.",
      "Clear lines and geomatric figures",
      "Material expose like metals",
    ],
    buttonText: "Shop Now",
    chairimage: DiscountChair,
  },
  {
    id: 2,
    title: "Exclusive Offer on Chairs",
    subtitle: "Modern Comfy Chair",
    description:
      "A blend of comfort and style with elegant curves and strong materials.",
    features: [
      "Premium wooden finish",
      "Soft cushioned seating",
      "Ergonomic back support",
      "Available in multiple colors",
    ],
    buttonText: "Shop Now",
    chairimage: DiscountChair,
  },
  {
    id: 3,
    title: "Classic Collection Discount",
    subtitle: "Classic Style Chair",
    description:
      "Inspired by timeless design, this chair is perfect for both modern and vintage spaces.",
    features: [
      "Durable solid wood",
      "Elegant neutral tones",
      "Comfortable padded seat",
      "Stylish retro vibe",
    ],
    buttonText: "Shop Now",
    chairimage: DiscountChair,
  },
];