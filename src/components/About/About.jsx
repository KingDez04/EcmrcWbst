import {
  FiShoppingBag,
  FiDollarSign,
  FiGift,
  FiTruck,
  FiHeadphones,
  FiLock,
} from "react-icons/fi";
import { CiMoneyBill } from "react-icons/ci";
import image from "../../assets/images/aboutImage.png";

const About = () => {
  return (
    <>
      <div className="my-[50px] ml-16">
        <span className="text-[#0000006c]">Home / </span>About
      </div>
      <div className="ml-16 md:ml-0 flex flex-col mr-16 md:mr-0 gap-16">
        <div className="grid md:grid-cols-2 gap-5 font-textFont">
          <div className="md:ml-16 pt-24 text-sm leading-5">
            <h1 className="font-headingsFont text-3xl mb-5">Our Story</h1>
            <p>
              Launched in 2024, E-commerce website is West Africa's online
              shopping marketplace with an active presense in Nigeria. Supported
              by wide range of tailored marketing, data and service solutions,
              E-commerce website has 10,500 sallers and 300 brands and serves 3
              millioons customers across the region.
            </p>
            <br />
            <p>
              E-commerce website has more than 1 Million products to offer,
              growing at a very fast rate. E-commerce website offers a diverse
              assortment in categories ranging from consumer.
            </p>
          </div>
          <div>
            <img src={image} alt="Two female customers" />
          </div>
        </div>
        <div className="flex justify-center gap-5">
          <div className="hover:bg-[#DB4444] hover:text-white p-2 md:min-w-32 md:max-w-32 border-gray-400 border-[1px] text-center">
            <FiShoppingBag />
            <p className="font-bold">10.5k</p>
            <p className="text-xs">Active Sellers</p>
          </div>
          <div className="hover:bg-[#DB4444] hover:text-white p-2 md:min-w-32 md:max-w-32 border-gray-400 border-[1px] text-center">
            <FiDollarSign />
            <p className="font-bold">33k</p>
            <p className="text-xs">Monthly Product Sales</p>
          </div>
          <div className="hover:bg-[#DB4444] hover:text-white p-2 md:min-w-32 md:max-w-32 border-gray-400 border-[1px] text-center">
            <FiGift />
            <p className="font-bold">45.5k</p>
            <p className="text-xs">Active Customers</p>
          </div>
          <div className="hover:bg-[#DB4444] hover:text-white p-2 md:min-w-32 md:max-w-32 border-gray-400 border-[1px] text-center">
            <CiMoneyBill />
            <p className="font-bold">25k</p>
            <p className="text-xs">Annual gross sales</p>
          </div>
        </div>
        <div className="flex justify-center gap-10">
          <div className="text-center">
            <div className="flex justify-center">
              <FiTruck />
            </div>
            <p className="font-bold">FREE AND FAST DELIVERY</p>
            <p className="text-xs">Free delivery for all orders over #1000</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center">
              <FiHeadphones />
            </div>
            <p className="font-bold">24/7 CUSTOMER SERVICE</p>
            <p className="text-xs">Friendly 24/7 customer support</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center">
              <FiLock />
            </div>
            <p className="font-bold">MONEY BACK GUARANTEE</p>
            <p className="text-xs">We return money within 30 days</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
