// FormInputComponents.tsx
import { __assign, __awaiter, __generator } from "tslib";
import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField, Box, Typography, Slider, Rating } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import MicIcon from "@mui/icons-material/Mic";
import LinearProgress from "@mui/material/LinearProgress";
export var ControlledInput = function (_a) {
    var name = _a.name, validationRules = _a.validationRules, children = _a.children;
    var control = useFormContext().control;
    return (React.createElement(Controller, { name: name, control: control, rules: validationRules, render: function (_a) {
            var field = _a.field, error = _a.fieldState.error;
            return children(field, error);
        } }));
};
export var InputLabel = function (_a) {
    var name = _a.name, label = _a.label;
    return name ? (React.createElement(Typography, { htmlFor: name, component: "label", variant: "subtitle2" }, label)) : null;
};
export var StarRatingInput = function (props) {
    var _a = useFormContext(), setValue = _a.setValue, control = _a.control;
    var handleChange = function (_event, newValue) {
        console.log("newValue", newValue);
        setValue(props.name, newValue || "", {
            shouldValidate: true,
            shouldDirty: true
        });
    };
    return (React.createElement(Box, { mb: 2 },
        React.createElement(InputLabel, { name: props.name, label: props.label }),
        React.createElement(Controller, { control: control, name: props.name, rules: props.validationRules, render: function (_a) {
                var field = _a.field, error = _a.fieldState.error;
                return (React.createElement(React.Fragment, null,
                    React.createElement(Rating, { value: field.value || null, onChange: handleChange, size: "large" }),
                    error && React.createElement(FormHelperText, { error: true }, error.message)));
            } })));
};
export var MultimediaSuggestionInput = function (props) {
    var _a = useState(null), audio = _a[0], setAudio = _a[1];
    var _b = useState(null), image = _b[0], setImage = _b[1];
    var _c = useState(0), audioUploadProgress = _c[0], setAudioUploadProgress = _c[1];
    var _d = useState(0), imageUploadProgress = _d[0], setImageUploadProgress = _d[1];
    var handleAudioChange = function (event) {
        if (event.target.files && event.target.files.length > 0) {
            setAudio(event.target.files[0]);
            uploadFile(event.target.files[0], "audio", setAudioUploadProgress);
        }
    };
    var handleImageChange = function (event) {
        setImage(event.target.files[0]);
        uploadFile(event.target.files[0], "image", setImageUploadProgress);
    };
    var uploadFile = function (file, type, setProgress) { return __awaiter(void 0, void 0, void 0, function () {
        var response, signedUrl, totalBytes, reader, uploadProgress, uploadStream;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:3000/generate-upload-url?fileType=".concat(type))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    signedUrl = (_a.sent()).signedUrl;
                    totalBytes = file.size;
                    reader = file.stream().getReader();
                    uploadProgress = 0;
                    uploadStream = new WritableStream({
                        write: function (chunk) { return __awaiter(void 0, void 0, void 0, function () {
                            var response;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        uploadProgress += chunk.length;
                                        setProgress(function (prevProgress) { return prevProgress + chunk.length; });
                                        return [4 /*yield*/, fetch(signedUrl, {
                                                method: "PUT",
                                                body: chunk,
                                                headers: {
                                                    "Content-Type": type === "audio" ? "audio/mpeg" : "image/jpeg",
                                                    "Content-Range": "bytes ".concat(uploadProgress, "-").concat(uploadProgress + chunk.length - 1, "/").concat(totalBytes)
                                                }
                                            })];
                                    case 1:
                                        response = _a.sent();
                                        if (!response.ok) {
                                            throw new Error("Upload failed");
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); }
                    });
                    return [4 /*yield*/, reader
                            .read()
                            .then(function (_a) {
                            var value = _a.value;
                            return uploadStream.getWriter().write(value);
                        })];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement(Box, { mb: 2 },
        React.createElement(InputLabel, { name: props.name, label: props.label }),
        React.createElement(ControlledInput, __assign({}, props), function (field, error) { return (React.createElement(Box, null,
            React.createElement(TextField, __assign({}, field, { fullWidth: true, multiline: true, rows: 4, placeholder: props.placeholder, variant: "outlined", error: !!error, helperText: error === null || error === void 0 ? void 0 : error.message })),
            React.createElement(Box, { display: "flex", justifyContent: "flex-end", mt: 1 },
                React.createElement(IconButton, { color: "primary", onClick: function () {
                        // @ts-ignore
                        document.querySelector("#image-upload").click();
                    } },
                    React.createElement(PhotoCameraIcon, null)),
                React.createElement("input", { id: "image-upload", type: "file", accept: "image/*", onChange: handleImageChange, style: { display: "none" } }),
                React.createElement(IconButton, { color: "primary", onClick: function () {
                        // @ts-ignore
                        document.querySelector("#audio-upload").click();
                    } },
                    React.createElement(MicIcon, null)),
                React.createElement("input", { id: "audio-upload", type: "file", accept: "audio/*", onChange: handleAudioChange, style: { display: "none" } })),
            audio && (React.createElement(LinearProgress, { variant: "determinate", value: (audioUploadProgress / audio.size) * 100 })),
            image && (React.createElement(LinearProgress, { variant: "determinate", value: (imageUploadProgress / image.size) * 100 })))); })));
};
export var TextInput = function (props) { return (React.createElement(Box, { mb: 2 },
    React.createElement(InputLabel, { name: props.name, label: props.label }),
    React.createElement(ControlledInput, __assign({}, props), function (field, error) { return (React.createElement(TextField, __assign({}, field, { fullWidth: true, variant: "outlined", error: !!error, helperText: error === null || error === void 0 ? void 0 : error.message }))); }))); };
export var EmailInput = function (props) { return (React.createElement(Box, { mb: 2 },
    React.createElement(InputLabel, { name: props.name, label: props.label }),
    React.createElement(ControlledInput, __assign({}, props), function (field, error) { return (React.createElement(TextField, __assign({}, field, { fullWidth: true, variant: "outlined", error: !!error, helperText: error === null || error === void 0 ? void 0 : error.message }))); }))); };
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
export var NpsInput = function (props) {
    var _a = useFormContext(), setValue = _a.setValue, control = _a.control;
    console.log("props", props);
    var handleSliderChange = function (_event, newValue) {
        setValue(props.name, newValue || 0, {
            shouldValidate: true,
            shouldDirty: true
        });
    };
    var marks = [
        { value: 0, label: "Not likely" },
        { value: 10, label: "Very likely" },
    ];
    return (React.createElement(Box, { mb: 2 },
        React.createElement(InputLabel, { name: props.name, label: props.label }),
        React.createElement(Controller, { control: control, name: props.name, rules: props.validationRules, render: function (_a) {
                var field = _a.field, error = _a.fieldState.error;
                return (React.createElement(React.Fragment, null,
                    React.createElement(Slider, { value: field.value || 0, valueLabelDisplay: "auto", step: 1, min: 0, max: 10, 
                        // @ts-ignore
                        onChange: handleSliderChange, marks: marks }),
                    error && React.createElement(FormHelperText, { error: true }, error.message)));
            } })));
};
//# sourceMappingURL=FormInputs.js.map