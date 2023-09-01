import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import useForm from "./useForm";
import useDisplayedInputs from "./useDisplayInputs";
import StarRating from "./Inputs/StarRating";
import MultimediaSuggestion from "./Inputs/MultimediaSuggestion";
import PhoneNumber from "./Inputs/PhoneNumber";
import otpApi from "./optApi";
import NPS from "./Inputs/NPS";
import SaveButton from "./SaveButton";

// const inputTypeComponentMap = {
//   starRating: StarRating,
//   multimediaSuggestion: MultimediaSuggestion,
//   phoneNumber: PhoneNumber,
//   nps: NPS
// };

interface FormInput {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  displayCondition?: {
    questionId?: string;
    operator?: string;
    value?: any;
  };
}

export interface FormProps {
  formInputs: FormInput[];
  initialValues?: any;
  onSubmit?: (values: any) => void;
  thankYouPage: any;
}

const Form: React.FC<FormProps> = ({
  thankYouPage,
  formInputs,
  initialValues = {},
  onSubmit,
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { values, handleChange } = useForm(initialValues);
  console.log("HEYBRO", values);
  const displayedInputs = useDisplayedInputs(formInputs, values);

  const handleInputChange = (name: string, newValue: any) => {
    handleChange({ target: { name, value: newValue } });
  };

  const handleFormSubmit = () => {
    if (onSubmit) {
      onSubmit(values);
    }
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <Box>
        <Typography variant="h4">{thankYouPage.title}</Typography>
        <Typography variant="body1">{thankYouPage.message}</Typography>
      </Box>
    );
  }
  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& .MuiTextField-root": { m: 1, width: "100%" },
        "& .MuiButton-root": { m: 2 },
      }}
    >
      {displayedInputs.map((input) => {
        const { name, label, type, placeholder } = input;
        const inputValue = values[name];
        const commonBox = (
          <Box
            sx={{
              width: "100%",
              p: 3,
              bgcolor: "background.paper",
              my: 2,
              borderRadius: 2,
              boxShadow: 1,
              boxSizing: "border-box",
            }}
          >
            {/* Input component will be inserted here */}
          </Box>
        );

        switch (type) {
          case "starRating":
            return React.cloneElement(commonBox, {
              children: (
                <StarRating
                  key={name}
                  label={label}
                  value={inputValue}
                  onChange={(newValue) => handleInputChange(name, newValue)}
                />
              ),
            });
          case "multimediaSuggestion":
            return React.cloneElement(commonBox, {
              children: (
                // @ts-ignore
                <MultimediaSuggestion
                  key={name}
                  label={label}
                  placeholder={placeholder}
                  value={inputValue}
                  onChange={(newValue) => handleInputChange(name, newValue)}
                />
              ),
            });
          case "phoneNumber":
            return React.cloneElement(commonBox, {
              children: (
                <PhoneNumber
                  key={name}
                  label={label}
                  otpApi={otpApi}
                  // @ts-ignore
                  placeholder={placeholder}
                  value={inputValue}
                  onChange={(newValue) => handleInputChange(name, newValue)}
                />
              ),
            });
          case "nps":
            return React.cloneElement(commonBox, {
              children: (
                <NPS
                  key={name}
                  label={label}
                  value={inputValue}
                  onChange={(newValue) => handleInputChange(name, newValue)}
                />
              ),
            });
          default:
            return null;
        }
      })}
      {/* @ts-ignore */}
      <SaveButton isDisabled={false} onSave={handleFormSubmit} />
    </Box>
  );
};

export default Form;
