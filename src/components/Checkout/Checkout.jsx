import { useAuth } from "../Auth/AuthContext";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FiDelete } from "react-icons/fi";

const Checkout = () => {
  const { cart, removeFromCart } = useAuth();
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [cartItems, setCartItems] = useState(cart);

  const onSubmit = (data) => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * (item.quantity || 1);
    });
    data["amount"] = total;

    fetch("http://localhost:3000/api/paystack/pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response.json());
          throw Error("An error occurred");
        }
        setCartItems((prevItems) => prevItems.filter((item) => item.id === -1));
        return response.json();
      })
      .then((data) => {
        window.location.href = data.authorization_url;
        console.log("Navigation attempted");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  return (
    <>
      <div className="my-[50px] ml-16">
        <span className="text-[#0000006c]">Home / </span>Checkout
      </div>
      <div className="mx-16 grid sm:grid-cols-2 gap-32 text-xs">
        <div className="checkoutForm">
          <p className="font-headingsFont text-2xl mb-5">Billing Details</p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3 text-[#0000006c] outline-none"
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="fName">First Name*</label>
              <input
                type="text"
                id="fName"
                className="bg-[#00000010] p-2 text-black outline-none"
                {...register("fName", {
                  required: { value: true, message: "First Name is required" },
                })}
              />
              <p className="text-[#cc3d3d]">{errors.fName?.message}</p>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="cName">Company Name</label>
              <input
                type="text"
                id="cName"
                className="bg-[#00000010] p-2 text-black outline-none"
                {...register("cName")}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="address">Street Address*</label>
              <input
                type="text"
                id="address"
                className="bg-[#00000010] p-2 text-black outline-none"
                {...register("address", {
                  required: {
                    value: true,
                    message: "Street Address is required",
                  },
                })}
              />
              <p className="text-[#cc3d3d]">{errors.address?.message}</p>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="apartment">
                Apartment, floor, etc. (optional)
              </label>
              <input
                type="text"
                id="apartment"
                className="bg-[#00000010] p-2 text-black outline-none"
                {...register("apartment")}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="city">Town/City*</label>
              <input
                type="text"
                id="city"
                className="bg-[#00000010] p-2 text-black outline-none"
                {...register("city", {
                  required: { value: true, message: "Town/City is required" },
                })}
              />
              <p className="text-[#cc3d3d]">{errors.city?.message}</p>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="num">Phone Number*</label>
              <input
                type="tel"
                id="num"
                className="bg-[#00000010] p-2 text-black outline-none"
                {...register("number", {
                  required: {
                    value: true,
                    message: "Phone Number is required",
                  },
                  pattern: {
                    value: /^[0-9]{10,}$/,
                    message: "Invalid number format",
                  },
                })}
              />
              <p className="text-[#cc3d3d]">{errors.number?.message}</p>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email Address*</label>
              <input
                type="email"
                id="email"
                className="bg-[#00000010] p-2 text-black outline-none"
                {...register("email", {
                  required: { value: true, message: "Email is required" },
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email format",
                  },
                })}
              />
              <p className="text-[#cc3d3d]">{errors.email?.message}</p>
            </div>
            <button className="py-2 border-0 bg-[#DB4444] text-white rounded-md hover:bg-red-700 max-w-[50%]">
              Place Order
            </button>
          </form>
        </div>
        <div>
          <p className="font-headingsFont text-2xl mb-5">Order Summary</p>
          <p>You have {cartItems.length} item(s) in your shopping cart.</p>
          {cartItems.length > 0 ? (
            <div className="flex flex-col gap-5">
              <p>Your Cart Items</p>
              <div className="shadow-md text-center grid grid-cols-4 p-3">
                <p>Product</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Subtotal</p>
              </div>
              {cartItems.map((item, index) => (
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
                  <p>${item.price}</p>
                  <p>{item.quantity || 1}</p>
                  <p>{String(item.price * (item.quantity || 1))}</p>
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="absolute top-2 left-2 text-[#DB4444] hover:text-red-700"
                  >
                    <FiDelete />
                  </button>
                </div>
              ))}
              <div className="shadow-md text-center flex justify-evenly p-3">
                <p>Total:</p>
                <p>${totalPrice}</p>
              </div>
            </div>
          ) : (
            <p className="shadow-md p-3 text-center">No items in your cart.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Checkout;
