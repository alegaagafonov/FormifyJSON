import React from "react";
import { TextField } from "@mui/material";
// @ts-ignore
const PhoneNumber = ({ label, placeholder, value, onChange }) => {
  return (
    <TextField
      fullWidth
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      variant="outlined"
    />
  );
};

export default PhoneNumber;
