import { useParams, useNavigate } from "react-router-dom";
import { FiHeart, FiTruck, FiRepeat } from "react-icons/fi";
import { FaGripVertical } from "react-icons/fa";
// import { useAuth } from "../Auths/Auth";
import useFetch from "./useFetch";

const ProductDetails = () => {
  const { product } = useParams();
  //   const { addToCheckout, addToWishlist } = useAuth();
  const {
    data: products,
    error,
    isPending,
  } = useFetch("https://fakestoreapi.com/products/" + product);
  const { data: allProducts } = useFetch("https://fakestoreapi.com/products/");
  const relatedProducts =
    allProducts?.filter(
      (item) => item.category === products?.category && item.id !== products?.id
    ) || [];

  const navigate = useNavigate();

  const addToCart = () => {
    const token = localStorage.getItem("token");
    const cartItem = {
      productId: products.id,
      productName: products.title,
      price: products.price,
      quantity: 1,
    };
    fetch("http://localhost:3000/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(cartItem),
    })
      .then(async (response) => {
        if (!response.ok) {
          const text = await response.text();
          throw new Error(text);
        }
        return response.json();
      })
      .then((data) => {
        alert(data.message);
        // addToCheckout(
        //   <>
        //     {products.title} : ${products.price}
        //   </>
        // );
        navigate("/cart");
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  };

  return (
    <>
      {products && (
        <div className="my-[50px] ml-16 overflow-hidden overflow-ellipsis">
          <span className="text-[#0000006c]">{products.category} / </span>
          {products.title}
        </div>
      )}
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
          <div className="grid sm:grid-cols-2 gap-10 mx-16">
            <div className="object-scale-down flex items-center justify-center md:bg-[#F5F5F5]">
              <img
                src={products.image}
                alt={products.title}
                className="max-h-32 min-h-32 md:max-h-60 md:min-h-60"
              />
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-headingsFont font-bold">{products.title}</p>
              <p>${products.price}</p>
              <p className="text-xs">{products.description}</p>
              <hr className="border-black" />
              <div className="flex justify-between">
                <button
                  onClick={addToCart}
                  className="p-1 md:p-2 border-0 bg-[#DB4444] text-white rounded-md hover:bg-red-700"
                >
                  Buy Now
                </button>
                <button
                  className="hover:text-[#DB4444]"
                  onClick={() => {
                    // addToWishlist(products);
                    navigate("/wishlist");
                  }}
                >
                  <FiHeart />
                </button>
              </div>
              <div className="flex flex-col gap-0 text-xs">
                <div className="border-[1px] border-black py-1 px-2 flex gap-10">
                  <FiTruck />
                  <p>
                    Free Delivery <br />
                    Enter your postal code for Delivery Availability.
                  </p>
                </div>
                <div className="border-[1px] border-black py-1 px-2 flex gap-10">
                  <FiRepeat />
                  <p>
                    Return Delivery <br />
                    Free 30 Days Delivery Returns.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="ml-16 mb-5 mt-14 font-headingsFont">
          <span className="text-[#DB4444] flex items-center gap-1">
            <FaGripVertical className="text-2xl" /> Related Item
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-10 mx-16">
          {relatedProducts.slice(0, 4).map((relatedProduct) => (
            <div className="relative" key={relatedProduct.id}>
              <div className="object-scale-down flex justify-center bg-[#F5F5F5]">
                <img
                  className="max-h-20 min-h-20 md:max-h-32 md:min-h-32"
                  src={relatedProduct.image}
                  alt={relatedProduct.title}
                />
              </div>
              <button className="w-full text-xs py-1 bg-black text-white hover:bg-[#DB4444]">
                Add To Cart
              </button>
              <p className="font-bold overflow-hidden max-h-5 overflow-ellipsis">
                {relatedProduct.title}
              </p>
              <div>
                <p className="text-[#DB4444]">${relatedProduct.price}</p>
                <button
                  className="absolute top-2 right-2 hover:text-[#DB4444]"
                  onClick={() => {
                    //   addToWishlist(product);
                    navigate("/wishlist");
                  }}
                >
                  <FiHeart />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
