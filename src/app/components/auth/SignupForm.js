import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Grid } from "@mui/material"
import { yupResolver } from '@hookform/resolvers/yup';
// component block
import { CustomController } from "../common/CustomController"
import {CustomPhoneController} from "../common/CustomPhoneController"
import { signUpValidationSchema } from "../../validationSchema";
// other packages

export const SignupForm = () => {

  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(signUpValidationSchema),

    defaultValues: {
      email: '',
      phoneNumber: '',
      password:"",
      confirmPassword:""
    }
  })

  const { handleSubmit, control, reset, formState: { errors } } = methods;

  const onSubmit = async (data) => {
    console.log(data)
  }

    return (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} rowSpacing={0.5}>
              <Grid item md={6} sm={12}>
                <CustomController
                  controllerName='email'
                  controllerLabel='Email'
                  fieldType='text'
                />
              </Grid>
  
              <Grid item md={6} sm={12}>
                <CustomController
                  controllerName='password'
                  controllerLabel='Password'
                  fieldType='text'
                />
              </Grid>

              <Grid item md={6} sm={12}>
                <CustomController
                  controllerName='confirmPassword'
                  controllerLabel='Confirm Password'
                  fieldType='text'
                />
              </Grid>
  
              <Grid item md={6} sm={12}>
                <CustomPhoneController
                  controllerName='phoneNumber'
                  controllerLabel='Phone Number'
                />
              </Grid>
  
            </Grid>
          </form>
        </FormProvider>
    )
}