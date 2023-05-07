import { Box, styled, } from "@mui/material";
import palette from "./palette";
import { flexCenter } from "./styleConstants";

export const AuthLayoutContainer = styled(Box)(() => ({
  minHeight: "100vh",
  paddingInline: '24px',
  ...flexCenter
}));

export const AuthLayoutBox = styled(Box)(({ theme }) => ({
  backgroundColor: palette.white,
  borderRadius: '4px',
  padding: '50px',
  marginTop: '40px',
  boxShadow: '0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)',

  [theme.breakpoints.down('md')]: {
    padding: '24px',
  }
}));

export const CustomPhoneContainer = styled(Box)(() => ({
  '.react-tel-input .form-control': {
    height: '56px',
  },

  '.MuiFormControl-root.MuiFormControl-fullWidth': {
    marginTop: '8px'
  },

  '.MuiInputLabel-outlined.MuiInputLabel-shrink': {
    transform: ' translate(10px, -6px) scale(0.75)',
    background: "none",
    padding: '0 6px',
    zIndex: '99',
    backgroundColor: palette.white
  },

  '.display_none': {
    display: 'none!important'
  },

  '.special-label': {
    display: 'none!important'
  },

  '.transparent': {
    color: 'transparent',
  },

  '.appearance': {
    backgroundColor: palette.white
  },
}))

