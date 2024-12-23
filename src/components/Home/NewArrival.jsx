import { FaGripVertical } from "react-icons/fa";

const NewArrival = ({ products, title = null, ovrviewData = null }) => {
  return (
    <>
      <div className="ml-16 mb-5 mt-10">
        <span className="text-[#DB4444] flex items-center gap-1">
          <FaGripVertical /> {ovrviewData}
        </span>
        <p className="font-headingsFont font-bold text-2xl">{title}</p>
      </div>
      <div className="grid grid-cols-2 gap-10 mx-16">
        <div className="row-span-2">
          <div className="object-scale-down flex justify-center">
            <img src={products[13].image} alt={products[13].description} />
          </div>
          <p className="font-bold overflow-hidden max-h-6 overflow-ellipsis">
            {products[13].title}
          </p>
        </div>
        <div className="grid grid-rows-2 gap-5">
          <div>
            <div className="object-scale-down flex justify-center">
              <img
                src={products[12].image}
                alt={products[12].description}
                className="max-h-20 min-h-20 md:max-h-32 md:min-h-32"
              />
            </div>
            <p className="font-bold overflow-hidden max-h-6 overflow-ellipsis">
              {products[12].title}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10">
            <div>
              <div className="object-scale-down flex justify-center">
                <img
                  src={products[10].image}
                  alt={products[10].description}
                  className="max-h-20 min-h-20 md:max-h-32 md:min-h-32"
                />
              </div>
              <p className="font-bold overflow-hidden max-h-6 overflow-ellipsis">
                {products[10].title}
              </p>
            </div>
            <div>
              <div className="object-scale-down flex justify-center">
                <img
                  src={products[9].image}
                  alt={products[9].description}
                  className="max-h-20 min-h-20 md:max-h-32 md:min-h-32"
                />
              </div>
              <p className="font-bold overflow-hidden max-h-6 overflow-ellipsis">
                {products[9].title}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewArrival;
