import React from 'react';
import { Box, Input } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
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
              border: "1px solid #cccccc", paddingY: "7px", paddingX: "10px", borderRadius: "4px", marginTop: "8px", marginBottom: "4px",
              fontStyle: "normal", fontSize: "13px", color: "#222B45", lineHeight: "16px", cursor: "pointer"
            }}>
              {field?.value?.name || controllerLabel}
              {fieldIcon}
            </Box>
          </label>
        </>
      )}
    />
  );
};