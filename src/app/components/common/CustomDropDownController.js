// packages block
import React, { useContext, useState } from 'react';
import { Box, InputAdornment, TextField, Input, MenuItem, Select } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
// import { withStyles } from "@material-ui/core/styles";
import { Controller, useFormContext } from 'react-hook-form';
import './style.css'
import { GET_CURRENT_USER } from '../../../graphql/auth';
import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { UserContext } from '../../context/user-context';
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



export const CustomDropDrownController = ({ controllerName, controllerLabel, fieldType, currencies, onchange = false, disabled = false }) => {
  
  const userRole = localStorage.getItem("userRole")

  const { control } = useFormContext();
  return (
    <Controller
      name={controllerName}
      control={control}
      render={({ field, fieldState: { invalid, error: { message } = {} } }) => (
        <TextField
          type={fieldType}
          select
          sx={{ borderRadius: "18px" }}
          margin='dense'
          size='small'
          error={invalid}
          disabled={disabled}
          label={controllerLabel}
          fullWidth
          {...field}
          helperText={message}
          variant="outlined"
          InputLabelProps={{
            style: { color: "#222B45", fontFamily: "popins" },
          }}
        >
          {
            currencies &&
            currencies.map((option) => (
              userRole === "ADMIN" ?
              <MenuItem key={onchange ? option.name : option.value} value={onchange ? option.value : option.value}>
              {onchange ? option.value : option.label}
            </MenuItem>
            :
            <MenuItem key={onchange ? option.name : option.value} value={onchange ? option.id : option.value}>
                {onchange ? option.name : option.label}
              </MenuItem>
            ))
        }
          </TextField> 
      )}
    />
  );
};

