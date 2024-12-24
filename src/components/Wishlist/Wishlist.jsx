// import { useAuth } from "../Auths/Auth";
import { FiTrash } from "react-icons/fi";
import image1 from "../../assets/images/aboutImage.png";
import image2 from "../../assets/images/authImage.png"
const wishlist = [
  {
    id: 1,
    image: image1,
    title: "a",
    price: "s",
  },
  {
    id: 2,
    image: image2,
    title: "a",
    price: "s",
  },
  {
    id: 3,
    image: image1,
    title: "a",
    price: "s",
  },
  {
    id: 4,
    image: image2,
    title: "a",
    price: "s",
  },
  {
    id: 5,
    image: image1,
    title: "a",
    price: "s",
  },
];

const Wishlist = () => {
  //   const { wishlist, removeFromWishlist } = useAuth();
  return (
    <>
      <div className="my-[50px] ml-16">Wishlist ({wishlist.length})</div>
      <div className="grid grid-cols-4 gap-5 mx-16">
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
              <button className="w-full text-xs py-1 bg-black text-white">
                Add To Cart
              </button>
              <p className="font-bold overflow-hidden max-h-5 overflow-ellipsis">{product.title}</p>
              <div>
                <p className="text-[#DB4444]">${product.price}</p>
                <button
                  className="absolute top-2 right-2"
                  //   onClick={() => {
                  //     removeFromWishlist(product);
                  //   }}
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
