import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useAuth } from "../Auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import image from "../../assets/images/authImage.png";

const Login = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const isAuthenticated = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    isAuthenticated();
  }, []);

  const onSubmit = (data) => {
    fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid credentials");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        localStorage.setItem("token", data.token);
        toast("Login Successful", { position: "top-center", type: "success" });
        setIsLoggedIn(true);
        navigate("/account", { replace: true });
      })
      .catch((error) => {
        console.log("Error:", error.message);
        toast(`An error occurred during login`, {
          position: "top-center",
          type: "error",
        });
      });
  };
  return (
    <div className="grid sm:grid-cols-2 font-textFont text-xs mx-16 sm:mx-0">
      <img src={image} alt="sign up visual" className="md:mt-10" />
      <div className="mx-auto">
        <h1 className="md:mt-28 font-headingsFont text-xl">
          Log in to E-commerce
        </h1>
        <p>Enter your details below</p>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <input
            type="text"
            placeholder="Username or Email"
            aria-label="Enter your username or email"
            {...register("username", {
              required: {
                value: true,
                message: "username or email is required",
              },
              minLength: {
                value: 3,
                message: "Minimum length is 3 characters",
              },
            })}
            className="outline-none border-black border-b-[1px] block py-3 w-full"
          />
          <p className="text-[#cc3d3d]">{errors.username?.message}</p>
          <input
            type="password"
            placeholder="Password"
            aria-label="Enter your password"
            {...register("password", {
              required: {
                value: true,
                message: "Password is required",
              },
            })}
            className="outline-none border-black border-b-[1px] block py-3 w-full"
          />
          <p className="text-[#cc3d3d]">{errors.password?.message}</p>
          <button
            type="submit"
            className="mt-5 py-2 border-0 bg-[#DB4444] text-white rounded-md hover:bg-red-700 w-full"
          >
            Log In
          </button>
          <p className="mt-5">
            Don't have an account?{" "}
            <Link to="/signup" className="underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
