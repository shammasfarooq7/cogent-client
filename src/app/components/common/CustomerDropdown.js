// packages block
import React, { useState } from 'react';
import { Box } from '@mui/material';
// import { withStyles } from "@material-ui/core/styles";
import { Controller, useFormContext } from 'react-hook-form';
import AsyncSelect from 'react-select/async';
import './style.css'
import { useApolloClient } from '@apollo/client';
import { GET_All_CUSTOMERS_QUERY } from '../../../graphql/tickets';
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

// TextField.PropTypes = {
//   classes: PropTypes.object.isRequired
// };



export const CustomerDropdown = ({ controllerName, placeholder, isMulti = false, isClearable = true, }) => {
    const { control } = useFormContext();
    const client = useApolloClient();
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const customStyles = {
        control: (provided) => ({
            ...provided,
            minHeight: '40px'
        })
    };

    const promiseOptions = async (searchQuery) => {
        try {
            const { data } = await client.query({
                query: GET_All_CUSTOMERS_QUERY,
                variables: {
                    getAllCustomerInput: {
                        role: 'SD',
                        searchQuery
                    },
                },
                fetchPolicy: 'network-only',
            });
            return data?.getAllCustomer?.customers?.map(item => ({
                value: item?.id,
                label: item?.name
            }));
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    };

    return (
        <Controller
            name={controllerName}
            control={control}
            render={({ field, fieldState: { invalid, error: { message } = {} } }) => (
                <>
                    <AsyncSelect
                        {...field}
                        styles={customStyles}
                        isMulti={isMulti}
                        name="colors"
                        cacheOptions
                        defaultOptions
                        loadOptions={promiseOptions}
                        className={`basic-multi-select ${invalid && "react-select-error"} ${isMenuOpen && "open-react-select"}`}
                        classNamePrefix="select"
                        placeholder={placeholder}
                        isClearable={isClearable}
                        onMenuOpen={() => { setIsMenuOpen(true) }}
                        onMenuClose={() => { setIsMenuOpen(false) }}
                    />
                    <Box fontSize={"0.75rem"} marginLeft={"14px"} color={"#d32f2f"}>{message}</Box>
                </>
            )}
        />
    );
};

