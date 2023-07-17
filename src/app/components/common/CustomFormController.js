// packages block
import React from 'react';
import { InputAdornment, TextField } from '@mui/material';
// import { withStyles } from "@material-ui/core/styles";
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



export const CustomFormController = ({ controllerName, controllerLabel, fieldType, isMultiLine, rowsLength, fieldIcon, maxLength = 40, disabled = false }) => {
  const { control } = useFormContext();
 
  return (
    <Controller
      name={controllerName}
      control={control}
      render={({ field, fieldState: { invalid, error: { message } = {} } }) => (
        <TextField
          type={fieldType}
          // className={classes.root}
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
          InputLabelProps={{
            style: { color: "#222B45", fontFamily:"popins" },
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

