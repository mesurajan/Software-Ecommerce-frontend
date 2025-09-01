// import images (replace with your actual images)
import chair01 from "./images/chairs/chair01.png";
import chair02 from "./images/chairs/chair02.png";
import chair03 from "./images/chairs/chair03.png";
import chair04 from "./images/chairs/chair04.png";
import chair05 from "./images/chairs/chair05.png";
import chair06 from "./images/chairs/chair06.png";
import chair07 from "./images/chairs/chair07.png";
import chair08 from "./images/chairs/chair08.png";

import bed01 from "./images/beds/bed01.png";
import bed02 from "./images/beds/bed02.png";
import bed03 from "./images/beds/bed03.png";
import bed04 from "./images/beds/bed04.png";

import table01 from "./images/tables/table01.png";
import table02 from "./images/tables/table02.png";
import table03 from "./images/tables/table03.png";
import table04 from "./images/tables/table04.png";

import wardrobe01 from "./images/wardrobes/wardrobe01.png";
import wardrobe02 from "./images/wardrobes/wardrobe02.png";
import wardrobe03 from "./images/wardrobes/wardrobe03.png";
import wardrobe04 from "./images/wardrobes/wardrobe04.png";

export const Products = [
  // Chairs
  { id: 31, title: "Pure Wooden Chair", price: 4655, chairimage: chair01, category: "chairs", description: "Crafted from premium solid wood, this chair blends durability with timeless elegance. Its strong frame ensures years of use, while the polished finish adds sophistication. Ideal for dining, study, or lounge spaces, it brings warmth and style to any room effortlessly." },
  { id: 32, title: "Modern Comfy Chair", price: 5586, chairimage: chair02, category: "chairs", description: "Designed with superior comfort in mind, this modern chair features plush cushioning and supportive armrests. Its sleek, contemporary lines make it perfect for living rooms or lounges. The durable build ensures longevity, while the elegant design enhances any modern interior." },
  { id: 33, title: "Classic Style Chair", price: 5054, chairimage: chair03, category: "chairs", description: "This classic style chair combines refined craftsmanship with a timeless design that never goes out of fashion. Built with sturdy materials, it provides reliable support and comfort. Ideal for both traditional and modern homes, it adds a sophisticated charm to any decor." },
  { id: 34, title: "Ergonomic Chair", price: 5985, chairimage: chair04, category: "chairs", description: "Ergonomically designed to support your posture, this chair offers excellent lumbar support, reducing back strain during long hours. Its adjustable features ensure personalized comfort. Perfect for office or study spaces, it promotes productivity while keeping you relaxed and comfortable all day." },
  { id: 35, title: "Designer Chair", price: 5719, chairimage: chair05, category: "chairs", description: "A statement piece for any room, this designer chair combines aesthetics with comfort. Crafted with precision, it offers luxurious seating without compromising durability. Its contemporary design adds elegance, making it suitable for living spaces, offices, or lounges seeking a modern upgrade." },
  { id: 36, title: "Luxury Chair", price: 6384, chairimage: chair06, category: "chairs", description: "Experience the epitome of comfort with this luxury chair. Featuring premium cushioning, smooth fabric, and a refined silhouette, it elevates any room’s look. Built to last, this chair provides exceptional comfort, making it perfect for living rooms, bedrooms, or stylish offices." },
  { id: 37, title: "Vintage Chair", price: 4921, chairimage: chair07, category: "chairs", description: "Inspired by rustic charm, this vintage chair blends traditional craftsmanship with a cozy feel. The distressed wood finish highlights its antique appeal. Strong and reliable, it adds character to any setting, whether used in a dining area, study, or living room corner." },
  { id: 38, title: "Office Chair", price: 5187, chairimage: chair08, category: "chairs", description: "Designed for long working hours, this office chair combines ergonomic support with professional aesthetics. Featuring a cushioned seat, adjustable height, and durable wheels, it offers flexibility and comfort. Its sleek design ensures it fits seamlessly into any modern workspace with ease." },

  // Beds
  { id: 39, title: "Modern Bed", price: 10640, chairimage: bed01, category: "beds", description: "A minimalist modern bed built with strong wooden framing and premium finishing. The sleek lines create a calming ambiance, perfect for contemporary bedrooms. Its sturdy build ensures durability, while the smooth design offers both functionality and elegance for daily comfort and style." },
  { id: 40, title: "Classic Bed", price: 9975, chairimage: bed02, category: "beds", description: "Traditional craftsmanship meets durability in this classic bed. Featuring a strong wooden frame and timeless design, it adds warmth to your bedroom. Perfect for those who value elegance and comfort, this bed promises a restful sleep experience for many years to come." },
  { id: 41, title: "Luxury Bed", price: 10906, chairimage: bed03, category: "beds", description: "Sleep in luxury with this premium bed featuring elegant details and sturdy build. Designed to provide maximum comfort, it ensures restful nights and stylish mornings. Its refined craftsmanship and high-quality materials make it the perfect centerpiece for a sophisticated bedroom." },
  { id: 42, title: "Minimalist Bed", price: 10374, chairimage: bed04, category: "beds", description: "This minimalist bed offers simplicity and elegance for modern bedrooms. With clean lines and a space-saving design, it blends seamlessly into smaller rooms. Built with durability in mind, it provides both functionality and style, ensuring a calming and peaceful sleeping experience." },

  // Tables
  { id: 43, title: "Dining Table", price: 7980, chairimage: table01, category: "tables", description: "Gather family and friends around this spacious dining table. Crafted from durable wood, it offers both strength and elegance. Its polished finish ensures lasting beauty, making it the perfect centerpiece for family meals, celebrations, and everyday dining in any modern home." },
  { id: 44, title: "Coffee Table", price: 4655, chairimage: table02, category: "tables", description: "A compact yet stylish coffee table designed to complement any living room. With a sleek finish and sturdy build, it serves as both a practical and decorative piece. Perfect for holding books, drinks, or decor items, it enhances your space effortlessly and beautifully." },
  { id: 45, title: "Office Table", price: 5985, chairimage: table03, category: "tables", description: "Built for productivity, this office table combines modern aesthetics with durability. It offers ample space for laptops, documents, and essentials. With a professional design and sturdy structure, it transforms any workspace into an organized and efficient area for focused daily tasks." },
  { id: 46, title: "Side Table", price: 3990, chairimage: table04, category: "tables", description: "A versatile side table designed to fit seamlessly beside beds, sofas, or chairs. Compact yet functional, it provides storage and display options. With a polished surface and strong build, it balances practicality and elegance, making it a must-have addition to any home." },

  // Wardrobes
  { id: 47, title: "Modern Wardrobe", price: 9310, chairimage: wardrobe01, category: "wardrobes", description: "Organize your essentials with this modern wardrobe. Featuring spacious compartments and a sleek design, it offers both practicality and style. Built with durable materials, it ensures long-lasting use while adding elegance to your room. Perfect for keeping your clothes neat and tidy." },
  { id: 48, title: "Classic Wardrobe", price: 8645, chairimage: wardrobe02, category: "wardrobes", description: "This classic wardrobe is designed for those who appreciate timeless style. With strong construction and spacious compartments, it provides practical storage for daily needs. Its refined look enhances any bedroom, making it an ideal solution for organization without compromising aesthetic appeal." },
  { id: 49, title: "Luxury Wardrobe", price: 9576, chairimage: wardrobe03, category: "wardrobes", description: "A luxurious wardrobe that combines modern design with ample storage. Finished with fine detailing, it enhances any room while providing organized space for clothes and accessories. Built for durability, it ensures convenience, style, and sophistication in every corner of your home." },
  { id: 50, title: "Minimalist Wardrobe", price: 9044, chairimage: wardrobe04, category: "wardrobes", description: "Designed with simplicity, this minimalist wardrobe fits seamlessly into modern homes. It offers practical storage without overwhelming the space. With clean lines and a smooth finish, it balances function and elegance, making it ideal for smaller bedrooms or stylish contemporary interiors." },
];

