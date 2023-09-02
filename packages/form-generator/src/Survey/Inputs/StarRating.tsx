import React from "react";
import { Box } from "@mui/material";
import Rating from "@mui/material/Rating";
import { InputLabel } from "./InputLabel";

const StarRating = ({ label, value, onChange }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <InputLabel name={label} label={label} />
      <Rating
        name="customized-empty"
        value={value}
        onChange={(_, newValue) => onChange(newValue)}
        sx={{
          "& .MuiRating-icon": {
            fontSize: "3rem", // Change this value to adjust the size
          },
        }}
      />
    </Box>
  );
};

export default StarRating;
