import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, CircularProgress, Box, Grid } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonIcon from '@mui/icons-material/Person';
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
import '../common/style.css';
// other packages

const theme = createTheme();

export const SignupForm = () => {
  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(signUpValidationSchema),

    defaultValues: {
      firstName: '',
      lastName: '',
      middleName: '',
      email: '',
      password: "",
      confirmPassword: ""
    }
  })

  const navigate = useNavigate()
  const [signup, { data, loading, error }] = useMutation(SIGN_UP);

  if (data) {
    Alert.success("Registerd user successfully")
    setTimeout(() => { navigate("/login") }, 500)
  }

  const { handleSubmit, control, reset, formState: { errors } } = methods;

  const onSubmit = async (data) => {
    const { email, password, mobileNumber, firstName, lastName, middleName } = data
    await signup({
      variables: {
        signUpUserInput: {
          email,
          firstName,
          middleName,
          lastName,
          password,
        }
      }
    })

  }

  return (
    <FormProvider {...methods}>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh', position: "relative" }}>
          <Box component='img' display='block' sx={{ height: "112px", width: "101px", position: "absolute", top: "10px", left: "20px" }} src={images.Cogent} alt='Cogent logo' />

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
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{ background: "#1E1E1E" }}>
            <Box
              sx={{
                my: 8,
                padding: "55px",
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar> */}
              <Typography sx={{ fontWeight: "500", fontSize: "26px", marginBottom: "15px", marginBottom: "10px", color: "#FFFFFF", fontFamily: "Poppins" }}>
                Sign up
              </Typography>
              <Typography sx={{ fontSize: "14px", marginRight: "140px", marginBottom: "45px", color: "#FFFFFF", fontFamily: "Poppins" }}>
                If you already have an account register you can
                <Typography component={Link} to="/login" variant="body2" sx={{ cursor: "pointer", marginLeft: "10px", fontSize: "16px", color: "#1e81b0" }}>
                  {" Login here!"}
                </Typography>
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <Box sx={{ mt: 1 }}>
                <Box sx={{ marginBottom: "25px" }}>
                    <CustomController
                      controllerName='firstName'
                      controllerLabel='First Name '
                      fieldType='text'
                      fieldIcon={<PersonIcon sx={{ color: "#FFFFFF", fontSize: "15px" }} />}
                      variantField="standard"
                    />

                    <CustomController
                      controllerName='middleName'
                      controllerLabel='Middle Name '
                      fieldType='text'
                      fieldIcon={<PersonIcon sx={{ color: "#FFFFFF", fontSize: "15px" }} />}
                      variantField="standard"
                    />

                    <CustomController
                      controllerName='lastName'
                      controllerLabel='Last Name '
                      fieldType='text'
                      fieldIcon={<PersonIcon sx={{ color: "#FFFFFF", fontSize: "15px" }} />}
                      variantField="standard"
                    />
                  </Box>
                  <Box sx={{ marginBottom: "25px" }}>
                    <CustomController
                      controllerName='email'
                      controllerLabel='Enter your Email '
                      fieldType='text'
                      fieldIcon={<MailOutlineIcon sx={{ color: "#FFFFFF", fontSize: "15px" }} />}
                      variantField="standard"
                    />
                  </Box>

                  <Box sx={{ marginBottom: "25px" }}>
                    <CustomController
                      controllerName='password'
                      controllerLabel='Enter your password'
                      fieldType='password'
                      variantField="standard"
                      fieldIcon={<LockOutlinedIcon sx={{ color: "#FFFFFF", fontSize: "15px" }} />}
                      isPassword
                    />
                  </Box>

                  <Box sx={{ marginBottom: "25px" }}>
                    <CustomController
                      controllerName='confirmPassword'
                      controllerLabel='Confirm Your password'
                      fieldType='password'
                      variantField="standard"
                      fieldIcon={<LockOutlinedIcon sx={{ color: "#FFFFFF", fontSize: "15px" }} />}
                      isPassword
                    />
                  </Box>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, borderRadius: "16px", backgroundColor: "#2a294f" }}
                    disabled={data}
                  >
                    Register
                  </Button>
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