import React from 'react';
import Select from 'react-select';
import { Controller, useFormContext } from 'react-hook-form';

export const CustomMultiSelect = ({ controllerName, controllerLabel, currencies }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={controllerName}
      label={controllerLabel}
      control={control}
      render={({ field, fieldState: { invalid, error: { message } = {} } }) => (
        <Select
          {...field}
          options={currencies}
          getOptionLabel={(option) => option.label}
          isMulti
          onChange={(selectedOptions) => field.onChange(selectedOptions)}
          styles={{
            menu: (provided) => ({ ...provided, zIndex: 9999 }), // Set the desired z-index value
          }}
        />
      )}
    />
  );
};
