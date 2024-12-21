import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";

const MobileNavBar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav((prevNav) => !prevNav);
  };

  const handleCloseNav = () => {
    setNav(false);
  };

  return (
    <nav className=" m-6 relative z-50 block lg:hidden font-textFont">
      <div className="flex items-center justify-between w-full">
        <h1 className="font-bold">E-commerce</h1>
        {!nav && (
          <div onClick={handleNav} className="cursor-pointer z-50">
            <AiOutlineMenu size={35} />
          </div>
        )}
      </div>

      <div
        className={
          nav
            ? "fixed left-0 top-0 w-[50%] h-full bg-[#ffffff] ease-in-out duration-500 z-40"
            : "fixed top-0 left-[-100%] h-full ease-in-out duration-500"
        }
      >
        <div className="flex justify-end px-4 pt-9">
          <CgClose
            size={35}
            className="cursor-pointer text-black z-50 "
            onClick={handleNav}
          />
        </div>

        <ul className="px-2 pt-[5rem] text-black space-y-8 text-[20px]">
          <li className="py-5 px-4 hover:bg-[#5b5b5b] rounded-sm">
            <Link to="/" onClick={handleCloseNav}>
              Home
            </Link>
          </li>
          <li className="py-5 px-4 hover:bg-[#5b5b5b] rounded-sm">
            <Link to="/contact" onClick={handleCloseNav}>
              Contact
            </Link>
          </li>
          <li className="py-5 px-4 hover:bg-[#5b5b5b] rounded-sm">
            <Link to="/about" onClick={handleCloseNav}>
              About
            </Link>
          </li>
          <li className="py-5 px-4 hover:bg-[#5b5b5b] rounded-sm">
            <Link to="/signup" onClick={handleCloseNav}>
              Sign Up
            </Link>
          </li>
          <li className="py-5 px-4 hover:bg-[#5b5b5b] rounded-sm">
            <Link to="/wishlist" onClick={handleCloseNav}>
              Wishlist
            </Link>
          </li>
          <li className="py-5 px-4 hover:bg-[#5b5b5b] rounded-sm">
            <Link to="/cart" onClick={handleCloseNav}>
              Cart
            </Link>
          </li>
          <li className="py-5 px-4 hover:bg-[#5b5b5b] rounded-sm">
            <Link to="/profile" onClick={handleCloseNav}>
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MobileNavBar;
