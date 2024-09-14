import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Certificates from "./pages/Certificates";
import AuthRoute from "./utils/AuthRoute";

const HeaderFooterWrapper = ({ children }) => {
  const location = useLocation();
  const hideHeaderFooter =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/Login" ||
    location.pathname === "/SignUp";

  return (
    <>
      {!hideHeaderFooter && <Header />}
      {children}
      {!hideHeaderFooter && <Footer />}
    </>
  );
};
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <HeaderFooterWrapper>
          <Routes>
            <Route path="/" element={<AuthRoute element={Home} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/about" element={<AuthRoute element={About} />} />
            <Route path="/contact" element={<AuthRoute element={Contact} />} />
            <Route
              path="/certificates"
              element={<AuthRoute element={Certificates} />}
            />
          </Routes>
        </HeaderFooterWrapper>
      </BrowserRouter>
    </div>
  );
}

export default App;
