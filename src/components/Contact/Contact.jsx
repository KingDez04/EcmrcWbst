import { useForm } from "react-hook-form";
import { FaPhone, FaEnvelope } from "react-icons/fa";

const Contact = () => {
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
    <>
      <div className="my-[50px] ml-16">
        <span className="text-[#0000006c]">Home / </span>Contact
      </div>
      <div className="grid gap-5 grid-flow-col font-textFont text-xs">
        <div className="ml-2 md:ml-16 flex flex-col gap-5 p-5 shrink shadow-md rounded-md">
          <p className="flex gap-5 font-bold font-headingsFont">
            <FaPhone /> Call Us
          </p>
          <p>We are available 24/7, 7 days a week.</p>
          <p>Phone: 08149167007</p>
          <hr className="border-black" />
          <p className="flex gap-5 font-bold font-headingsFont">
            <FaEnvelope /> Write To Us
          </p>
          <p>Fill out our form and we will contact you within 24 hours.</p>
          <p>Emails: desmondademeso@gmail.com</p>
          <p>Emails: support@ademeso.com</p>
        </div>
        <div className="p-5 shrink shadow-md rounded-md mr-2 md:mr-16">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col shrink gap-5"
          >
            <div className="flex flex-col md:justify-between md:flex-row gap-3 md:gap-0">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Name is required",
                    },
                  })}
                  className="bg-[#F5F5F5] outline-none p-2 md:p-3"
                />
                <p className="text-[#cc3d3d]">{errors.name?.message}</p>
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
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
                  className="bg-[#F5F5F5] outline-none p-2 md:p-3"
                />
                <p className="text-[#cc3d3d]">{errors.email?.message}</p>
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Your Phone"
                  {...register("number", {
                    required: {
                      value: true,
                      message: "Number is required",
                    },
                    pattern: {
                      value: /^[0-9]{10,}$/,
                      message: "Invalid number format",
                    },
                  })}
                  className="bg-[#F5F5F5] outline-none p-2 md:p-3"
                />
                <p className="text-[#cc3d3d]">{errors.number?.message}</p>
              </div>
            </div>
            <textarea
              placeholder="Your Message"
              {...register("message", {
                required: {
                  value: true,
                  message: "Message is required",
                },
              })}
              className="bg-[#F5F5F5] outline-none p-2 md:p-3 md:h-32"
            ></textarea>
            <p className="text-[#cc3d3d]">{errors.message?.message}</p>
            <button className="py-1 md:py-2 border-0 bg-[#DB4444] text-white rounded-md hover:bg-red-700">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
