// packages block
import React from 'react';
import { Box, InputAdornment, TextField ,Input, MenuItem } from '@mui/material';
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



export const CustomDropDrownController = ({ controllerName, controllerLabel, fieldType , currencies}) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={controllerName}
      control={control}
      render={({ field, fieldState: { invalid, error: { message } = {} } }) => (
        <TextField
          type={fieldType}
          select
          sx={{borderRadius:"18px"}}
          margin='dense'
          size='small'
          error={invalid}
          label={controllerLabel}
          fullWidth
          {...field}
          helperText={message}
          variant="outlined"
        >
             {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
            </TextField> 
      )}
    />
  );
};

