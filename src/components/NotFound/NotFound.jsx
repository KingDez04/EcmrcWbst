import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate("/");
  return (
    <>
      <div className="my-[50px] ml-16">
        <span className="text-[#0000006c]">Home / </span>404 Error
      </div>
      <div className="text-center p-3 mt-20 font-headingsFont">
        <h1 className="text-5xl md:text-7xl mb-3">404 Not Found</h1>
        <p>The page you visited was not found.</p>
        <button
          onClick={handleClick}
          className="mt-10 p-2 w-52 border-0 bg-[#DB4444] text-white rounded-md hover:bg-red-700"
        >
          Back to home page
        </button>
      </div>
    </>
  );
};

export default NotFound;
