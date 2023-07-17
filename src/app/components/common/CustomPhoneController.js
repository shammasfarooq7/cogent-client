// packages block
import { FormControl, FormHelperText } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
// styles, constants, utils and interfaces block
import PhoneInput from "react-phone-input-2";
import { CustomPhoneContainer } from "../../theme/styleComponents";
import 'react-phone-input-2/lib/style.css'

/**
 * It takes multiple params to show a customized input field which can have multiple types.
 * 
 * @param {string} controllerName - used for adding ID and name
 * @param {string} controllerLabel - used for adding label on textfield
 * @param {string} error - used for showing errors if the field is not validated
 * @returns JSX Element
 */

export const CustomPhoneController = ({ controllerName, controllerLabel, inputStyle = {} }) => {
  const { control } = useFormContext();

  return (
    <CustomPhoneContainer>
      <Controller
        name={controllerName}
        control={control}
        rules={{ validate: () => false, required: true }}
        render={({ field: { value, onChange }, fieldState: { invalid, error: { message } = {} } }) => (
          <FormControl variant="outlined" fullWidth error={invalid}>
            {/* <InputLabel shrink={focus} id={`phone-${controllerName}`}>{controllerLabel}</InputLabel> */}
            <PhoneInput
              specialLabel={''}
              // country={'us'}
              value={value}
              placeholder={controllerLabel}
              onChange={phone => onChange(phone)}
              //  inputProps={{
              //     name: 'phone',
              //     required: true,
              //     autoFocus: true
              //   }}
              // isValid={(value) => !invalid}
              inputStyle={{
                paddingLeft: 15,
                fontSize: 16,
                borderRadius: '4px',
                padding: '0px 42px',
                width: '100%',
                border: '1px solid rgba(0, 0, 0, 0.2)',
                ...inputStyle
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
