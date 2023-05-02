import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export const DashboardCard = ({color , hiring , text })=> {
  return (
    <Card sx={{ minWidth: 275 , borderRadius: "12px" , background: `${color}` }}>
      <CardContent>
        {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography> */}
        {/* <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent
        </Typography> */}
        <Typography sx={{ mb: 1.5 , color:"#FFFFFF", fontWeight:"600" , fontSize:"42px"}} color="text.secondary">
         {hiring}
        </Typography>
        <Typography variant="body2" sx={{fontFamily: "Poppins",fontWeight:"600", color:"#FFFFFF"}}>
      {text}
        </Typography>
        <Typography sx={{fontFamily: "Poppins", fontSize:"12px",color:"#FFFFFF"}}>
        Lorem Ipsum sss ccc
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Button size="small">Learn More</Button> */}
      </CardActions>
    </Card>
  );
}