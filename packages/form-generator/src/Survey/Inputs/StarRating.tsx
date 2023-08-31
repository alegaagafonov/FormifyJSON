import React from "react";
import { IconButton, Typography } from "@mui/material";
import Star from "@mui/icons-material/Star";
import StarBorder from "@mui/icons-material/StarBorder";

//@ts-ignore
const StarRating = ({ label, value, onChange }) => {
  return (
    <div>
      <Typography component="legend">{label}</Typography>
      <div>
        {[1, 2, 3, 4, 5].map((star) => (
          <IconButton
            key={star}
            color={star <= value ? "primary" : "default"}
            onClick={() => onChange(star)}
          >
            {star <= value ? <Star /> : <StarBorder />}
          </IconButton>
        ))}
      </div>
    </div>
  );
};

export default StarRating;
