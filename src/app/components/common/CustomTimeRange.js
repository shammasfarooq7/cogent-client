import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';

export const CustomTimeRange = ({ controllerName }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={controllerName}
      control={control}
      defaultValue={{ start: '', end: '' }}
      render={({ field }) => (
        <>
          <TextField
            label="Start Time"
            type="time"
            value={field.value.start}
            onChange={(e) => field.onChange({ ...field.value, start: e.target.value })}
            inputProps={{ step: 300 }} // Optional: Set the time step
          />
          <TextField
            label="End Time"
            type="time"
            value={field.value.end}
            onChange={(e) => field.onChange({ ...field.value, end: e.target.value })}
            inputProps={{ step: 300 }} // Optional: Set the time step
          />
        </>
      )}
    />
  );
};
