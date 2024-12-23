import Products from "./Products";
import useFetch from "./useFetch";
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
          <div className="font-headingsFont p-3 mt-20 text-5xl text-center">
            Loading...
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
            title="Best Selling Products"
          />
        )}
        {products && (
          <Products
            products={products}
            banner={image2}
            title="Explore Our Products"
          />
        )}
      </div>
    </>
  );
};

export default Home;
