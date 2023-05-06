import React from 'react';
import { FormLabel, RadioGroup, FormControlLabel, Radio, FormControl, FormHelperText } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import './style.css'

export const CutomFormRadioController = ({ controllerName, controllerLabel, options = [], isMultiLine, rowsLength, fieldIcon, maxLength = 40, disabled = false }) => {
    const { control } = useFormContext();
    return (
        <Controller
            name={controllerName}
            control={control}
            render={({ field, fieldState: { invalid, error: { message } = {} } }) => (
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">{controllerLabel}</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        {...field}
                    >
                        {options?.map((item, index) => (
                            <FormControlLabel sx={{ color: "black" }} key={index} value={item?.value}
                                control={<Radio size='small' style={{ paddingTop: 0, paddingBottom: 0 }} />}
                                disabled={item?.disabled} label={item?.label} />
                        ))}
                    </RadioGroup>
                    {invalid && message &&
                        <FormHelperText style={{ color: "#d32f2f" }}>{message}</FormHelperText>
                    }
                </FormControl>
            )}
        />
    );
};