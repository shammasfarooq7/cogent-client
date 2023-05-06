import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';



export const HeaderResource = ({heading}) => {
  
    return (
            <Box sx={{marginTop:"10px", marginBottom :"12px"}}>
            <Typography id="modal-modal-description" sx={{ p:1 , background : "#EFF4FA" , borderRadius:"5px" , fontWeight:"700" , paddingLeft:"8px", fontFamily:"popins"}}>
            {heading}
            </Typography>
            </Box>
    );
  }
  