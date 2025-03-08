import Products from "./Products";
import useFetch from "./useFetch";
import NewArrival from "./NewArrival";
import { FiTruck, FiHeadphones, FiLock } from "react-icons/fi";
import image1 from "../../assets/images/banner1.png";
import image2 from "../../assets/images/banner2.png";

const Home = () => {
  const {
    data: products,
    error,
    isPending,
  } = useFetch("https://fakestoreapi.com/products");
  return (
    <>
      <div>
        {isPending && (
          <div className="flex items-center justify-center mt-10">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2"></div>
          </div>
        )}
        {error && (
          <div className="font-headingsFont p-3 mt-20 text-5xl text-center">
            {error}
          </div>
        )}
        {products && (
          <Products
            products={products}
            banner={image1}
            ovrviewData="This Month"
            title="Best Selling Products"
          />
        )}
        {products && (
          <Products
            products={products}
            banner={image2}
            ovrviewData="Our Products"
            title="Explore Our Products"
          />
        )}
        {products && (
          <NewArrival
            products={products}
            ovrviewData="Featured"
            title="New Arrival"
          />
        )}
      </div>
      <div className="flex justify-center gap-10 mt-5">
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
    </>
  );
};

export default Home;
