import React, { useState } from "react";
import { TextField } from "@mui/joy";
import { Box, Typography, Paper } from "@mui/material";

const Calculations = () => {
  const [formData, setFormData] = useState({
    brand: "",
    modul: "",
    os: "",
    releaseYear: "",
    startScore: "",
    startPrice: "",
    condition: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log();
  };

  const handleChange = () => {};

  return (
    <Box sx={{ maxWidth: "400px", mx: "auto", mt: 5 }}>
      <Paper>
        <Box sx={{ padding: 2 }}>
          <Typography align="center" variant="h4">
            Calculate Price
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ marginTop: 2 }} />
            <TextField
              placeholder="Brand"
              onChange={handleChange}
              value={formData.brand}
            />
            <Box sx={{ marginTop: 2 }} />
            <TextField
              placeholder="Model"
              onChange={handleChange}
              value={formData.model}
            />
            <Box sx={{ marginTop: 2 }} />
            <TextField
              placeholder="OS"
              onChange={handleChange}
              value={formData.os}
            />
            <Box sx={{ marginTop: 2 }} />
            <TextField
              placeholder="Release year"
              onChange={handleChange}
              value={formData.releaseYear}
            />
            <Box sx={{ marginTop: 2 }} />
            <TextField
              placeholder="Start score"
              onChange={handleChange}
              value={formData.startScore}
            />
            <Box sx={{ marginTop: 2 }} />
            <TextField
              placeholder="Start price"
              onChange={handleChange}
              value={formData.startPrice}
            />
            <Box sx={{ marginTop: 2 }} />
            <TextField
              placeholder="Condition"
              onChange={handleChange}
              value={formData.condition}
            />
          </form>
        </Box>
      </Paper>
    </Box>
  );
};

export default Calculations;
