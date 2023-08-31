import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import useForm from "./useForm";
import useDisplayedInputs from "./useDisplayInputs";
import StarRating from "./Inputs/StarRating";
import MultimediaSuggestion from "./Inputs/MultimediaSuggestion";
import { FormInput } from "@formify-json/types-and-schemas";
import PhoneNumber from "./Inputs/PhoneNumber";
import NPS from "./Inputs/NPS";
import SaveButton from "./SaveButton";

export interface FormProps {
  formInputs: FormInput[];
  initialValues?: any;
  onSubmit?: (values: any) => void;
  thankYouPage: any;
}

export const Survey: React.FC<FormProps> = ({
  thankYouPage,
  formInputs = [],
  initialValues = {},
  onSubmit,
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { values, handleChange } = useForm(initialValues);
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
    <Box component="form" onSubmit={(e) => e.preventDefault()}>
      {displayedInputs.map((input: FormInput) => {
        const { name, label, type, placeholder } = input;
        // @ts-ignore
        const inputValue = values[name];
        switch (type) {
          case "starRating":
            return (
              <StarRating
                key={name}
                label={label}
                value={inputValue}
                onChange={(newValue: number) =>
                  handleInputChange(name, newValue)
                }
              />
            );
          case "multimediaSuggestion":
            return (
              <MultimediaSuggestion
                key={name}
                label={label}
                placeholder={placeholder}
                value={inputValue}
                onChange={(newValue: string) =>
                  handleInputChange(name, newValue)
                }
              />
            );
          case "phoneNumber":
            return (
              <PhoneNumber
                key={name}
                label={label}
                placeholder={placeholder}
                value={inputValue}
                onChange={(newValue: string) =>
                  handleInputChange(name, newValue)
                }
              />
            );
          case "nps":
            return (
              <NPS
                key={name}
                label={label}
                value={inputValue}
                onChange={(newValue: number) =>
                  handleInputChange(name, newValue)
                }
              />
            );
          default:
            return null;
        }
      })}
      {/* @ts-ignore */}
      <SaveButton isDisabled={false} onSave={handleFormSubmit} />
    </Box>
  );
};
