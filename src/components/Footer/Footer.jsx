import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";

const Footer = () => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const onSubmit = (data) => {
    fetch("http://localhost:3000/api/contact", {
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
        navigate("/contact", { replace: true });
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <footer className="bg-black mt-20 text-[#FAFAFA] pt-10 pb-5 px-20 text-xs font-textFont">
      <div className=" grid grid-cols-4 gap-10 pb-10">
        <div className="flex flex-col gap-3">
          <p className="text-sm md:text-lg font-bold font-headingsFont">
            E-commerce
          </p>
          <p className="md:text-base font-semibold">Subscribe</p>
          <p>Get 10% off your first order</p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col"
          >
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: {
                  value: true,
                  message: "Required",
                },
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid format",
                },
              })}
              className="border-[#F5F5F5] border-[1px] rounded-sm bg-transparent outline-none p-1"
            />
            <p className="text-[#cc3d3d]">{errors.email?.message}</p>
            <button
              type="submit"
              className="relative translate-y-1 hover:text-[#c0c0c0]"
            >
              <FaArrowRight />
            </button>
          </form>
        </div>
        <div className="flex flex-col gap-3">
          <p className="md:text-base font-semibold">Support</p>
          <p>18, Lateef Musa street, Lagos.</p>
          <a
            href="mailto:desmondademeso@gmail.com"
            className="overflow-hidden overflow-ellipsis hover:text-[#c0c0c0]"
          >
            desmondademeso@gmail.com
          </a>
          <a
            href="tel:08149167007"
            className="overflow-hidden overflow-ellipsis hover:text-[#c0c0c0]"
          >
            08149167007
          </a>
        </div>
        <div className="flex flex-col gap-3">
          <p className="md:text-base font-semibold">Account</p>
          <Link to="/account" className="hover:text-[#c0c0c0]">
            My Account
          </Link>
          <p>
            <Link to="/login" className="hover:text-[#c0c0c0]">
              Login
            </Link>{" "}
            /{" "}
            <Link to="/signup" className="hover:text-[#c0c0c0]">
              Register
            </Link>
          </p>
          <Link to="/cart" className="hover:text-[#c0c0c0]">
            Cart
          </Link>
          <Link to="/wishlist" className="hover:text-[#c0c0c0]">
            Wishlist
          </Link>
          <Link to="/" className="hover:text-[#c0c0c0]">
            Shop
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          <p className="md:text-base font-semibold">Quick Link</p>
          <p>Privacy Policy</p>
          <p>Terms of Use</p>
          <p>FAQ</p>
          <Link to="/contact" className="hover:text-[#c0c0c0]">
            Contact
          </Link>
        </div>
      </div>
      <p className="text-[#505050] text-center mb-0">
        &#169; Copyright KingDez04 2024. All right reserved
      </p>
    </footer>
  );
};

export default Footer;
