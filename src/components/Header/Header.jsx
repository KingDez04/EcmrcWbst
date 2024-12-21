import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-black text-[#FAFAFA] p-1 font-textFont text-sm text-center">
      Summer sale for all swim suits and free express delivery - OFF 50%!
      <Link to="/" className="underline font-semibold">
        {" "}
        ShopNow
      </Link>
    </div>
  );
};

export default Header;
