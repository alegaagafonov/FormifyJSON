import React from "react";
import { Slider, Typography, Box } from "@mui/material";

const NPS = ({ label, value, onChange }) => {
  return (
    <Box>
      <Typography gutterBottom>{label}</Typography>
      <Slider
        value={value}
        valueLabelDisplay="auto"
        onChange={(_, newValue) => onChange(newValue)}
        step={1}
        min={0}
        max={10}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Typography>Not likely </Typography>
        <Typography>Very likely</Typography>
      </Box>
    </Box>
  );
};

export default NPS;
