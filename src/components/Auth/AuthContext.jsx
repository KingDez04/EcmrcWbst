import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem("token");
    return !!token;
  });

  const [wishlist, setWishlist] = useState(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist"));
    return storedWishlist || [];
  });

  const [cart, setCart] = useState(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    return storedCart || [];
  });

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem("token", true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    setWishlist([]);
    setCart([]);
    localStorage.removeItem("wishlist");
    localStorage.removeItem("cart");
  };

  const addToWishlist = (product) => {
    if (localStorage.getItem("token")) {
      setWishlist((prevWishlist) => {
        const productExists = prevWishlist.some(
          (item) => item.id === product.id
        );
        if (!productExists) {
          const updatedWishlist = [...prevWishlist, product];
          localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
          toast("Item added to wishlist", {
            position: "top-center",
            type: "success",
          });
          return updatedWishlist;
        }
        return prevWishlist;
      });
    } else {
      toast(
        "Unauthorized access. Please log in to add items to the wishlist.",
        { position: "top-center", type: "error" }
      );
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prevWishlist) => {
      const updatedWishlist = prevWishlist.filter(
        (product) => product.id !== productId
      );
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      toast("Item removed from wishlist", {
        position: "top-center",
        type: "info",
      });
      return updatedWishlist;
    });
  };

  const addToCart = (product) => {
    if (localStorage.getItem("token")) {
      setCart((prevCart) => {
        const productExists = prevCart.some((item) => item.id === product.id);
        if (!productExists) {
          const updatedCart = [...prevCart, product];
          localStorage.setItem("cart", JSON.stringify(updatedCart));
          toast("Item added to cart", {
            position: "top-center",
            type: "success",
          });
          return updatedCart;
        }
        return prevCart;
      });
    } else {
      toast("Unauthorized access. Please log in to add items to the cart.", {
        position: "top-center",
        type: "error",
      });
    }
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(
        (product) => product.id !== productId
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast("Item removed from cart", {
        position: "top-center",
        type: "info",
      });
      return updatedCart;
    });
  };

  useEffect(() => {
    const storedStatus = JSON.parse(localStorage.getItem("isLoggedIn"));
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist"));
    const storedCart = JSON.parse(localStorage.getItem("cart"));

    if (storedStatus) setIsLoggedIn(storedStatus);
    if (storedWishlist) setWishlist(storedWishlist);
    if (storedCart) setCart(storedCart);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        login,
        logout,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        cart,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
