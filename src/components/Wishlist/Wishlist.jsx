import { useAuth } from "../Auth/AuthContext";
import { FiTrash } from "react-icons/fi";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useAuth();
  return (
    <>
      <div className="my-[50px] ml-16">Wishlist ({wishlist.length})</div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mx-16">
        {wishlist &&
          wishlist.map((product, i) => (
            <div className="relative" key={product.id}>
              <div className="object-scale-down flex justify-center bg-[#F5F5F5]">
                <img
                  className="max-h-20 min-h-20 md:max-h-32 md:min-h-32 "
                  src={product.image}
                  alt={`Image ${i + 1}`}
                />
              </div>
              <button className="w-full text-xs py-1 bg-black text-white hover:bg-[#DB4444]">
                Add To Cart
              </button>
              <p className="font-bold overflow-hidden max-h-5 overflow-ellipsis">
                {product.title}
              </p>
              <div>
                <p className="text-[#DB4444]">${product.price}</p>
                <button
                  className="absolute top-2 right-2 hover:text-[#DB4444]"
                  onClick={() => removeFromWishlist(product.id)}
                >
                  <FiTrash />
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Wishlist;
