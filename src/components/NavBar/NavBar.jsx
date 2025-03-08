import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { FiShoppingCart, FiHeart, FiUser, FiShoppingBag } from "react-icons/fi";
import { toast } from "react-toastify";

const NavBar = () => {
  const { logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLinkClick = () => {
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
    if (isLoggedIn) {
      toast("Logged out successfully", {
        position: "top-center",
        type: "success",
      });
      logout();
      navigate("/login");
    }
  };

  return (
    <nav
      className="py-6 hidden lg:flex justify-between font-textFont md:text-sm border-gray-400 border-b-[1px]"
      aria-label="Lead Navigation"
    >
      <h1 className="font-bold ml-16 text-2xl font-headingsFont">E-commerce</h1>
      <ul className="grid grid-cols-5 gap-14 whitespace-nowrap max-w-[698px] mr-16">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "underline" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "underline" : "")}
          >
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "underline" : "")}
          >
            About
          </NavLink>
        </li>
        {!isLoggedIn && (
          <li>
            <NavLink
              to="/signup"
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              Sign Up
            </NavLink>
          </li>
        )}
        <div className="grid grid-cols-3 gap-5 relative">
          <li>
            <NavLink
              to="/wishlist"
              className={({ isActive }) => (isActive ? "text-[#DB4444]" : "")}
            >
              <FiHeart />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) => (isActive ? "text-[#DB4444]" : "")}
            >
              <FiShoppingCart />
            </NavLink>
          </li>
          <li>
            <button
              onClick={toggleDropdown}
              className="relative"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              <FiUser />
            </button>
            {isDropdownOpen && (
              <ul
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-40 bg-gradient-to-br from-[#b0b0b0] to-[#505050] text-white shadow-lg rounded-md text-xs"
              >
                <li>
                  <NavLink
                    to="/account"
                    className="block px-4 py-2 hover:bg-[#909090]"
                    onClick={handleLinkClick}
                  >
                    <span className="flex items-center gap-1">
                      <FiUser /> Manage My Account
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/checkout"
                    className="block px-4 py-2 hover:bg-[#909090]"
                    onClick={handleLinkClick}
                  >
                    <span className="flex items-center gap-1">
                      <FiShoppingBag /> My Billing Details
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="block px-4 py-2 hover:bg-[#909090]"
                    onClick={handleLogout}
                  >
                    <span className="flex items-center gap-1">
                      <FaArrowRightToBracket /> Logout
                    </span>
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;
