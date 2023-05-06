//packages block
import React from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormProvider, useForm } from "react-hook-form";
import { images } from "../../assets/images";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
// component block
import { CustomController } from "../common/CustomController"
import { Alert } from "../common/Alert";
import '../common/style.css';
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
            <Box
              sx={{
                my: 8,
                padding:"55px",
                display: 'flex',
                flexDirection: 'column',
               
              }}
            >
              {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar> */}
              <Typography sx={{fontWeight :"500", fontSize:"26px", marginBottom:"15px", color: "#FFFFFF" , fontFamily:"Poppins" }}>
                Sign in
              </Typography>
              <Typography sx={{fontSize : "14px", marginRight:"140px" ,marginBottom:"45px", color: "#FFFFFF" , fontFamily:"Poppins" }}>
               If you don't have an account register you can
               <Typography component={Link} to="/signup" variant="body2" sx={{cursor:"pointer" , marginLeft:"10px", fontSize:"16px" , color:"#1e81b0"}}>
                        {" Register here!"}
                      </Typography>
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <Box sx={{ mt: 2 }}>
                  <Box  sx={{marginBottom:"25px"}}>
                  <CustomController
                    controllerName='email'
                    controllerLabel='Email'
                    fieldType='text'
                    fieldIcon={<MailOutlineIcon sx={{color:"#FFFFFF", fontSize:"15px"}} />}
                    variantField="standard"
                  />
                  </Box>
                  <Box sx={{marginBottom:"15px"}}>
                  <CustomController
                    controllerName='password'
                    controllerLabel='Password'
                    fieldType='password'
                    variantField="standard"
                    fieldIcon={<LockOutlinedIcon sx={{color:"#FFFFFF", fontSize:"15px"}} />}
                    isPassword
                  />
                  </Box>
                  {/* <Box sx={{display:"flex", }}>
                  <FormGroup>
                   <FormControlLabel control={<Checkbox sx={{color :"white"}}  />} label="Remember me" />
                     </FormGroup> 

                   <Grid item xs>
                      <Typography href="#" variant="body2" sx={{color: "#FFFFFF",cursor:"pointer", lineHeight:2.7, paddingLeft:"153px"}}>
                        Forgot password?
                      </Typography>
                    </Grid>
                  </Box> */}
                    
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 , borderRadius:"16px" , backgroundColor:"#2a294f"}}
                  >
                    Login
                  </Button>
                  <Grid container>
                  
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