import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Courses from "./Pages/Courses";
import AboutUs from "./Pages/AboutUs";
import Contact from "./Pages/Contact";
import Footer from "./Components/Footer/Footer";
import ProductDisplay from './Components/ProductDisplay/ProductDisplay';
import Login from "./Components/Login/Login";


function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path='/product' element={<ProductDisplay />}>
            <Route path=':productId' element={<ProductDisplay />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}
export default App;
