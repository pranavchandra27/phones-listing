import { Routes, Route } from "react-router-dom";
import { Typography, Box } from "@mui/material";

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

        <Route
          path="*"
          element={
            <Box textAlign={"center"} mt={2}>
              <Typography variant="h2">Page Not Found</Typography>
            </Box>
          }
        />
      </Routes>
    </>
  );
}

export default App;
