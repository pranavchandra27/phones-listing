import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  CircularProgress,
  Grid,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { upperFirst, startCase } from "lodash";

import { PhoneContext } from "../context";

const Calculations = () => {
  const { selectedCurrency, selectedPhone } = useContext(PhoneContext);
  const [formData, setFormData] = useState({
    brand: selectedPhone?.brand || "",
    model: selectedPhone?.model || "",
    os: selectedPhone?.os || "",
    releaseYear: selectedPhone?.releaseYear || "",
    startScore: selectedPhone?.score || "",
    startPrice: selectedPhone?.startPrice || "",
    condition: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [priceData, setPriceData] = useState(null);

  const [fieldErrors, setFieldErrors] = useState({});

  const API_URL = "https://softcamp.hu/webler/arkalkulator.php";
  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    let params = "?";

    Object.keys(formData).forEach((param) => {
      if (formData[param]) {
        params = `${params}${param}=${formData[param]}&`;
      }
    });

    axios
      .get(`${API_URL}${params}`)
      .then((res) => {
        const data = res.data;
        setPriceData(data);

        console.log(res.data);
        setIsSubmitting(false);
      })
      .catch((err) => {
        setIsSubmitting(false);
        console.log(err);
      });
  };

  /**
   *
   * @param {React.ChangeEvent} e
   */
  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (name === "releaseYear") {
      value = parseInt(value);
      if (String(value).length > 4 || value < 0) return;
      if (!/(?:(?:20)[0-9]{2})/g.test(value) && !/\d{4}/g.test(value)) {
        if (value < 2012) {
          setFieldErrors((prevState) => ({
            ...prevState,
            [name]: "Year should not be older then 10 years from now",
          }));
        } else if (value > 2022) {
          setFieldErrors((prevState) => ({
            ...prevState,
            [name]: "Year should not be greater from now",
          }));
        }
      } else {
        setFieldErrors((prevState) => {
          if (prevState[name]) {
            delete prevState[name];
          }
          return prevState;
        });
      }
    } else if (name === "startScore") {
      value = parseInt(value);
      if (value < 1 || value > 10) return;
    } else if (name === "startPrice") {
      value = parseInt(value);
    } else if (name === "condition") {
      value = parseInt(value);
      if (value < 0 || value > 100) return;
    }

    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="md">
        <Box mt={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={priceData ? 6 : 12}>
              <Paper>
                <Box sx={{ padding: 2 }}>
                  <Typography align="center" variant="h4">
                    Calculate Price
                  </Typography>
                  <form onSubmit={handleSubmit}>
                    <Stack spacing={2} mt={2}>
                      <TextField
                        required
                        size="small"
                        name="brand"
                        label="Brand"
                        placeholder="Enter brand name eg. 'Apple'"
                        onChange={handleChange}
                        value={formData.brand}
                      />

                      <TextField
                        required
                        size="small"
                        name="model"
                        label="Model"
                        placeholder="Enter model name eg. 'iPhone 14'"
                        onChange={handleChange}
                        value={formData.model}
                      />

                      <TextField
                        required
                        size="small"
                        name="os"
                        label="OS"
                        placeholder="Android or IOS"
                        onChange={handleChange}
                        value={formData.os}
                      />

                      <TextField
                        required
                        size="small"
                        type="number"
                        name="releaseYear"
                        label="Release Year"
                        placeholder="Eg. 2022"
                        onChange={handleChange}
                        value={formData.releaseYear}
                        error={Boolean(fieldErrors["releaseYear"])}
                        helperText={
                          Boolean(fieldErrors["releaseYear"]) &&
                          fieldErrors["releaseYear"]
                        }
                      />

                      <TextField
                        required
                        size="small"
                        type="number"
                        name="startScore"
                        label="Start score"
                        placeholder="1 to 10"
                        onChange={handleChange}
                        value={formData.startScore}
                      />

                      <TextField
                        required
                        size="small"
                        type="number"
                        name="startPrice"
                        label="Start Price"
                        placeholder="Eg. 699 USD"
                        onChange={handleChange}
                        value={formData.startPrice}
                      />

                      <TextField
                        required
                        size="small"
                        type="number"
                        name="condition"
                        label="Condition"
                        placeholder="Eg. 80 as 80%"
                        onChange={handleChange}
                        value={formData.condition}
                      />

                      <Button
                        variant="contained"
                        type="submit"
                        disabled={isSubmitting}
                        disableElevation
                        startIcon={
                          isSubmitting && (
                            <CircularProgress color="inherit" size={20} />
                          )
                        }
                      >
                        Submit
                      </Button>
                    </Stack>
                  </form>
                </Box>
              </Paper>
            </Grid>

            {priceData && (
              <Grid item xs={12} sm={6}>
                <Paper elevation={1}>
                  <Box padding={2}>
                    <Typography variant="h5" align="center">
                      Phone Details
                    </Typography>

                    <Box mt={2}>
                      {priceData?.error ? (
                        <Typography align="center" color="error">
                          {upperFirst(priceData?.error)}
                        </Typography>
                      ) : priceData?.data ? (
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="h6">
                            {upperFirst(priceData?.data.brand)}{" "}
                            {upperFirst(priceData?.data.model)} (
                            {priceData?.data.releaseYear})
                            {/* {priceData?.data.startPrice} */}
                          </Typography>
                          <Box>
                            <Typography>OS: {priceData?.data.os}</Typography>
                            <Typography>
                              Score: {priceData?.data.score || "N/A"}
                            </Typography>

                            <Box mt={3}>
                              <Typography>Recommended Price:</Typography>
                              <Box sx={{ display: "flex" }}>
                                <sub style={{ fontSize: "1rem" }}>
                                  {selectedCurrency.symbol}
                                </sub>
                                <Typography variant="h4">
                                  {selectedCurrency?.name === "USD"
                                    ? priceData?.data.recommendedPrice
                                    : Math.floor(
                                        selectedCurrency.rate *
                                          priceData?.data.recommendedPrice
                                      )}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>

                          <Box mt={3}>
                            <Typography variant="h6">Pricing flow</Typography>
                            <TableContainer component={Paper}>
                              <Table
                                sx={{ minWidth: 200 }}
                                size="small"
                                aria-label="a dense table"
                              >
                                <TableHead>
                                  <TableRow>
                                    <TableCell>Year</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {priceData?.data.details.map(
                                    ({ price, year }) => (
                                      <TableRow
                                        key={year}
                                        sx={{
                                          "&:last-child td, &:last-child th": {
                                            border: 0,
                                          },
                                        }}
                                      >
                                        <TableCell component="th" scope="row">
                                          {year}
                                        </TableCell>
                                        <TableCell align="right">
                                          {selectedCurrency.symbol}
                                          {selectedCurrency === "USD"
                                            ? price
                                            : Math.floor(
                                                selectedCurrency.rate * price
                                              )}
                                        </TableCell>
                                      </TableRow>
                                    )
                                  )}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Box>
                        </Box>
                      ) : (
                        <Typography align="center">No information</Typography>
                      )}
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Box>
      </Container>
    </LocalizationProvider>
  );
};

export default Calculations;
