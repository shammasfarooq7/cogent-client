// packages block
import { useState } from "react";
import { FormControl, FormHelperText, InputLabel } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
// styles, constants, utils and interfaces block
import PhoneInput from "react-phone-input-2";
import { CustomPhoneContainer } from "../../theme/styleComponents";

/**
 * It takes multiple params to show a customized input field which can have multiple types.
 * 
 * @param {string} controllerName - used for adding ID and name
 * @param {string} controllerLabel - used for adding label on textfield
 * @param {string} error - used for showing errors if the field is not validated
 * @returns JSX Element
 */

export const CustomPhoneController = ({ controllerName, controllerLabel }) => {
  const { control } = useFormContext();
  const [focus, setFocus] = useState(false);

  return (
    <CustomPhoneContainer>
      <Controller
        name={controllerName}
        control={control}
        render={({ field: { value, onChange }, fieldState: { invalid, error: { message } = {} } }) => (
          <FormControl variant="outlined" fullWidth error={invalid}>
            <InputLabel shrink={focus} id={`phone-${controllerName}`}>{controllerLabel}</InputLabel>

            <PhoneInput
              country={'us'}
              onlyCountries={['us']}
              value={value}
              onChange={phone => onChange(phone)}
              disabled={false}
            //   disableDropdown={false}
            //   showDropdown={true}
              dropdownClass={!focus ? "display_none" : undefined}
              onFocus={() => setFocus(true)}
              onBlur={() => {
                (value?.length === 0 || !value) &&
                  setFocus(false)
              }}
              placeholder=""
              inputClass={!focus ? "transparent" : "appearance"}
              inputStyle={{
                paddingLeft: 15,
                fontSize: 16,
                borderRadius: '4px',
                // padding: '16.5px 14px',
                width: '100%',
                border: '1px solid rgba(0, 0, 0, 0.2)'
              }}
            />

            {invalid && message &&
              <FormHelperText color="error">{message}</FormHelperText>
            }
          </FormControl>
        )}
      />
    </CustomPhoneContainer>
  );
};
