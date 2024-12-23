import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound/NotFound";
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import MobileNavBar from "./components/NavBar/MobileNavBar";
import Footer from "./components/Footer/Footer";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";
import Wishlist from "./components/Wishlist/Wishlist";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Home/ProductDetails";
import Cart from "./components/Cart/Cart";

const App = () => {
  return (
    <Router>
      <Header />
      <NavBar />
      <MobileNavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/" element={<Home />} />
        <Route path="/products/:product" element={<ProductDetails />} />
        <Route path="Cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
