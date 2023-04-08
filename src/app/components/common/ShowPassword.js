// packages block
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import { FC } from "react";
// constants and interfaces block
import { PASSWORD } from "../../constants/index";

export const ShowPassword = ({ isPassword, passwordType, handleShowPassword }) => (
  <InputAdornment position="end">
    {isPassword &&
      <IconButton onClick={handleShowPassword} color="secondary">
        {passwordType !== PASSWORD ? <Visibility color="primary" /> : <VisibilityOff color="primary" />}
      </IconButton>
    }
  </InputAdornment>
);