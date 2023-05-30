// FormInputComponents.tsx

import React, { useState } from "react";
import { FormInput } from "@formify-json/types-and-schemas";
import { RegisterOptions, Controller, useFormContext } from "react-hook-form";
import { TextField, Box, Typography, Slider, Rating } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import MicIcon from "@mui/icons-material/Mic";
import LinearProgress from "@mui/material/LinearProgress";

interface ControlledInputProps extends FormInput {
  children: (field: any, error: any) => JSX.Element;
}

export const ControlledInput: React.FC<ControlledInputProps> = ({
  name,
  validationRules,
  children,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={validationRules}
      render={({ field, fieldState: { error } }) => children(field, error)}
    />
  );
};

//import { validationRules } from './validationRules';

type InputLabelProps = Partial<FormInput>;

export const InputLabel: React.FC<InputLabelProps> = ({ name, label }) => {
  return name ? (
    <Typography htmlFor={name} component="label" variant="subtitle2">
      {label}
    </Typography>
  ) : null;
};

export interface InputComponentProps {
  id: string;
  title?: string;
  placeholder?: string;
  register: (name: string, options: RegisterOptions) => void;
  validation: any;
}

export const StarRatingInput: React.FC<FormInput> = (props) => {
  const { setValue, control } = useFormContext();

  const handleChange = (
    _event: React.ChangeEvent<{}>,
    newValue: number | null
  ) => {
    console.log("newValue", newValue);
    setValue(props.name, newValue || "", {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <Box mb={2}>
      <InputLabel name={props.name} label={props.label} />
      <Controller
        control={control}
        name={props.name}
        rules={props.validationRules}
        render={({ field, fieldState: { error } }) => (
          <>
            <Rating
              value={field.value || null}
              onChange={handleChange}
              size="large"
            />
            {error && <FormHelperText error>{error.message}</FormHelperText>}
          </>
        )}
      />
    </Box>
  );
};

interface MultimediaSuggestionInputProps extends FormInput {
  onAddPhoto?: () => void;
  onAddAudio?: () => void;
}

export const MultimediaSuggestionInput: React.FC<
  MultimediaSuggestionInputProps
> = (props) => {
  const [audio, setAudio] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [audioUploadProgress, setAudioUploadProgress] = useState(0);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);

  const handleAudioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setAudio(event.target.files[0]);
      uploadFile(event.target.files[0], "audio", setAudioUploadProgress);
    }
  };

  const handleImageChange = (event: any) => {
    setImage(event.target.files[0]);
    uploadFile(event.target.files[0], "image", setImageUploadProgress);
  };

  const uploadFile = async (
    file: File,
    type: "audio" | "image",
    setProgress: React.Dispatch<React.SetStateAction<number>>
  ) => {
    const response = await fetch(
      `http://localhost:3000/generate-upload-url?fileType=${type}`
    );
    const { signedUrl } = await response.json();

    const totalBytes = file.size;
    const reader = file.stream().getReader();
    let uploadProgress = 0;
    const uploadStream = new WritableStream({
      write: async (chunk) => {
        uploadProgress += chunk.length;
        setProgress((prevProgress) => prevProgress + chunk.length);
        const response = await fetch(signedUrl, {
          method: "PUT",
          body: chunk,
          headers: {
            "Content-Type": type === "audio" ? "audio/mpeg" : "image/jpeg",
            "Content-Range": `bytes ${uploadProgress}-${
              uploadProgress + chunk.length - 1
            }/${totalBytes}`,
          },
        });
        if (!response.ok) {
          throw new Error("Upload failed");
        }
      },
    });

    await reader
      .read()
      .then(({ value }) => uploadStream.getWriter().write(value));
  };

  return (
    <Box mb={2}>
      <InputLabel name={props.name} label={props.label} />
      <ControlledInput {...props}>
        {(field, error) => (
          <Box>
            <TextField
              {...field}
              fullWidth
              multiline
              rows={4}
              placeholder={props.placeholder}
              variant="outlined"
              error={!!error}
              helperText={error?.message}
            />
            <Box display="flex" justifyContent="flex-end" mt={1}>
              <IconButton
                color="primary"
                onClick={() => {
                  // @ts-ignore
                  document.querySelector("#image-upload").click();
                }}
              >
                <PhotoCameraIcon />
              </IconButton>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              <IconButton
                color="primary"
                onClick={() => {
                  // @ts-ignore
                  document.querySelector("#audio-upload").click();
                }}
              >
                <MicIcon />
              </IconButton>
              <input
                id="audio-upload"
                type="file"
                accept="audio/*"
                onChange={handleAudioChange}
                style={{ display: "none" }}
              />
            </Box>
            {audio && (
              <LinearProgress
                variant="determinate"
                value={(audioUploadProgress / audio.size) * 100}
              />
            )}
            {image && (
              <LinearProgress
                variant="determinate"
                value={(imageUploadProgress / image.size) * 100}
              />
            )}
          </Box>
        )}
      </ControlledInput>
    </Box>
  );
};

