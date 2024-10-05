import { Route, Router, Routes } from "react-router-dom";
import "./App.css";

import Chatbot from "./components/chatbot";
import Homepage from "./pages/Homepage";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import SearchResult from "./pages/SearchResult";
import { Dashboard } from "./components/Dashboard-Admin/DashBoard";
import Community from "./pages/Community";
import Education from "./pages/Education";
import AuthPage from "./pages/AuthPage";
import MedicalHistoryPage from "./pages/MedicalHistory";

import Caregiver from "./pages/Caregiver";
import Doctor from "./pages/Doctor";
import CallPage from "./pages/CallPage";
import { TodoProvider } from "./context/TodoContext";
import { AppointmentProvider } from "./context/AppointmentContext";
import { MedicationProvider } from "./context/MedicationContext";
import ProductPage from "./pages/ProductPage";

import { Inventory } from "./components/Inventory/Inventory";
import { Orders } from "./components/Orders/Order";

import Landingpage from "./pages/Landingpage";




function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/wishlist" element={<Wishlist />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/cart" element={<Cart />}></Route>
      <Route path="/searchresult" element={<SearchResult />}></Route>
      <Route path="/products" element={<ProductPage />}></Route>
    </Routes>
  );
}

export default App;
