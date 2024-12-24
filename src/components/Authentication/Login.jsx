import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import image from "../../assets/images/authImage.png";

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const onSubmit = (data) => {
    fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw Error("Data doesn't exist");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        localStorage.setItem("token", data.token);
        navigate("/account", { replace: true });
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <div className="grid grid-cols-2 font-textFont text-xs">
      <img src={image} alt="sign up image" className="md:mt-10" />
      <div className="mx-auto">
        <h1 className="md:mt-28 font-headingsFont text-xl">
          Log in to E-commerce
        </h1>
        <p>Enter your details below</p>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <input
            type="text"
            placeholder="Username or Email"
            name="username"
            {...register("username", {
              required: {
                value: true,
                message: "username or email is required",
              },
            })}
            className="outline-none border-black border-b-[1px] block py-3 w-full"
          />
          <p className="text-[#cc3d3d]">{errors.username?.message}</p>
          <input
            type="password"
            placeholder="Password"
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
