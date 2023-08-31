import React from "react";
import { TextField } from "@mui/material";
// @ts-ignore
const MultimediaSuggestion = ({ label, placeholder, value, onChange }) => {
  return (
    <TextField
      fullWidth
      label={label}
      placeholder={placeholder}
      multiline
      rows={4}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      variant="outlined"
    />
  );
};

export default MultimediaSuggestion;
