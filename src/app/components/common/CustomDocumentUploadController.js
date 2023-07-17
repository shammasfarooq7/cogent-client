import React from 'react';
import { Box, Input, FormHelperText, Tooltip } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { Controller, useFormContext, } from 'react-hook-form';
import './style.css'
import { Alert } from './Alert';

export const CustomDocumentUploadController = ({ controllerName, controllerLabel, allowedFileTypes = ["application/pdf", "image/jpeg", 'image/jpg',], acceptFiles = ".jpg,.jpeg,.pdf", maxFileSize = 5, isClearable = false, fieldIcon }) => {
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
      Alert.error("Only Pdf files and JPG/JPEG images are allowed!")
    }
  }

  const removeFile = (setValue) => {
    setValue(null)
  }

  return (
    <Controller
      name={controllerName}
      control={control}
      render={({ field, fieldState: { invalid, error: { message } = {} } }) => (
        <>
          <Input
            key={new Date()}
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
              <Box>
                {field?.value && isClearable &&
                  <Tooltip title="Remove Attachment">
                    <ClearIcon sx={{ "width": "16px" }} onClick={(e) => { e.stopPropagation(); e.preventDefault(); removeFile(field.onChange) }} />
                  </Tooltip>}
                {fieldIcon}
              </Box>
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