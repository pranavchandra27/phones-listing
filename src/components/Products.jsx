import React, { useContext } from "react";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";

import PHONE_DATA from "../phones_schema.json";
import { PhoneContext } from "../context";

const Products = () => {
  const { setSelectedPhone, selectedPhone, selectedCurrency } =
    useContext(PhoneContext);
  return (
    <Box my={4}>
      <Container maxWidth="lg">
        <Grid container spacing={2} sx={{mt: 2}}>
          {PHONE_DATA.map((phone) => (
            <Grid item xs={12} md={6}>
              <Box
                component={Paper}
                key={phone.id}
                sx={{
                  background:
                    selectedPhone?.id === phone.id ? "#eeeeee" : "white",
                    mt: 2
                }}
              >
                <Grid
                  container
                  spacing={2}
                  sx={{ cursor: "pointer", p: 2}}
                  onClick={() => {
                    if (selectedPhone?.id === phone.id) {
                      setSelectedPhone(null);
                    } else {
                      setSelectedPhone(phone);
                    }
                  }}
                >
                  <Grid item xs={12} sm={5}>
                    <Box width={160} height={160}>
                      <img
                        style={{ height: "100%" }}
                        src={phone.imageURL}
                        srcSet={`${phone.imageURL}`}
                        alt={`${phone.brand} ${phone.model} (${phone.releaseYear})`}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <Typography variant="h6">
                      {phone.brand} {phone.model} ({phone.releaseYear})
                      {/* {phone.startPrice} */}
                    </Typography>
                    <Box>
                      <Typography>OS: {phone.os}</Typography>
                      <Typography>Score: {phone.score}</Typography>
                      <Box mt={3} sx={{ display: "flex" }}>
                        <sub style={{ fontSize: "1rem" }}>
                          {selectedCurrency.symbol}
                        </sub>
                        <Typography variant="h4">
                          {selectedCurrency?.name === "USD"
                            ? phone.startPrice
                            : Math.floor(
                                selectedCurrency.rate * phone.startPrice
                              )}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Products;
