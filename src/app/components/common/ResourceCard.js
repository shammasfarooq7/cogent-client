import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export const ResourceCard = ({color  , total , difference , text})=> {
  return (
    <Card sx={{ minWidth: 220 , borderRadius: "12px"  }}>
      <CardContent>
        <Typography sx={{ mb: 1.5 , fontWeight:"400" , fontSize:"12px"}} >
       {text}
        </Typography>
        <Typography variant="body2" sx={{fontFamily: "Poppins",fontWeight:"600"}}>
        {total}
        </Typography>
        <Typography sx={{fontFamily: "Poppins", fontSize:"12px", display:"flex", flexDirection:"row"}}>
        <ArrowDownwardIcon/>
        <Typography sx={{fontFamily: "Poppins", fontSize:"13px",marginTop:"3px",marginRight:"5px", color:"#FF6623"}}>{difference}</Typography>
        <Typography sx={{fontFamily: "Poppins", fontSize:"13px",marginTop:"3px", color:"#8F9BB3"}}>Since Last month</Typography>
        </Typography>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
  );
}