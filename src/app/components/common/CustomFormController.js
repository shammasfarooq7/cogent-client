// packages block
import React from 'react';
import { Box, InputAdornment, TextField, Input, MenuItem } from '@mui/material';
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



export const CustomFormController = ({ controllerName, controllerLabel, fieldType, isMultiLine, rowsLength, fieldIcon, maxLength = 40, disabled = false }) => {
  const { control } = useFormContext();
  // const {classes} = this.props
  //  console.log("ssssssssss",classes)



  return (
    <Controller
      name={controllerName}
      control={control}
      render={({ field, fieldState: { invalid, error: { message } = {} } }) => (
        <TextField
          type={fieldType}
          margin='dense'
          size='small'
          error={invalid}
          rows={isMultiLine ? rowsLength : undefined}
          multiline={isMultiLine}
          label={controllerLabel}
          fullWidth
          {...field}
          helperText={message}
          disabled={disabled}
          variant="outlined"
          inputProps={{
            maxLength
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
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

