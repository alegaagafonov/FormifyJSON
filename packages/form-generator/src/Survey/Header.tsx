import * as React from "react";
import Box from "@mui/material/Box";
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
//import MenuItem from '@mui/material/MenuItem';
//import Menu from '@mui/material/Menu';
import LanguageIcon from "@mui/icons-material/Language";
import { Project } from "@formify-json/types-and-schemas";
import Avatar from "@mui/material/Avatar";

export default function Header({ logo, background }: Project) {
  //  const [anchorEl, setAnchorEl] = React.useState(null);
  //const open = Boolean(anchorEl);
  // const handleMenu = (event: any) => {
  //   setAnchorEl(event.currentTarget);
  // };

  return (
    <>
      <IconButton
        size="large"
        edge="end"
        aria-label="language"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={() => {}}
        color="inherit"
        sx={{ position: "absolute", right: 45, top: 10, color: "#fff" }}
      >
        <LanguageIcon />
      </IconButton>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `url(${background})`,
          backgroundSize: "100% 100%",
          height: 200,
          color: "#fff",
          width: "100%", // add this line
        }}
      >
        {logo && (
          <Avatar
            sx={{ width: 100, height: 100, mt: "10px" }}
            alt="Logo"
            src={logo}
          />
        )}
        {/* <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={open}
          onClose={() => handleClose(currentLanguage)}
        >
          {languages.map((lang) => (
            <MenuItem key={lang.value} onClick={() => handleClose(lang.value)}>
              {lang.label}
            </MenuItem>
          ))}
        </Menu> */}
      </Box>
    </>
  );
}
