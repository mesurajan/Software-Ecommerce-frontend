// src/components/Header.jsx
import React, { useState } from "react";
import { CiMail, CiSearch } from "react-icons/ci";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { BsCart } from "react-icons/bs";
import { FaChevronDown, FaRegUser } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../Apps/Reducers/UserSlice";
import hetkologo from "../assets/images/Home/logo.png";


function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = useSelector((state) => state.user.user);
  const cartCount = useSelector((state) => state.cart.count);
  const wishlistCount = useSelector((state) => state.wishlist.items.length);

  const dispatch = useDispatch();

  // ✅ Logout handler: clear session but stay on same page
  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
  };

  return (
    <div className="container">
      {/* Top Contact Bar */}
      <header className="text-sm ">
        <div className="bg-[#0A174E]">
          <div className="container flex flex-col gap-2 px-3 py-2 text-white md:flex-row md:justify-between md:items-center">
            {/* Left contact info */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-1 md:gap-4 cursor-pointer ">
                <CiMail />
                <a href="mailto:hetkofurniture@gmail.com">
                  <p>hetkofurniture@gmail.com</p>
                </a>
              </div>
              <div className="flex items-center gap-1">
                <MdOutlinePhoneInTalk className="cursor-pointer" />
                <a href="tel:+1234567890"> +977 9816413787</a>
              </div>
            </div>

            {/* Right side actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 md:justify-end">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1 cursor-pointer">
                  <p>English</p>
                  <FaChevronDown />
                </div>
                <div className="flex items-center gap-2">
                  <p>USD</p>
                  <FaChevronDown />
                </div>
                
                <div className="flex items-center gap-2">
                 <Link to="/wishlist">
                    <button className="flex items-center gap-1 relative">
                      <span>Wishlist</span>
                      <FaRegHeart />
                      {wishlistCount > 0 && (
                        <span className="absolute -top-2 -right-2 flex items-center justify-center h-4 w-4 text-xs text-white bg-red-500 rounded-full">
                          {wishlistCount}
                        </span>
                      )}
                    </button>
                  </Link>
                </div>
              </div>

                   {/* Cart */}
              <div className="relative h-[40px] w-[40px] md:h-[50px] md:w-[50px] flex items-center justify-center rounded cursor-pointer">
                <Link
                  to="/cart"
                  className="flex items-center justify-center w-full h-full"
                >
                  <BsCart />
                  {cartCount > 0 && (
                    <div className="absolute flex items-center justify-center h-4 w-4 text-xs text-white bg-red-500 rounded-full top-1 right-1">
                      {cartCount}
                    </div>
                  )}
                </Link>
              </div>

              {/* Login / Logout */}
              <button
                onClick={user ? handleLogout : undefined}
                className="flex items-center cursor-pointer hover:text-pink-500"
              >
                <p>{user ? "Logout" : <Link to="/login">Login</Link>}</p>
                <FaRegUser />
              </button>

         
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="container relative flex items-center justify-between px-3 py-2 mx-auto text-black bg-white">
          {/* Logo */}
          <h1 className="text-[25px] font-extrabold ml-0 text-[#0A174E]  flex items-center gap-2">
            <img src={hetkologo} alt="Hekto logo" className="w-6 h-6" />
            Hekto
          </h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-8 justify-end items-center flex-1 text-[12px] md:px-45 lg:px-45">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-[#0A174E] font-semibold border-b-2 border-[#0A174E] pb-1"
                    : "text-black hover:text-[#0A174E]"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="product"
                className={({ isActive }) =>
                  isActive
                    ? "text-[#0A174E] font-semibold border-b-2 border-[#0A174E] pb-1"
                    : "text-black hover:text-[#0A174E]"
                }
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="Blogs"
                className={({ isActive }) =>
                  isActive
                    ? "text-[#0A174E] font-semibold border-b-2 border-[#0A174E] pb-1"
                    : "text-black hover:text-[#0A174E]"
                }
              >
                Blogs
              </NavLink>
            </li>

               <li>
              <NavLink
                to="about"
                className={({ isActive }) =>
                  isActive
                    ? "text-[#0A174E] font-semibold border-b-2 border-[#0A174E] pb-1"
                    : "text-black hover:text-[#0A174E]"
                }
              >
                About Us
              </NavLink>
            </li>
        

            <li>
              <NavLink
                to="Contact"
                className={({ isActive }) =>
                  isActive
                    ? "text-[#0A174E] font-semibold border-b-2 border-[#0A174E] pb-1"
                    : "text-black hover:text-[#0A174E]"
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>

          {/* Search Bar - Desktop */}
          <div className="items-center justify-end flex-1 hidden max-w-xs gap-0 md:flex">
            <input
              type="text"
              className="w-full h-8 px-2 border-2 focus:outline-none"
              placeholder="Search..."
            />
            <div className="flex items-center justify-center h-8 px-3 cursor-pointer bg-[#0A174E]">
              <CiSearch color="white" size={20} />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="text-2xl md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="absolute left-0 z-50 w-full p-4 text-black bg-white shadow-md top-full md:hidden">
              <ul className="flex flex-col gap-4 text-sm text-center">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "text-[#0A174E] font-semibold border-b-2 border-[#0A174E] pb-1"
                        : "text-black hover:text-[#0A174E]"
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="product"
                    className={({ isActive }) =>
                      isActive
                        ? "text-[#0A174E] font-semibold border-b-2 border-[#0A174E] pb-1"
                        : "text-black hover:text-[#0A174E]"
                    }
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="Blogs"
                    className={({ isActive }) =>
                      isActive
                        ? "text-[#0A174E] font-semibold border-b-2 border-[#0A174E] pb-1"
                        : "text-black hover:text-[#0A174E]"
                    }
                  >
                    Blogs
                  </NavLink>
                </li>
                
                <li>
                  <NavLink
                    to="about"
                    className={({ isActive }) =>
                      isActive
                        ? "text-[#0A174E] font-semibold border-b-2 border-[#0A174E] pb-1"
                        : "text-black hover:text-[#0A174E]"
                    }
                  >
                    About US
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="Contact"
                    className={({ isActive }) =>
                      isActive
                        ? "text-[#0A174E] font-semibold border-b-2 border-[#0A174E] pb-1"
                        : "text-black hover:text-[#0A174E]"
                    }
                  >
                    Contact
                  </NavLink>
                </li>
              </ul>

              <div className="flex gap-2 mt-4">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-2 py-1 border rounded"
                />
                <button className="px-3 py-1 text-white rounded bg-background">
                  <CiSearch />
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>
    </div>
  );
}

export default Header;
