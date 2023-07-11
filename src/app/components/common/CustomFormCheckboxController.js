import React from 'react';
import { FormControlLabel, FormControl, Checkbox } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import './style.css'

export const CustomFormCheckboxController = ({ controllerName, controllerLabel, disabled = false }) => {
    const { control } = useFormContext();
    return (
        <Controller
            name={controllerName}
            control={control}
            render={({ field, fieldState: { error: { message } = {} } }) => (
                <FormControl>
                    <FormControlLabel required control={<Checkbox sx={{ color: "black" }} {...field} checked={field.value || false}  disabled={disabled} />} label={controllerLabel}
                        sx={{
                            '& .MuiFormControlLabel-label': {
                                color: 'black', // Set the text color to black
                            },
                        }} />
                </FormControl>
            )}
        />
    );
};