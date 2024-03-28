import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import MyCourses from "./Pages/MyCourses";
import AboutUs from "./Pages/AboutUs";
import Contact from "./Pages/Contact";
import Footer from "./Components/Footer/Footer";
import ProductDisplay from './Components/ProductDisplay/ProductDisplay';


function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mycourses" element={<MyCourses />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path='/product' element={<ProductDisplay />}>
            <Route path=':productId' element={<ProductDisplay />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}
export default App;
