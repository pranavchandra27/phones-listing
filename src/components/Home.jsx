import React from "react";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { Smartphone, Calculate } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <Box mt={5}>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Paper
              sx={{ p: 2, cursor: "pointer" }}
              onClick={() => {
                navigate("/products");
              }}
            >
              <Box>
                <Smartphone fontSize="large" color="primary" />
              </Box>
              <Typography variant="h6" component={"h3"}>
                Products
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper
              sx={{ p: 2, cursor: "pointer" }}
              onClick={() => {
                navigate("/calculations");
              }}
            >
              <Box>
                <Calculate fontSize="large" color="primary" />
              </Box>
              <Typography variant="h6" component={"h3"}>
                Price Calculation
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
