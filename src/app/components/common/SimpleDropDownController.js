// packages block
import React from 'react';
import { Box, InputAdornment, TextField, Input, MenuItem } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
// import { withStyles } from "@material-ui/core/styles";
import { Controller, useFormContext } from 'react-hook-form';
import Select from 'react-select';
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
const styles = theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    dense: {
        marginTop: 16
    },
    menu: {
        width: 200
    },
    /* STYLES FOR THE OUTLINE BORDER */
    specialOutline: {
        borderColor: "pink",
        borderWidth: 4
    }
});

// TextField.PropTypes = {
//   classes: PropTypes.object.isRequired
// };



export const SimpleDropDownController = ({ controllerName, options, placeholder, isMulti = false, isClearable = true, controllerLabel, fieldType, currencies }) => {
    const { control } = useFormContext();

    const customStyles = {
        control: (provided) => ({
            ...provided,
            minHeight: '40px'
        })
    };

    return (
        <Controller
            name={controllerName}
            control={control}
            render={({ field, fieldState: { invalid, error: { message } = {} } }) => (
                <>
                    <Select
                        {...field}
                        styles={customStyles}
                        // defaultValue={[colourOptions[2], colourOptions[3]]}
                        isMulti={isMulti}
                        name="colors"
                        options={options}
                        className={`basic-multi-select ${invalid && "react-select-error"}`}
                        classNamePrefix="select"
                        placeholder={placeholder}
                        isClearable={isClearable}
                    />
                    <Box fontSize={"0.75rem"} color={"#d32f2f"}>{message}</Box>
                </>
            )}
        />
    );
};

