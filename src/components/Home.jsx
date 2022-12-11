import React from "react";
import { Stack, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <Box maxWidth={200} mx="auto" mt={5}>
      <Stack spacing={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            navigate("/products");
          }}
        >
          Products
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            navigate("/calculations");
          }}
        >
          Calculation
        </Button>
      </Stack>
    </Box>
  );
};

export default Home;
