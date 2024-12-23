import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import { useAuth } from "../Auths/Auth";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  //   const { addToCheckout, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/api/cart", {
      method: "GET",
      headers: {
        Authorization: `${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text();
          console.error("Failed to fetch cart data:", errorText);
          throw new Error(errorText);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched Cart Data:", data);

        const fetchProductDetails = data.cart.map((id) =>
          fetch(`https://fakestoreapi.com/products/${id}`).then((res) =>
            res.json()
          )
        );

        Promise.all(fetchProductDetails)
          .then((products) => {
            console.log("Fetched Product Details:", products);
            setCartItems(products);
          })
          .catch((error) =>
            console.error("Error fetching product details:", error)
          );
      })
      .catch((error) => alert("Error fetching cart data: " + error.message));
  }, []);

  const handleRemoveItem = (productId) => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:3000/api/cart/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(errorText);
        }
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.id !== productId)
        );
      })
      .catch((error) =>
        alert("Error removing item from cart: " + error.message)
      );
  };

  const handleShop = () => navigate("/");

  const handleCheckout = () => {
    if (localStorage.getItem("token")) {
      // addToCheckout(cartItems);
      navigate("/checkout");
    } else {
      alert("Unauthorized access");
      navigate("/login");
    }
  };

  return (
    <>
      <div className="my-[50px] ml-16">
        <span className="text-[#0000006c]">Home / </span>Cart
      </div>
      <div className="text-xs mx-16 flex flex-col gap-5">
        <div className="shadow-md text-center grid grid-cols-4 p-3">
          <p>Product</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Subtotal</p>
        </div>
        <div className="shadow-md p-3">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div
                key={index}
                className="shadow-md text-center grid grid-cols-4 p-3 relative"
              >
                <div className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-h-5 max-w-5"
                  />
                  <p className="overflow-hidden overflow-ellipsis">
                    {item.title}
                  </p>
                </div>
                <p>{item.price}</p>
                <p>{item.quantity || 1}</p>
                <p>{item.price * (item.quantity || 1)}</p>
                <button
                  className="absolute top-2 right-2"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p className="text-center">Your cart is empty</p>
          )}
        </div>
        <div className="flex justify-between">
          <button
            className="border-[1px] border-black rounded-md p-2 font-semibold hover:bg-black hover:text-white"
            onClick={handleShop}
          >
            Return To Shop
          </button>
          <button
            className="p-2 border-0 bg-[#DB4444] text-white rounded-md hover:bg-red-700"
            onClick={handleCheckout}
          >
            Process to checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
