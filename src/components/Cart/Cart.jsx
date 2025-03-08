import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import { FiDelete } from "react-icons/fi";
import { toast } from "react-toastify";

const Cart = () => {
  const { cart, removeFromCart } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (localStorage.getItem("token")) {
      // addToCheckout(cartItems);
      navigate("/checkout");
    } else {
      toast("Unauthorized access", { position: "top-center", type: "error" });
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
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <div
                key={index}
                className="shadow-md text-center grid grid-cols-4 p-5 relative"
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
                <p>${item.price}</p>
                <p>{item.quantity || 1}</p>
                <p>{item.price * (item.quantity || 1)}</p>
                <button
                  className="absolute top-2 left-2 text-[#DB4444] hover:text-red-700"
                  onClick={() => removeFromCart(item.id)}
                >
                  <FiDelete />
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
            onClick={() => navigate("/")}
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
