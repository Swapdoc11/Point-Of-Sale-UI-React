import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddProduct from "./pages/AddProduct";
import HomePage from "./pages/HomePage";
import POSPage from "./pages/POSPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/pos' element={<POSPage />} />
        <Route path='/addproduct' element={<AddProduct />} >Add Product</Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
