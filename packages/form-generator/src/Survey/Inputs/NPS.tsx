import React from "react";
import { Slider, Typography } from "@mui/material";

// @ts-ignore
const NPS = ({ label, value, onChange }) => {
  return (
    <div>
      <Typography gutterBottom>{label}</Typography>
      <Slider
        value={value}
        // @ts-ignore
        onChange={(e, newValue) => onChange(newValue)}
        step={1}
        marks
        min={0}
        max={10}
      />
    </div>
  );
};

export default NPS;
