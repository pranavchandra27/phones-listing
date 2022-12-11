import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  CircularProgress,
  Grid,
  Container,
  Autocomplete,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import Stack from "@mui/material/Stack";
import axios from "axios";

const Calculations = () => {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    os: "",
    releaseYear: "",
    startScore: "",
    startPrice: "",
    condition: "",
    currency: {},
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [priceData, setPriceData] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(null);

  const [fieldErrors, setFieldErrors] = useState({});

  const API_URL = "https://softcamp.hu/webler/arkalkulator.php";

  useEffect(() => {
    (() => {
      axios
        .get(`https://api.coinstats.app/public/v1/fiats`)
        .then((res) => {
          setCurrencies(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, []);

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
            <Grid item xs={12} sm={6}>
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

            <Grid item xs={12} sm={6}>
              <Paper elevation={0}>
                <Box padding={2}>
                  <Typography variant="h5" align="center">
                    Phone Details
                  </Typography>

                  <Box mt={2}>
                    {priceData?.error ? (
                      <Typography align="center" color="error">
                        {priceData?.error}
                      </Typography>
                    ) : priceData?.data ? (
                      <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid xs={12}>
                          <Autocomplete
                            disablePortal
                            options={currencies}
                            value={selectedCurrency ? selectedCurrency : ""}
                            getOptionLabel={(option) =>
                              option ? option?.name : ""
                            }
                            size="small"
                            fullWidth
                            onChange={(_, newVal) => {
                              setSelectedCurrency(newVal);
                            }}
                            renderOption={(props, option) => (
                              <Box
                                component="li"
                                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                                {...props}
                              >
                                <img
                                  loading="lazy"
                                  width="20"
                                  src={option.imageUrl}
                                  srcSet={`${option.imageUrl} 2x`}
                                  alt=""
                                />
                                {option?.name}
                              </Box>
                            )}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                required
                                label="Change Currency"
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <b>Brand</b>: {priceData?.data?.brand}
                        </Grid>
                        <Grid item xs={6}>
                          <b>Model</b>: {priceData?.data?.model}
                        </Grid>
                        <Grid item xs={6}>
                          <b>OS</b>: {priceData?.data?.os}
                        </Grid>
                        <Grid item xs={6}>
                          <b>Release Year</b>: {priceData?.data?.releaseYear}
                        </Grid>
                        <Grid item xs={12}>
                          <b>Recommended Price</b>:{" "}
                          {selectedCurrency
                            ? selectedCurrency.symbol + " "
                            : "$ "}
                          {selectedCurrency
                            ? Math.floor(
                                selectedCurrency.rate *
                                  priceData?.data?.recommendedPrice
                              )
                            : priceData?.data?.recommendedPrice}
                        </Grid>

                        <Grid xs={12} sx={{ p: 2 }}>
                          <Typography variant="h6">Pricing</Typography>
                          <Grid container spacing={2}>
                            {priceData?.data.details.map(
                              ({ price, year }, index) => {
                                return (
                                  <React.Fragment key={index}>
                                    <Grid item xs={6}>
                                      <b>Price</b>:{" "}
                                      {selectedCurrency
                                        ? selectedCurrency.symbol + " "
                                        : "$ "}
                                      {selectedCurrency
                                        ? Math.floor(
                                            selectedCurrency.rate *
                                              priceData?.data?.recommendedPrice
                                          )
                                        : priceData?.data?.recommendedPrice}
                                    </Grid>
                                    <Grid item xs={6}>
                                      <b>Year</b>: {year}
                                    </Grid>
                                  </React.Fragment>
                                );
                              }
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                    ) : (
                      <Typography align="center">No information</Typography>
                    )}
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </LocalizationProvider>
  );
};

export default Calculations;
