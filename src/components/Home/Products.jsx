import { Link } from "react-router-dom";
import { FaGripVertical } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { useAuth } from "../Auth/AuthContext";

const Products = ({
  products,
  title = null,
  banner = null,
  ovrviewData = null,
}) => {
  const { addToWishlist, addToCart } = useAuth();
  return (
    <>
      <div className="flex justify-start object-scale-down mt-10">
        <img
          src={banner}
          alt="products banner"
          className="max-h-32 min-h-32 md:max-h-60 md:min-h-60 ml-16 my-5"
        />
      </div>
      <div className="ml-16 mb-5">
        <span className="text-[#DB4444] flex items-center gap-1">
          <FaGripVertical /> {ovrviewData}
        </span>
        <p className="font-headingsFont font-bold text-2xl">{title}</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 mx-16">
        {products.map((product, i) => (
          <div className="relative" key={product.id}>
            <Link to={`/products/${product.id}`}>
              <div className="object-scale-down flex justify-center bg-[#F5F5F5]">
                <img
                  src={product.image}
                  alt={`Image ${i + 1}`}
                  className="max-h-20 min-h-20 md:max-h-32 md:min-h-32"
                />
              </div>
            </Link>
            <button
              className="w-full text-xs py-1 bg-black text-white hover:bg-[#DB4444]"
              onClick={() => {
                addToCart(product);
              }}
            >
              Add To Cart
            </button>
            <p className="font-bold overflow-hidden max-h-6 overflow-ellipsis">
              {product.title}
            </p>
            <div>
              <p className="text-[#DB4444]">${product.price}</p>
              <button
                className="absolute top-2 right-2 hover:text-[#DB4444]"
                onClick={() => {
                  addToWishlist(product);
                }}
              >
                <FiHeart />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;
