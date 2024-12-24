import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../Auth/AuthContext";
import { useEffect, useState } from "react";

const Account = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { register, setValue } = useForm();
  const [userWelcome, setUserWelcome] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("https://fakestoreapi.com/users/6", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setValue("fName", data.name.firstname || "");
          setValue("lName", data.name.lastname || "");
          setValue("email", data.email || "");
          setValue(
            "address",
            `${data.address.number}, ${data.address.street}, ${data.address.city}` ||
              ""
          );
          setUserWelcome(`${data.name.firstname} ${data.name.lastname}`);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [setValue]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <div className="flex my-[50px] mx-16 justify-between">
        <div>
          <span className="text-[#0000006c]">Home / </span>My Account
        </div>
        <div>
          Welcome! <span className="text-[#DB4444]">{userWelcome}</span>
        </div>
      </div>
      <div className="grid grid-flow-col ml-16 mr-5">
        <div className="flex flex-col gap-3 text-[#0000006c]">
          <div>
            <p className="font-headingsFont text-black">Manage My Account</p>
            <div className="flex flex-col pl-7">
              <Link to="/account" className="hover:text-[#DB4444]">
                My Profile
              </Link>
              <Link className="hover:text-[#DB4444]">Address Book</Link>
              <Link to="/checkout" className="hover:text-[#DB4444]">
                My Payment Options
              </Link>
            </div>
          </div>
          <div>
            <p className="font-headingsFont text-black">My Orders</p>
            <div className="flex flex-col pl-7">
              <Link className="hover:text-[#DB4444]">My Returns</Link>
              <Link className="hover:text-[#DB4444]">My Cancellations</Link>
            </div>
          </div>
          <div>
            <p className="font-headingsFont text-black">My Wishlist</p>
            <div className="flex flex-col pl-7">
              <Link to="/wishlist" className="hover:text-[#DB4444]">
                My Wishlist
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-24 p-10 shadow-md">
          <p className="font-headingsFont text-[#DB4444] text-lg">
            View Your Profile
          </p>
          <form noValidate className="grid grid-cols-2 gap-2">
            <div className="flex flex-col">
              <label htmlFor="fName">First Name</label>
              <input
                type="text"
                id="fName"
                className="p-1 px-2 text-[#0000006c]"
                disabled
                {...register("fName")}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lName">Last Name</label>
              <input
                type="text"
                id="lName"
                className="p-1 px-2 text-[#0000006c]"
                disabled
                {...register("lName")}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="p-1 px-2 text-[#0000006c]"
                disabled
                {...register("email")}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                className="p-1 px-2 text-[#0000006c]"
                disabled
                {...register("address")}
              />
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="p-1 border-0 bg-[#DB4444] text-white rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Account;
