import React, { useState } from "react";
import { Button, Box, TextField, IconButton, Typography } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import ShareIcon from "@mui/icons-material/Share";

export interface ShareInput {
  shareMeta: {
    title?: string;
    description1?: string;
    description2?: string;
  };
  shareData: {
    title?: string;
    text?: string;
    url?: string;
    image?: string;
  };
}

export const ShareAPIInput: React.FC<ShareInput> = (props) => {
  // const defaultShareMeta = {
  //   title: '',
  //   description1: '',
  //   description2: '',
  //   ...props.shareMeta
  // };

  const defaultShareData = {
    title: "",
    text: "",
    url: "",
    image: "",
    ...props.shareData,
  };
  const [shareData, setShareData] = useState(defaultShareData);
  const inputFileRef = React.useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setShareData({ ...shareData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleClick = () => {
    inputFileRef.current?.click();
  };
  const handleShare = async () => {
    try {
      await navigator.share({
        title: shareData.title,
        text: shareData.text,
        url: shareData.url,
        files: shareData.image
          ? [new File([shareData.image], "image.png")]
          : [],
      });
      // Tracking event
      // Example: analytics.track('Share Button Clicked');
    } catch (error) {
      console.error("Share API Error:", error);
    }
  };

  return (
    <Box mb={2}>
      <Typography variant="h6" gutterBottom>
        <Box display="flex" alignItems="center">
          {props.shareMeta.title}
          <ShareIcon
            fontSize="inherit"
            style={{ marginRight: "10px", marginLeft: "10px" }}
          />
        </Box>
      </Typography>
      <Typography variant="body1" gutterBottom>
        {props.shareMeta.description1}
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: "20px" }}>
        {props.shareMeta.description2}
      </Typography>
      <Box display="flex" flexDirection="column">
        <TextField
          label="Title"
          variant="outlined"
          value={shareData.title}
          onChange={(e) =>
            setShareData({ ...shareData, title: e.target.value })
          }
          sx={{ mb: 2 }}
        />
        <TextField
          label="Text"
          variant="outlined"
          value={shareData.text}
          onChange={(e) => setShareData({ ...shareData, text: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          label="URL"
          variant="outlined"
          value={shareData.url}
          onChange={(e) => setShareData({ ...shareData, url: e.target.value })}
          sx={{ mb: 2 }}
        />
        <input
          ref={inputFileRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          onClick={handleClick}
        >
          <PhotoCamera />
          <Typography sx={{ ml: 1 }} variant="caption">
            Upload picture
          </Typography>
        </IconButton>
        <Button variant="contained" color="primary" onClick={handleShare}>
          Share
        </Button>
      </Box>
    </Box>
  );

  // <Box mb={2}>
  //   <Box alignItems="center">
  //     <Typography variant="h6" gutterBottom>
  //       {props.shareMeta.title}
  //       <ShareIcon
  //         fontSize="inherit"
  //         style={{ marginRight: "10px", marginLeft: "10px" }}
  //       />
  //     </Typography>
  //   </Box>
  //   <Box alignItems="center">
  //     <Typography variant="body1" gutterBottom>
  //       {props.shareMeta.description1}
  //     </Typography>
  //   </Box>
  //   <Typography variant="body2" sx={{ marginBottom: "20px" }}>
  //     {props.shareMeta.description2}
  //   </Typography>

  //   <TextField
  //     label="Title"
  //     variant="outlined"
  //     value={shareData.title}
  //     onChange={(e) => setShareData({ ...shareData, title: e.target.value })}
  //   />

  //   <TextField
  //     label="Text"
  //     variant="outlined"
  //     value={shareData.text}
  //     onChange={(e) => setShareData({ ...shareData, text: e.target.value })}
  //   />
  //   <TextField
  //     label="URL"
  //     variant="outlined"
  //     value={shareData.url}
  //     onChange={(e) => setShareData({ ...shareData, url: e.target.value })}
  //   />

  // </Box>
};
