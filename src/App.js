import { Routes, Route } from "react-router-dom";
import Calculations from "./components/Calculations";

import Header from "./components/Header";
import Home from "./components/Home";
import Products from "./components/Products";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/calculations" element={<Calculations />} />
      </Routes>
    </>
  );
}

export default App;
