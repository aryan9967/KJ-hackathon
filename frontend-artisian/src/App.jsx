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
import { AddProduct } from "./components/Inventory/AddProduct";

import Landingpage from "./pages/Landingpage";
import SearchPage from "./pages/SearchPage";




function App() {
  return (
    <Routes>

      <Route path="/" element={<Landingpage />} />
      <Route path="/product/:id" element={<ProductPage />}></Route>
      

      <Route path="/wishlist" element={<Wishlist />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/cart" element={<Cart />}></Route>
      <Route path="/searchresult" element={<SearchResult />}></Route>

      <Route path="/products" element={<ProductPage />}></Route>
     
      {/* <Route path="/connect" element={<CallPage />}></Route> */}
      <Route path="/admin" element={<Dashboard />} />
      <Route path="/admin/inventory" element={<Inventory />} />
      <Route path='/admin/orders' element={<Orders />} />      
      <Route path='/admin/add-product' element={<AddProduct />} />      

    </Routes>
  );
}

export default App;
