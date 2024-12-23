import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
// import { useAuth } from "../Auths/Auth";
import { useEffect } from "react";

const Account = () => {
  // const auth = useAuth();
  const navigate = useNavigate();
  const { register, setValue } = useForm();

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3000/api/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setValue("fName", data.profile.firstName || "");
          setValue("lName", data.profile.lastName || "");
          setValue("email", data.profile.email || "");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [setValue]);

  const handleLogout = () => {
    // auth.logout();
    navigate("/");
  };
  return (
    <>
      <div className="flex my-[50px] mx-16 justify-between">
        <div>
          <span className="text-[#0000006c]">Home / </span>My Account
        </div>
        <div>
          Welcome! <span className="text-[#DB4444]">{}</span>
        </div>
      </div>
      <div className="grid grid-flow-col ml-16 mr-5">
        <div className="flex flex-col gap-3">
          <div>
            <p className="font-headingsFont">Manage My Account</p>
            <div className="flex flex-col pl-7">
              <Link to="/account" className="hover:text-[#DB4444]">
                My Profile
              </Link>
              <Link>Address Book</Link>
              <Link to="/checkout" className="hover:text-[#DB4444]">
                My Payment Options
              </Link>
            </div>
          </div>
          <div>
            <p className="font-headingsFont">My Orders</p>
            <div className="flex flex-col pl-7">
              <Link>My Returns</Link>
              <Link>My Cancellations</Link>
            </div>
          </div>
          <div>
            <p className="font-headingsFont">My Wishlist</p>
          </div>
        </div>
        <div className="mt-24 p-10 shadow-md">
          <p className="font-headingsFont text-[#DB4444]">View Your Profile</p>
          <form noValidate className="grid grid-cols-2 gap-2">
            <div className="flex flex-col">
              <label htmlFor="fName">First Name</label>
              <input
                type="text"
                id="fName"
                className="p-1"
                disabled
                {...register("fName")}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lName">Last Name</label>
              <input
                type="text"
                id="lName"
                className="p-1"
                disabled
                {...register("lName")}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="p-1"
                disabled
                {...register("email")}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="********"
                className="p-1"
                disabled
                {...register("password")}
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
