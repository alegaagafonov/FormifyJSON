"use strict";
// FormInputComponents.tsx
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NpsInput = exports.EmailInput = exports.TextInput = exports.MultimediaSuggestionInput = exports.StarRatingInput = exports.InputLabel = exports.ControlledInput = void 0;
const react_1 = __importStar(require("react"));
const react_hook_form_1 = require("react-hook-form");
const material_1 = require("@mui/material");
const FormHelperText_1 = __importDefault(require("@mui/material/FormHelperText"));
const IconButton_1 = __importDefault(require("@mui/material/IconButton"));
const PhotoCamera_1 = __importDefault(require("@mui/icons-material/PhotoCamera"));
const Mic_1 = __importDefault(require("@mui/icons-material/Mic"));
const LinearProgress_1 = __importDefault(require("@mui/material/LinearProgress"));
const ControlledInput = ({ name, validationRules, children }) => {
    const { control } = (0, react_hook_form_1.useFormContext)();
    return (<react_hook_form_1.Controller name={name} control={control} rules={validationRules} render={({ field, fieldState: { error } }) => children(field, error)}/>);
};
exports.ControlledInput = ControlledInput;
const InputLabel = ({ name, label }) => {
    return name ? (<material_1.Typography htmlFor={name} component='label' variant='subtitle2'>
      {label}
    </material_1.Typography>) : null;
};
exports.InputLabel = InputLabel;
const StarRatingInput = (props) => {
    const { setValue, control } = (0, react_hook_form_1.useFormContext)();
    const handleChange = (_event, newValue) => {
        console.log('newValue', newValue);
        setValue(props.name, newValue || '', {
            shouldValidate: true,
            shouldDirty: true,
        });
    };
    return (<material_1.Box mb={2}>
      <exports.InputLabel name={props.name} label={props.label}/>
      <react_hook_form_1.Controller control={control} name={props.name} rules={props.validationRules} render={({ field, fieldState: { error } }) => (<>
            <material_1.Rating value={field.value || null} onChange={handleChange} size='large'/>
            {error && <FormHelperText_1.default error>{error.message}</FormHelperText_1.default>}
          </>)}/>
    </material_1.Box>);
};
exports.StarRatingInput = StarRatingInput;
const MultimediaSuggestionInput = (props) => {
    const [audio, setAudio] = (0, react_1.useState)(null);
    const [image, setImage] = (0, react_1.useState)(null);
    const [audioUploadProgress, setAudioUploadProgress] = (0, react_1.useState)(0);
    const [imageUploadProgress, setImageUploadProgress] = (0, react_1.useState)(0);
    const handleAudioChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setAudio(event.target.files[0]);
            uploadFile(event.target.files[0], 'audio', setAudioUploadProgress);
        }
    };
    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
        uploadFile(event.target.files[0], 'image', setImageUploadProgress);
    };
    const uploadFile = async (file, type, setProgress) => {
        const response = await fetch(`http://localhost:3000/generate-upload-url?fileType=${type}`);
        const { signedUrl } = await response.json();
        const totalBytes = file.size;
        const reader = file.stream().getReader();
        let uploadProgress = 0;
        const uploadStream = new WritableStream({
            write: async (chunk) => {
                uploadProgress += chunk.length;
                setProgress((prevProgress) => prevProgress + chunk.length);
                const response = await fetch(signedUrl, {
                    method: 'PUT',
                    body: chunk,
                    headers: {
                        'Content-Type': type === 'audio' ? 'audio/mpeg' : 'image/jpeg',
                        'Content-Range': `bytes ${uploadProgress}-${uploadProgress + chunk.length - 1}/${totalBytes}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Upload failed');
                }
            },
        });
        await reader.read().then(({ value }) => uploadStream.getWriter().write(value));
    };
    return (<material_1.Box mb={2}>
      <exports.InputLabel name={props.name} label={props.label}/>
      <exports.ControlledInput {...props}>
        {(field, error) => (<material_1.Box>
            <material_1.TextField {...field} fullWidth multiline rows={4} placeholder={props.placeholder} variant='outlined' error={!!error} helperText={error === null || error === void 0 ? void 0 : error.message}/>
            <material_1.Box display='flex' justifyContent='flex-end' mt={1}>
              <IconButton_1.default color='primary' onClick={() => {
                // @ts-ignore
                document.querySelector('#image-upload').click();
            }}>
                <PhotoCamera_1.default />
              </IconButton_1.default>
              <input id='image-upload' type='file' accept='image/*' onChange={handleImageChange} style={{ display: 'none' }}/>
              <IconButton_1.default color='primary' onClick={() => {
                // @ts-ignore
                document.querySelector('#audio-upload').click();
            }}>
                <Mic_1.default />
              </IconButton_1.default>
              <input id='audio-upload' type='file' accept='audio/*' onChange={handleAudioChange} style={{ display: 'none' }}/>
            </material_1.Box>
            {audio && <LinearProgress_1.default variant='determinate' value={(audioUploadProgress / audio.size) * 100}/>}
            {image && <LinearProgress_1.default variant='determinate' value={(imageUploadProgress / image.size) * 100}/>}
          </material_1.Box>)}
      </exports.ControlledInput>
    </material_1.Box>);
};
exports.MultimediaSuggestionInput = MultimediaSuggestionInput;
const TextInput = (props) => (<material_1.Box mb={2}>
    <exports.InputLabel name={props.name} label={props.label}/>
    <exports.ControlledInput {...props}>
      {(field, error) => (<material_1.TextField {...field} fullWidth variant='outlined' error={!!error} helperText={error === null || error === void 0 ? void 0 : error.message}/>)}
    </exports.ControlledInput>
  </material_1.Box>);
exports.TextInput = TextInput;
const EmailInput = (props) => (<material_1.Box mb={2}>
    <exports.InputLabel name={props.name} label={props.label}/>
    <exports.ControlledInput {...props}>
      {(field, error) => (<material_1.TextField {...field} fullWidth variant='outlined' error={!!error} helperText={error === null || error === void 0 ? void 0 : error.message}/>)}
    </exports.ControlledInput>
  </material_1.Box>);
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
const NpsInput = (props) => {
    const { setValue, control } = (0, react_hook_form_1.useFormContext)();
    console.log('props', props);
    const handleSliderChange = (_event, newValue) => {
        setValue(props.name, newValue || 0, {
            shouldValidate: true,
            shouldDirty: true,
        });
    };
    const marks = [
        { value: 0, label: 'Not likely' },
        { value: 10, label: 'Very likely' },
    ];
    return (<material_1.Box mb={2}>
      <exports.InputLabel name={props.name} label={props.label}/>
      <react_hook_form_1.Controller control={control} name={props.name} rules={props.validationRules} render={({ field, fieldState: { error } }) => (<>
            <material_1.Slider value={field.value || 0} valueLabelDisplay='auto' step={1} min={0} max={10} 
        // @ts-ignore
        onChange={handleSliderChange} marks={marks}/>
            {error && <FormHelperText_1.default error>{error.message}</FormHelperText_1.default>}
          </>)}/>
    </material_1.Box>);
};
exports.NpsInput = NpsInput;
