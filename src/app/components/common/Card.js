import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export const DashboardCard = ({ color, hiring, today, future, text }) => {
  return (
    <Card sx={{ minWidth: 275, borderRadius: "12px", background: `${color}` }}>
      <CardContent sx={{ padding: "25px" }}>
        <Typography sx={{ mb: 1.5, color: "#FFFFFF", fontWeight: "600", height: 72, marginBottom: "4px", fontSize: "48px" }} color="text.secondary">
          {hiring}
        </Typography>
        <Typography variant="body2" sx={{ fontFamily: "Poppins", fontWeight: "600", fontSize: "17px", color: "#FFFFFF" }}>
          {text}
        </Typography>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
  );
}