// packages block
import React from 'react';
import { Box, InputAdornment, TextField ,Input } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
// import { withStyles } from "@material-ui/core/styles";
import { Controller, useFormContext } from 'react-hook-form';
import './style.css'
// styles, constants, utils and interfaces block


/**
 * It takes multiple params to show a customized input field which can have multiple types.
 *
 * @param {boolean} isDisabled - used for disabling custom field (multiple filed types e.g. password, text, email)
 * @param {string} controllerName - used for adding ID and name
 * @param {string} controllerLabel - used for adding label on textfield
 * @param {string} fieldType - used for showing selected options in select field
 * @param {isMultiLine} isMultiLine - used for showing text area
 * @returns JSX Element
 */
const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },
  /* STYLES FOR THE OUTLINE BORDER */
  specialOutline: {
    borderColor: "pink",
    borderWidth: 4
  }
});

// TextField.PropTypes = {
//   classes: PropTypes.object.isRequired
// };



export const CustomController = ({ fieldIcon,controllerName, controllerLabel, fieldType, variantField, isDisabled, isMultiLine, maxLength, rowsLength, readOnly }) => {
  const { control } = useFormContext();
   

  const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    }
  });


  return (
    <Controller
      name={controllerName}
      control={control}
      render={({ field, fieldState: { invalid, error: { message } = {} } }) => (
        <TextField
          type={fieldType}
          margin='dense'
          error={invalid}
          sx={{ input: { color: 'white',  fontFamily:"Poppins",marginLeft:"2px" }, label : {color: 'white' , fontFamily:"Poppins", fontWeight:"400", fontSize:"13px"},
          "& .MuiInput-root-focused": {
            "& > fieldset": {
          borderColor: "white"
            }
          }
        }}
          label={controllerLabel}
          disabled={isDisabled}
          rows={isMultiLine ? rowsLength : undefined}
          fullWidth
          {...field}
          helperText={message}
          multiline={isMultiLine}
          variant={variantField}
          inputProps={{
            maxLength: maxLength || undefined,
            readOnly: readOnly ? true : false,
            // classes: { notchedOutline: classes.specialOutline }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {fieldIcon} 
              {/* <fieldIcon sx={{color:"#FFFFFF", fontSize:"15px"}} /> */}
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

