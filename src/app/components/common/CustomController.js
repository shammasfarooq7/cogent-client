// packages block
import React from 'react';
import { TextField } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { Controller, useFormContext } from 'react-hook-form';
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

export const CustomController = ({ controllerName, controllerLabel, fieldType, isDisabled, isMultiLine, maxLength, rowsLength, readOnly }) => {
  const { control } = useFormContext();

  const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
    },
  });


  return (
    <Controller
      name={controllerName}
      control={control}
      render={({ field, fieldState: { invalid, error: { message } = {} } }) => (
        <CssTextField
          type={fieldType}
          margin='dense'
          error={invalid}
          sx={{ input: { color: 'white',  fontFamily:"Poppins" }, label : {color: 'white' , fontFamily:"Poppins", fontWeight:"400", fontSize:"12px"} }}
          label={controllerLabel}
          disabled={isDisabled}
          rows={isMultiLine ? rowsLength : undefined}
          fullWidth
          {...field}
          helperText={message}
          multiline={isMultiLine}
          variant="standard"
          inputProps={{
            maxLength: maxLength || undefined,
            readOnly: readOnly ? true : false,
          }}
        />
      )}
    />
  );
};