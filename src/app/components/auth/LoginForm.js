//packages block
import React from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormProvider, useForm } from "react-hook-form";
import { images } from "../../assets/images";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
// component block
import { CustomController } from "../common/CustomController"
import { Alert } from "../common/Alert";
// others
import { AUTH_TOKEN, DASHBOARD_ROUTE, EMAIL_CHANGED_OR_NOT_VERIFIED_MESSAGE, FORBIDDEN_EXCEPTION, LOGIN, LOGIN_FIELDS, WRONG_EMAIL_OR_PASSWORD } from "../../constants";
// import { AuthContext } from "../../context/AuthContext";
// import { LoginUserInput, useLoginMutation } from "../../../generated";
import { loginValidationSchema } from "../../validationSchema";
import { SIGN_IN } from "../../../graphql/auth";
import { useMutation } from "@apollo/client";

const theme = createTheme();

export const LoginForm = () => {
  const methods = useForm({
    mode: "all",
    resolver: yupResolver(loginValidationSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });
  const navigate = useNavigate()
  const [signin, { data, loading, error }] = useMutation(SIGN_IN);

  if(data){
    const {signin : {accessToken}} = data
    localStorage.setItem(AUTH_TOKEN, accessToken)
    navigate(DASHBOARD_ROUTE)
    Alert.success("Sign In successfully")
    console.log(accessToken)
    // const {accessToke} = data
  }
  if(error){
   Alert.error(error.message)
  }

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    console.log(data)
    await signin({
      variables: {
        loginUserInput: data,
      }
    })
  }

  return (
    <FormProvider {...methods}>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' , position:"relative" }}>
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
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{background: "#1E1E1E"}}>
            <Box sx={{marginTop:"120px", marginLeft:"60px"}}>
          <Typography sx={{ontWeight :"700", fontSize:"20px", marginBottom:"10px", color: "#FFFFFF" , fontFamily:"Poppins" }}>
                Login in
              </Typography>
              <Typography sx={{fontSize : "14px", marginTop:"20px" ,color: "#FFFFFF" , fontFamily:"Poppins" }}>
               if you don't have an account register  <span style={{displa:"block"}}>you can</span> 
              </Typography>
               <Typography component={Link} to="/signup" variant="body2" sx={{cursor:"pointer"}}>
                      {" Register here!"}
                      </Typography>
            </Box>
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
                Login in
              </Typography>
              <Typography sx={{fontSize : "14px", marginRight:"251px"  ,color: "#FFFFFF" , fontFamily:"Poppins" }}>
               if you don't have an account register you can
               <Typography component={Link} to="/signup" variant="body2" sx={{cursor:"pointer"}}>
                        {" Register here!"}
                      </Typography>
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <Box sx={{ mt: 1 }}>
                  <CustomController
                    controllerName='email'
                    controllerLabel='Email'
                    fieldType='text'
                    variantField="standard"
                  />

                  <CustomController
                    controllerName='password'
                    controllerLabel='Password'
                    fieldType='password'
                    variantField="standard"
                    fieldIcon={<LockOutlinedIcon sx={{color:"#FFFFFF", fontSize:"15px"}} />}
                    isPassword
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Login In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Typography href="#" variant="body2" sx={{color: "#FFFFFF",cursor:"pointer"}}>
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