// Trending Products (for big cards)
export const TrendingProduct = [
  { id: 1, title: "ErgoComfort Office Chair", price: 1724, chairimage: chair04, category: "chairs", description: "The ErgoComfort Office Chair is built to support long hours of productivity. With ergonomic lumbar support, adjustable height, and cushioned seating, it reduces strain while enhancing focus. Perfect for professionals seeking a balance of comfort, durability, and style in their workspace." },
  { id: 2, title: "Scandi Wooden Armchair", price: 2370, chairimage: chair05, category: "chairs", description: "Inspired by Scandinavian minimalism, this wooden armchair blends natural beauty with modern design. Strong yet elegant, it provides comfort with style. Perfect for living rooms or cozy corners, it creates a warm and inviting atmosphere that complements modern, rustic, or transitional interiors." },
  { id: 3, title: "Velvet Luxe Accent Chair", price: 2809, chairimage: chair06, category: "chairs", description: "A sophisticated velvet accent chair designed for luxury and relaxation. Its soft fabric and bold design make it a centerpiece in any room. Durable construction ensures long life, while its elegant appeal adds glamour to lounges, bedrooms, or upscale office spaces alike." },
  { id: 4, title: "Outdoor Patio Lounge Chair", price: 1263, chairimage: chair01, category: "chairs", description: "This weather-resistant lounge chair is perfect for outdoor spaces like patios and gardens. Built with durable materials, it withstands the elements while ensuring comfort. Its sleek yet sturdy design allows relaxation in style, making it an excellent addition to outdoor leisure areas." },
];

// Showcase Products (compact list on the right)
export const showcaseProducts = [
  { id: 5, title: "Executive Seat Chair", price: 4256, chairimage: chair01, category: "chairs", description: "Compact and professional, this executive seat chair is designed for comfort and everyday use. It provides reliable support for long hours while maintaining a sleek, modern appearance. Perfect for home offices or workstations, it combines durability with a stylish ergonomic design." },
  { id: 6, title: "Ergonomic Executive Chair", price: 4256, chairimage: chair04, category: "chairs", description: "Built for demanding professionals, this ergonomic executive chair ensures superior posture support and comfort. It features an adjustable height system, cushioned seating, and durable build quality. Its modern design makes it a great addition to office spaces where style and efficiency matter." },
  { id: 7, title: "Classic Office Chair", price: 4256, chairimage: chair08, category: "chairs", description: "A timeless office chair featuring strong construction and cushioned comfort. Its versatile design blends seamlessly into modern or traditional workspaces. Perfect for daily use, it provides durability and style, ensuring a practical seating solution that remains reliable over years of use." },
];
