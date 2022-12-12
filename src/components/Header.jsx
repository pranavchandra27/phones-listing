import React, { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { IconButton } from "@mui/material";
import { Home } from "@mui/icons-material";

import { PhoneContext } from "../context";
import { Stack } from "@mui/system";

const Header = () => {
  const navigate = useNavigate();
  const { selectedCurrency, setSelectedCurrency } = useContext(PhoneContext);
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const open = Boolean(anchorEl);

  console.log(location);

  useEffect(() => {
    axios.get("https://api.coinstats.app/public/v1/fiats").then((res) => {
      setCurrencies([
        {
          symbol: "$",
          rate: 1,
          name: "USD",
          imageUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvIJVNXA7-ELMXEh5_I6wVZVwfnrYtenf-qG_IQViC&s`,
        },
        ...res.data,
      ]);
    });
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexGrow: 1,
              alignItems: "center",
            }}
          >
            <Box
              onClick={() => navigate("/")}
              sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
            >
              <IconButton size="small" color="inherit">
                <Home />
              </IconButton>
              <Typography variant="h6" component="h2">
                SufniGSM
              </Typography>
            </Box>

            <Stack direction="row" spacing={2}>
              {location.pathname !== "/" && (
                <Button
                  size="large"
                  color="inherit"
                  onClick={() => {
                    navigate(
                      location.pathname.includes("products")
                        ? "/calculations"
                        : "/products"
                    );
                  }}
                >
                  {location.pathname.includes("products")
                    ? "Calculation"
                    : "Products"}
                </Button>
              )}
              <Button
                size="large"
                color="inherit"
                aria-haspopup="true"
                onClick={handleClick}
                startIcon={
                  <img
                    loading="lazy"
                    width="20"
                    style={{ borderRadius: "20%" }}
                    src={selectedCurrency?.imageUrl}
                    srcSet={`${selectedCurrency?.imageUrl} 2x`}
                    alt=""
                  />
                }
              >
                {selectedCurrency?.name}
              </Button>
            </Stack>
            <Menu
              sx={{ maxHeight: 200 }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              {currencies?.map((cur) => (
                <MenuItem
                  key={cur}
                  onClick={() => {
                    setSelectedCurrency(cur);
                    handleClose();
                  }}
                >
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  >
                    <img
                      loading="lazy"
                      width="20"
                      src={cur?.imageUrl}
                      srcSet={`${cur?.imageUrl} 2x`}
                      alt=""
                    />
                    {cur?.name}
                  </Box>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
