import { createContext, useContext, useState, useEffect } from "react";

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

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem("token", true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    setWishlist([]);
    localStorage.removeItem("wishlist");
  };

  const addToWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const productExists = prevWishlist.some((item) => item.id === product.id);
      if (!productExists) {
        const updatedWishlist = [...prevWishlist, product];
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        return updatedWishlist;
      }
      return prevWishlist;
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prevWishlist) => {
      const updatedWishlist = prevWishlist.filter(
        (product) => product.id !== productId
      );
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      return updatedWishlist;
    });
  };

  useEffect(() => {
    const storedStatus = JSON.parse(localStorage.getItem("isLoggedIn"));
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist"));
    if (storedStatus) setIsLoggedIn(storedStatus);
    if (storedWishlist) setWishlist(storedWishlist);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
