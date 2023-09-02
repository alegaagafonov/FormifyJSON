import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import useForm from "./useForm";
import { Project } from "@formify-json/types-and-schemas";
import { green } from "@mui/material/colors";
import useDisplayedInputs from "./useDisplayInputs";
import StarRating from "./Inputs/StarRating";
import MultimediaSuggestion from "./Inputs/MultimediaSuggestion";
import PhoneNumber from "./Inputs/PhoneNumber";
import { ShareAPIInput } from "./Inputs/ShareApi";
import NPS from "./Inputs/NPS";
import { Api } from "./index";
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
  project: Project;
  api: Api;
}

// export interface ShareInformation {
//   message: string;
//   url: string;
//   title: string;
// }

const Form: React.FC<FormProps> = ({
  thankYouPage,
  formInputs,
  initialValues = { nps: 5 },
  project,
  api,
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { values, handleChange, handleFileChange, handleSubmit } = useForm(
    initialValues,
    api
  );
  console.log("HEYBRO", values);
  const displayedInputs = useDisplayedInputs(formInputs, values);

  const handleInputChange = (name: string, newValue: any) => {
    const event = {
      target: {
        name,
        value: newValue,
      },
    } as React.ChangeEvent<HTMLInputElement>;
    handleChange(event);
  };

  const handleFormSubmit = () => {
    console.log("values", values);
    if (handleSubmit) {
      handleSubmit("hello");
    }
    setIsSubmitted(true);
  };

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

  if (isSubmitted) {
    // @ts-ignore
    console.log("project", project, values.nps);
    return (
      <Box>
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            "& .MuiTextField-root": { m: 1, width: "100%" },
            "& .MuiButton-root": { m: 2 },
            p: 3,
            bgcolor: "background.paper",
            my: 2,
            boxShadow: 1,
            boxSizing: "border-box",
          }}
        >
          {/* <Box
          sx={{
            width: "100%",

            borderRadius: 2,
            alignItems: "center",
          }}
        > */}
          <CheckCircleOutline sx={{ fontSize: 100, color: green[500] }} />
          <Typography variant="h4" component="h1" gutterBottom>
            {thankYouPage?.title || ""}
          </Typography>
          <Typography variant="h6" component="p" gutterBottom>
            {thankYouPage?.title || ""}
          </Typography>
        </Box>
        {values.nps < 7 && (
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
            {/* @ts-ignore */}

            <ShareAPIInput
              shareData={project.shareData}
              shareMeta={project.shareMeta}
            />
          </Box>
        )}
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
                  handleFileChange={handleFileChange}
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
                  api={api}
                  // @ts-ignore
                  placeholder={placeholder}
                  projectId={project._id}
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
