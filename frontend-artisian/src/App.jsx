import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import SearchResult from "./pages/SearchResult";
import { Dashboard } from "./components/Dashboard-Admin/DashBoard";
import ProductPage from "./pages/ProductPage";
import { Inventory } from "./components/Inventory/Inventory";
import { Orders } from "./components/Orders/Order";
import { AddProduct } from "./components/Inventory/AddProduct";
import Landingpage from "./pages/Landingpage";

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
