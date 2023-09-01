import React from "react";
import { Box, TextareaAutosize } from "@mui/material";
import { InputLabel } from "./InputLabel";
import UploadButton from "../FileUpload";

type MultimediaSuggestionProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (newValue: string) => void;
  formData: FormData;
};

const MultimediaSuggestion: React.FC<MultimediaSuggestionProps> = ({
  label,
  placeholder,
  value,
  onChange,
  formData,
}) => {
  return (
    <Box>
      <InputLabel name={label} label={label} />
      <TextareaAutosize
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        minRows={4}
        style={{ width: "100%", borderColor: "#D3D3D3" }}
      />
      <Box display="flex" justifyContent="space-between">
        <UploadButton formData={formData} type="image" />
        <UploadButton formData={formData} type="audio" />
      </Box>
    </Box>
  );
};

export default MultimediaSuggestion;
