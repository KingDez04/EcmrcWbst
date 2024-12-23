import { useParams, useNavigate } from "react-router-dom";
import { FaHeart, FaTruck, FaRecycle } from "react-icons/fa";
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
        addToCheckout(
          <>
            {products.title} : ${products.price}
          </>
        );
        navigate("/cart");
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  };

  return (
    <>
      <div className="my-[50px] ml-16">
        <span className="text-[#0000006c]">Home / </span>Product
      </div>
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
          <div className="grid grid-cols-2 gap-10 mx-16">
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
                  onClick={() => {
                    // addToWishlist(products);
                    navigate("/favourite");
                  }}
                >
                  <FaHeart />
                </button>
              </div>
              <div className="flex flex-col gap-0 text-xs">
                <div className="border-[1px] border-black py-1 px-2 flex gap-10">
                  <FaTruck />
                  <p>
                    Free Delivery <br />
                    Enter your postal code for Delivery Availability.
                  </p>
                </div>
                <div className="border-[1px] border-black py-1 px-2 flex gap-10">
                  <FaRecycle />
                  <p>
                    Return Delivery <br />
                    Free 30 Days Delivery Returns.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetails;
