// packages block
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
// others

export const AuthLayout = ({ children, title, subTitle }) => (

  <Grid container component="main" sx={{ height: '100vh' , background:"#020914" , position:"relative" }}>
    
    <CssBaseline />
    <Grid
      item
      xs={false}
      sm={4}
      md={7}
      sx={{
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor: (t) =>
          t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
  </Grid>
)