export const TextInput: React.FC<FormInput> = (props) => (
  <Box mb={2}>
    <InputLabel name={props.name} label={props.label} />
    <ControlledInput {...props}>
      {(field, error) => (
        <TextField
          {...field}
          fullWidth
          variant="outlined"
          error={!!error}
          helperText={error?.message}
        />
      )}
    </ControlledInput>
  </Box>
);

export const EmailInput: React.FC<FormInput> = (props) => (
  <Box mb={2}>
    <InputLabel name={props.name} label={props.label} />
    <ControlledInput {...props}>
      {(field, error) => (
        <TextField
          {...field}
          fullWidth
          variant="outlined"
          error={!!error}
          helperText={error?.message}
        />
      )}
    </ControlledInput>
  </Box>
);
//   const { setValue, control } = useFormContext()

//   const handleChange = (_event: React.ChangeEvent<{}>, newValue: number | null) => {
//     setValue(props.name, newValue || 0, {
//       shouldValidate: true,
//       shouldDirty: true,
//     })
//   }

//   const marks = [
//     { value: 0, label: 'Not likely' },
//     { value: 10, label: 'Very likely' },
//   ]

//   return (
//     <Box mb={2}>
//       <InputLabel name={props.name} label={props.label} />
//       <Controller
//         control={control}
//         name={props.name}
//         rules={props.validationRules}
//         render={({ field, fieldState: { error } }) => (
//           <>
//             <Slider
//               value={field.value || 0}
//               valueLabelDisplay='auto'
//               step={1}
//               min={0}
//               max={10}
//               onChange={handleChange}
//               marks={marks}
//             />
//             {error && <FormHelperText error>{error.message}</FormHelperText>}
//           </>
//         )}
//       />
//     </Box>
//   )
// }
// export const MobileNumberInput: React.FC<InputComponentProps> = (props) => (
//   <Box mb={2}>
//     <InputLabel id={props.id} title={props.title} />
//     <ControlledInput {...props}>
//       {(field, error) => (
//         <InputMask mask="+9 (999) 999-99-99" {...field} maskChar={null}>
//           {() => (
//             <TextField
//               fullWidth
//               variant="outlined"
//               error={!!error}
//               helperText={error?.message}
//             />
//           )}
//         </InputMask>
//       )}
//     </ControlledInput>
//   </Box>
// );

// export const LongTextInput: React.FC<InputComponentProps> = (props) => (
//   <Box mb={2}>
//     <InputLabel id={props.id} title={props.title} />
//     <ControlledInput {...props}>
//       {(field, error) => (
//         <TextareaAutosize
//           {...field}
//           minRows={4}
//           maxRows={8}
//           style={{
//             width: '100%',
//             padding: '8px',
//             borderRadius: '4px',
//             borderColor: error ? 'red' : ''
//           }}
//         />
//       )}
//     </ControlledInput>
//   </Box>
// );

// export const FileUploadInput: React.FC<InputComponentProps> = (props) => (
//   <Box mb={2}>
//     <InputLabel id={props.id} title={props.title} />
//     <ControlledInput {...props}>
//       {(field, error) => (
//         <TextField
//           {...field}
//           fullWidth
//           variant="outlined"
//           error={!!error}
//           helperText={error?.message}
//           type="file"
//         />
//       )}
//     </ControlledInput>
//   </Box>
// );

export const NpsInput: React.FC<FormInput> = (props) => {
  const { setValue, control } = useFormContext();
  console.log("props", props);
  const handleSliderChange = (
    _event: React.ChangeEvent<{}>,
    newValue: number | null
  ) => {
    setValue(props.name, newValue || 0, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const marks = [
    { value: 0, label: "Not likely" },
    { value: 10, label: "Very likely" },
  ];

  return (
    <Box mb={2}>
      <InputLabel name={props.name} label={props.label} />
      <Controller
        control={control}
        name={props.name}
        rules={props.validationRules}
        render={({ field, fieldState: { error } }) => (
          <>
            <Slider
              value={field.value || 0}
              valueLabelDisplay="auto"
              step={1}
              min={0}
              max={10}
              // @ts-ignore
              onChange={handleSliderChange}
              marks={marks}
            />
            {error && <FormHelperText error>{error.message}</FormHelperText>}
          </>
        )}
      />
    </Box>
  );
};
