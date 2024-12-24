import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import image from "../../assets/images/authImage.png";

const Signup = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const onSubmit = (data) => {
    fetch("http://localhost:3000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status !== "error") {
          console.log("Success:", data);
          localStorage.setItem("token", data.token);
          navigate("/login", { replace: true });
        }
        alert(data.message);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div className="grid sm:grid-cols-2 font-textFont text-xs mx-16 sm:mx-0">
      <img src={image} alt="sign up image" className="md:mt-10" />
      <div className="mx-auto">
        <h1 className="md:mt-28 font-headingsFont text-xl">
          Create an account
        </h1>
        <p>Enter your details below</p>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <input
            type="text"
            placeholder="Name"
            {...register("name", {
              required: {
                value: true,
                message: "Name is required",
              },
            })}
            className="outline-none border-black border-b-[1px] block py-3 w-full"
          />
          <p className="text-[#cc3d3d]">{errors.name?.message}</p>
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email format",
              },
            })}
            className="outline-none border-black border-b-[1px] block py-3 w-full"
          />
          <p className="text-[#cc3d3d]">{errors.email?.message}</p>
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: {
                value: true,
                message: "Password is required",
              },
              pattern: {
                value: /^[a-zA-Z0-9]{6,}$/,
                message: "Invalid password format",
              },
            })}
            className="outline-none border-black border-b-[1px] block py-3 w-full"
          />
          <p className="text-[#cc3d3d]">{errors.password?.message}</p>
          <button
            type="submit"
            className="mt-5 py-2 border-0 bg-[#DB4444] text-white rounded-md hover:bg-red-700 w-full"
          >
            Create Account
          </button>
          <p className="mt-5">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
