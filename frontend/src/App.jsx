import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomeBeforeLogin from "./pages/HomeBeforeLogin";
import HomeAfterLogin from "./pages/HomeAfterLogin";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import UploadFiles from "./pages/UploadFiles";
import ContactUs from "./pages/ContactUs";

import InvestorLogin from './pages/InvestorLogin';
import InvestorSignup from './pages/InvestorSignup';
import InvestorDashboard from './pages/InvestorDashboard';

function App() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/investor/login" ||
    location.pathname === "/investor/signup";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<HomeBeforeLogin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/upload-files" element={<UploadFiles />} />
        <Route path="/ContactUs" element={<ContactUs />} />

        <Route path="/investor/login" element={<InvestorLogin />} />
        <Route path="/investor/signup" element={<InvestorSignup />} />
        <Route path="/investor/dashboard" element={<InvestorDashboard />} />

        <Route path="/home" element={<HomeAfterLogin />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
