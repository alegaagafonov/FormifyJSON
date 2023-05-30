"use strict";
// FormInputComponents.tsx
exports.__esModule = true;
exports.NpsInput = exports.EmailInput = exports.TextInput = exports.MultimediaSuggestionInput = exports.StarRatingInput = exports.InputLabel = exports.ControlledInput = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_hook_form_1 = require("react-hook-form");
var material_1 = require("@mui/material");
var FormHelperText_1 = tslib_1.__importDefault(require("@mui/material/FormHelperText"));
var IconButton_1 = tslib_1.__importDefault(require("@mui/material/IconButton"));
var PhotoCamera_1 = tslib_1.__importDefault(require("@mui/icons-material/PhotoCamera"));
var Mic_1 = tslib_1.__importDefault(require("@mui/icons-material/Mic"));
var LinearProgress_1 = tslib_1.__importDefault(require("@mui/material/LinearProgress"));
var ControlledInput = function (_a) {
    var name = _a.name, validationRules = _a.validationRules, children = _a.children;
    var control = (0, react_hook_form_1.useFormContext)().control;
    return (react_1["default"].createElement(react_hook_form_1.Controller, { name: name, control: control, rules: validationRules, render: function (_a) {
            var field = _a.field, error = _a.fieldState.error;
            return children(field, error);
        } }));
};
exports.ControlledInput = ControlledInput;
var InputLabel = function (_a) {
    var name = _a.name, label = _a.label;
    return name ? (react_1["default"].createElement(material_1.Typography, { htmlFor: name, component: "label", variant: "subtitle2" }, label)) : null;
};
exports.InputLabel = InputLabel;
var StarRatingInput = function (props) {
    var _a = (0, react_hook_form_1.useFormContext)(), setValue = _a.setValue, control = _a.control;
    var handleChange = function (_event, newValue) {
        console.log("newValue", newValue);
        setValue(props.name, newValue || "", {
            shouldValidate: true,
            shouldDirty: true
        });
    };
    return (react_1["default"].createElement(material_1.Box, { mb: 2 },
        react_1["default"].createElement(exports.InputLabel, { name: props.name, label: props.label }),
        react_1["default"].createElement(react_hook_form_1.Controller, { control: control, name: props.name, rules: props.validationRules, render: function (_a) {
                var field = _a.field, error = _a.fieldState.error;
                return (react_1["default"].createElement(react_1["default"].Fragment, null,
                    react_1["default"].createElement(material_1.Rating, { value: field.value || null, onChange: handleChange, size: "large" }),
                    error && react_1["default"].createElement(FormHelperText_1["default"], { error: true }, error.message)));
            } })));
};
exports.StarRatingInput = StarRatingInput;
var MultimediaSuggestionInput = function (props) {
    var _a = (0, react_1.useState)(null), audio = _a[0], setAudio = _a[1];
    var _b = (0, react_1.useState)(null), image = _b[0], setImage = _b[1];
    var _c = (0, react_1.useState)(0), audioUploadProgress = _c[0], setAudioUploadProgress = _c[1];
    var _d = (0, react_1.useState)(0), imageUploadProgress = _d[0], setImageUploadProgress = _d[1];
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
    var uploadFile = function (file, type, setProgress) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var response, signedUrl, totalBytes, reader, uploadProgress, uploadStream;
        return tslib_1.__generator(this, function (_a) {
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
                        write: function (chunk) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            var response;
                            return tslib_1.__generator(this, function (_a) {
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
    return (react_1["default"].createElement(material_1.Box, { mb: 2 },
        react_1["default"].createElement(exports.InputLabel, { name: props.name, label: props.label }),
        react_1["default"].createElement(exports.ControlledInput, tslib_1.__assign({}, props), function (field, error) { return (react_1["default"].createElement(material_1.Box, null,
            react_1["default"].createElement(material_1.TextField, tslib_1.__assign({}, field, { fullWidth: true, multiline: true, rows: 4, placeholder: props.placeholder, variant: "outlined", error: !!error, helperText: error === null || error === void 0 ? void 0 : error.message })),
            react_1["default"].createElement(material_1.Box, { display: "flex", justifyContent: "flex-end", mt: 1 },
                react_1["default"].createElement(IconButton_1["default"], { color: "primary", onClick: function () {
                        // @ts-ignore
                        document.querySelector("#image-upload").click();
                    } },
                    react_1["default"].createElement(PhotoCamera_1["default"], null)),
                react_1["default"].createElement("input", { id: "image-upload", type: "file", accept: "image/*", onChange: handleImageChange, style: { display: "none" } }),
                react_1["default"].createElement(IconButton_1["default"], { color: "primary", onClick: function () {
                        // @ts-ignore
                        document.querySelector("#audio-upload").click();
                    } },
                    react_1["default"].createElement(Mic_1["default"], null)),
                react_1["default"].createElement("input", { id: "audio-upload", type: "file", accept: "audio/*", onChange: handleAudioChange, style: { display: "none" } })),
            audio && (react_1["default"].createElement(LinearProgress_1["default"], { variant: "determinate", value: (audioUploadProgress / audio.size) * 100 })),
            image && (react_1["default"].createElement(LinearProgress_1["default"], { variant: "determinate", value: (imageUploadProgress / image.size) * 100 })))); })));
};
exports.MultimediaSuggestionInput = MultimediaSuggestionInput;
var TextInput = function (props) { return (react_1["default"].createElement(material_1.Box, { mb: 2 },
    react_1["default"].createElement(exports.InputLabel, { name: props.name, label: props.label }),
    react_1["default"].createElement(exports.ControlledInput, tslib_1.__assign({}, props), function (field, error) { return (react_1["default"].createElement(material_1.TextField, tslib_1.__assign({}, field, { fullWidth: true, variant: "outlined", error: !!error, helperText: error === null || error === void 0 ? void 0 : error.message }))); }))); };
exports.TextInput = TextInput;
var EmailInput = function (props) { return (react_1["default"].createElement(material_1.Box, { mb: 2 },
    react_1["default"].createElement(exports.InputLabel, { name: props.name, label: props.label }),
    react_1["default"].createElement(exports.ControlledInput, tslib_1.__assign({}, props), function (field, error) { return (react_1["default"].createElement(material_1.TextField, tslib_1.__assign({}, field, { fullWidth: true, variant: "outlined", error: !!error, helperText: error === null || error === void 0 ? void 0 : error.message }))); }))); };
exports.EmailInput = EmailInput;
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
var NpsInput = function (props) {
    var _a = (0, react_hook_form_1.useFormContext)(), setValue = _a.setValue, control = _a.control;
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
    return (react_1["default"].createElement(material_1.Box, { mb: 2 },
        react_1["default"].createElement(exports.InputLabel, { name: props.name, label: props.label }),
        react_1["default"].createElement(react_hook_form_1.Controller, { control: control, name: props.name, rules: props.validationRules, render: function (_a) {
                var field = _a.field, error = _a.fieldState.error;
                return (react_1["default"].createElement(react_1["default"].Fragment, null,
                    react_1["default"].createElement(material_1.Slider, { value: field.value || 0, valueLabelDisplay: "auto", step: 1, min: 0, max: 10, 
                        // @ts-ignore
                        onChange: handleSliderChange, marks: marks }),
                    error && react_1["default"].createElement(FormHelperText_1["default"], { error: true }, error.message)));
            } })));
};
exports.NpsInput = NpsInput;
//# sourceMappingURL=FormInputs.js.map