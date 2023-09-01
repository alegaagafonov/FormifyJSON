import React, { ChangeEvent, useState } from 'react';

import { Box, IconButton, Snackbar } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Videocam from '@mui/icons-material/Videocam';
import Audiotrack from '@mui/icons-material/Audiotrack';

type UploadButtonProps = {
  type: 'image' | 'video' | 'audio';
  formData: FormData;
  name?: string;
};

const icons = {
  image: <PhotoCamera />,
  video: <Videocam />,
  audio: <Audiotrack />
};

const UploadButton: React.FC<UploadButtonProps> = ({
  type,
  formData,
  name
}) => {
  const [open, setOpen] = useState(false);

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const fileKey = name || type;

      // Add file validation here if needed

      formData.append(fileKey, file);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <input
        accept={`${type}/*`}
        style={{ display: 'none' }}
        id={`icon-button-file-${name || type}`}
        type="file"
        onChange={handleUpload}
      />
      <label htmlFor={`icon-button-file-${name || type}`}>
        <IconButton
          color="primary"
          aria-label={`upload ${type}`}
          component="span"
        >
          {icons[type]}
        </IconButton>
      </label>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={`${
          type.charAt(0).toUpperCase() + type.slice(1)
        } file uploaded successfully!`}
      />
    </Box>
  );
};

export default UploadButton;
