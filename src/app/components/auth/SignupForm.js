import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, CircularProgress, Box, Grid } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// component block
import { images } from "../../assets/images";
import { CustomController } from "../common/CustomController"
import { CustomPhoneController } from "../common/CustomPhoneController"
import { signUpValidationSchema } from "../../validationSchema";
import { SportsRugbySharp } from "@mui/icons-material";
import { useMutation } from '@apollo/client';
import { SIGN_UP } from "../../../graphql/auth";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "../common/Alert";
// other packages

const theme = createTheme();

export const SignupForm = () => {
  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(signUpValidationSchema),

    defaultValues: {
      email: '',
      phoneNumber: '',
      password: "",
      confirmPassword: ""
    }
  })

  const navigate = useNavigate()
  const [signup, { data, loading, error }] = useMutation(SIGN_UP);

  if(data){
    Alert.success("Registerd user successfully")
    //  navigate("/login")
  }

  const { handleSubmit, control, reset, formState: { errors } } = methods;

  const onSubmit = async (data) => {
    const {email , password , phoneNumber} = data
    console.log(data)
    await signup({
        variables : {
          createUserInput : {
            email,
            password,
            phoneNumber
          }
        }   
    })
   
  }

  return (
    <FormProvider {...methods}>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh', position:"relative" }}>
        <Box component='img' display='block' sx={{height:"112px", width:"101px", position:"absolute", top:"10px", left:"20px"}} src={images.Cogent} alt='Cogent logo' />

          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: `url(${images.Auth})`,
              // backgroundColor: rgba(2, 9, 20, 0.54),
              borderRadius: '0px 40px 40px 0px',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              // background: rgba(2, 9, 20, 0.54),

            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{background: "#1E1E1E"}}>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar> */}
              <Typography sx={{fontWeight :"500", fontSize:"16px", marginRight:"414px", marginBottom:"10px", color: "#FFFFFF" , fontFamily:"Poppins" }}>
                Sign up
              </Typography>
              <Typography sx={{fontSize : "14px", marginRight:"251px"  ,color: "#FFFFFF" , fontFamily:"Poppins" }}>
               if you already have an account register you can
               <Typography component={Link} to="/login" variant="body2" sx={{cursor:"pointer"}}>
                        {" Register here!"}
                      </Typography>
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <Box sx={{ mt: 1 }}>

                  <CustomController
                    controllerName='email'
                    controllerLabel='Enter your Email '
                    fieldType='text'
                  />

                {/* <CustomController
                    controllerName='username'
                    controllerLabel='Enter your username'
                    fieldType='text'
                  /> */}

                  <CustomController
                    controllerName='password'
                    controllerLabel='Enter your password'
                    fieldType='password'
                  />



                  <CustomController
                    controllerName='confirmPassword'
                    controllerLabel='Confirm Your password'
                    fieldType='password'
                  />



                  <CustomPhoneController
                    controllerName='phoneNumber'
                    controllerLabel=''
                  />


                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Register
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Typography component={Link} variant="body2" sx={{cursor:"pointer"}}>
                        Forgot password?
                      </Typography>
                    </Grid>
                    {/* <Grid item>
                      <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid> */}
                  </Grid>
                </Box>
              </form>
            </Box>
          </Grid>
          {/* </FormProvider> */}
        </Grid>
      </ThemeProvider>
    </FormProvider>
  )
}