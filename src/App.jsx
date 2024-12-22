import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound/NotFound";
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import MobileNavBar from "./components/NavBar/MobileNavBar";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";

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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
