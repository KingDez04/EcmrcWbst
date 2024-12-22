import { NavLink } from "react-router-dom";
import { FaShoppingCart, FaUser, FaHeart } from "react-icons/fa";

const NavBar = () => {
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
        <li>
          <NavLink
            to="/signup"
            className={({ isActive }) => (isActive ? "underline" : "")}
          >
            Sign Up
          </NavLink>
        </li>
        <div className="grid grid-cols-3 gap-5">
          <li>
            <NavLink
              to="/wishlist"
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              <FaHeart />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              <FaShoppingCart />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              <FaUser />
            </NavLink>
          </li>
        </div>
      </ul>
    </nav>
  );
};
export default NavBar;
