import React from "react";
import { Typography } from "@mui/material";
import { FormInput } from "@formify-json/types-and-schemas";
type InputLabelProps = Partial<FormInput>;

export const InputLabel: React.FC<InputLabelProps> = ({ name, label }) => {
  return name ? (
    <Typography sx={{ mb: 2 }} variant="h6" gutterBottom>
      {label}
    </Typography>
  ) : null;
};
