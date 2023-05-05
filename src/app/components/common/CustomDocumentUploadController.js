import React from 'react';
import { Box, Input, FormHelperText } from '@mui/material';
import { Controller, useFormContext, } from 'react-hook-form';
import './style.css'
import { Alert } from './Alert';

export const CustomDocumentUploadController = ({ controllerName, controllerLabel, allowedFileTypes = ["application/pdf"], acceptFiles = ".pdf", maxFileSize = 5, isMultiLine, fieldIcon }) => {
  const { control } = useFormContext();

  const handleFileChange = (e, setValue) => {
    const file = e.target?.files[0];
    if (!file) return

    if (allowedFileTypes?.includes(file?.type)) {
      if (file?.size <= maxFileSize * 1024 * 1024) {

        setValue(file)
      }
      else {
        Alert.error("Please select a file that is 5 MB or less!")
      }
    }
    else {
      Alert.error("Only Pdf files are allowed!")
    }
  }

  return (
    <Controller
      name={controllerName}
      control={control}
      render={({ field, fieldState: { invalid, error: { message } = {} } }) => (
        <>
          <Input
            id={controllerName}
            type="file"
            sx={{ display: "none" }}
            inputProps={{ accept: acceptFiles }}
            onChange={(e) => handleFileChange(e, field.onChange)}
          />
          <label htmlFor={controllerName}>
            <Box sx={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              border: `1px solid ${invalid ? "#d32f2f" : "#cccccc"}`, paddingY: "7px", paddingX: "10px", borderRadius: "4px", marginTop: "8px", marginBottom: "4px",
              fontStyle: "normal", fontSize: field?.value?.name ? "13px" : "1rem", fontFamily: `"Roboto", "Helvetica", "Arial", sans- serif`,
              color: field?.value?.name ? "#222B45" : "#00000099", lineHeight: "16px", cursor: "pointer"
            }}>
              {field?.value?.name || controllerLabel}
              {fieldIcon}
            </Box>
          </label>
          {invalid && message &&
            <FormHelperText style={{ color: "#d32f2f" }}>{message}</FormHelperText>
          }
        </>
      )
      }
    />
  );
};