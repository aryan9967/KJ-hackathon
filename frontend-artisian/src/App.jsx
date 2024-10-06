import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import SearchResult from "./pages/SearchResult";
import { Dashboard } from "./components/Dashboard-Admin/DashBoard";
import ProductPage from "./pages/ProductPage";
import { Inventory } from "./components/Inventory/Inventory";
import Orders  from "./components/Orders/Order";
import { AddProduct } from "./components/Inventory/AddProduct";
import { Product } from "./components/Inventory/Product";
import Landingpage from "./pages/Landingpage";
import ProductDetail from "./pages/ProductDetail";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Landingpage />} />
      <Route path="/product/:id" element={<ProductDetail />}></Route>
      <Route path="/wishlist" element={<Wishlist />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/cart" element={<Cart />}></Route>
      <Route path="/searchresult" element={<SearchPage />}></Route>

      <Route path="/products" element={<ProductPage />}></Route>

      {/* <Route path="/connect" element={<CallPage />}></Route> */}
      <Route path="/admin" element={<Dashboard />} />
      <Route path="/admin/inventory" element={<Inventory />} />
      <Route path='/admin/orders' element={<Orders />} />      
      <Route path='/admin/add-product' element={<AddProduct />} />      
      <Route path='/admin/product' element={<Product />} />      

    </Routes>
  );
}

export default App;
