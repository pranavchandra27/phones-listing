import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            onClick={() => navigate("/")}
            variant="h6"
            component="div"
            sx={{ cursor: "pointer", flexGrow: 1 }}
          >
            Phones
          </Typography>

          <Button
            color="inherit"
            onClick={() => {
              navigate("/products");
            }}
          >
            Products
          </Button>
          <Box mx={1} />
          <Button
            color="inherit"
            onClick={() => {
              navigate("/calculations");
            }}
          >
            Calculation
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
