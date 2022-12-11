import React, { useContext } from "react";
import { Box, Container, Paper, Typography } from "@mui/material";

import PHONE_DATA from "../phones_schema.json";
import { Stack } from "@mui/system";
import { PhoneContext } from "../context";

const Products = () => {
  const { setSelectedPhone } = useContext(PhoneContext);
  return (
    <Box mt={2}>
      <Container maxWidth="sm">
        <Stack spacing={2}>
          {PHONE_DATA.map((phone) => (
            <Paper key={phone.id}>
              <Box
                onClick={() => setSelectedPhone(phone)}
                sx={{ cursor: "pointer" }}
                padding={2}
              >
                <Typography variant="h6">
                  {phone.brand} {phone.model} ({phone.releaseYear}) - $
                  {phone.startPrice}
                </Typography>
                <Box>
                  <Typography>OS: {phone.os}</Typography>
                  <Typography>Score: {phone.score}</Typography>
                </Box>
              </Box>
            </Paper>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default Products;
