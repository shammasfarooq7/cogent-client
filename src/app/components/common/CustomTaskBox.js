import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { images } from '../../assets/images';
import { Avatar } from '@mui/material';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export const TaskBox = ({taskName, buttontText})=> {
  return (
      <>
         <Box sx={{background:'#FFFFFF', padding:'14px', height:'449px', overflowX:'auto'}}>
          <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <Typography sx={{fontSize:'18px', fontWeight:'600', marginBottom:'14px'}}>{taskName}</Typography>
           {buttontText &&  <Button sx={{ backgroundColor: "#F64E60", color: "white", padding: "6px 20px", marginBottom:'8px' }}>{buttontText}</Button>}
          </Box>
        <Box sx={{p:1,  background: "#EFF4FA", color: "#464E5F", borderRadius: "5px", fontWeight: "600", fontSize: "14px",  display:'flex', justifyContent:'space-between'}}>
                        <Typography id="modal-modal-description" >
                               Task Id 
                        </Typography>
                        <Typography id="modal-modal-description" sx={{marginLeft:'48px'}} >
                               Status 
                        </Typography>
                        <Typography id="modal-modal-description" >
                               Action 
                        </Typography>
                </Box>
                <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:'20px', marginLeft:'-6px'}}>
                    <Box sx={{display:'flex', alignItems:'center'}}>
                   <Avatar sx={{height:'50px', width:'50px'}} />
                   <Box sx={{marginLeft:'12px'}}>
                    <Typography sx={{color: '#464E5F', fontWeight:'500',fontFamily: 'Poppins', fontSize:'14px'}}>Brad Simmons</Typography>
                    <Typography sx={{color: ' #B5B5C3', fontWeight:'500',fontFamily: 'Poppins', fontSize:'13px'}}>ID#122222334</Typography>
                   </Box>
                    </Box>
                    <Typography sx={{color:'#50CD89',background: '#E8FFF3',borderRadius: '6px', padding:'8px'}}>Completed</Typography>
                    <Box display={"flex"} alignItems={"center"}>
    
                                            <Box component='img' sx={{ height: "40px", width: "40px", cursor: "pointer", marginY: "4px", marginX: "6px" }}
                                                 src={images.Edit} alt='Menu'  />
                                            <Box component='img' sx={{ height: "40px", width: "40px", cursor: "pointer", marginY: "4px", marginX: "1px" }}
                                                src={images.View} alt='Menu'
                                        />

                                        </Box>

                    
                </Box>
                <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:'20px', marginLeft:'-6px'}}>
                    <Box sx={{display:'flex', alignItems:'center'}}>
                   <Avatar sx={{height:'50px', width:'50px'}} />
                   <Box sx={{marginLeft:'12px'}}>
                    <Typography sx={{color: '#464E5F', fontWeight:'500',fontFamily: 'Poppins', fontSize:'14px'}}>Brad Simmons</Typography>
                    <Typography sx={{color: ' #B5B5C3', fontWeight:'500',fontFamily: 'Poppins', fontSize:'13px'}}>ID#122222334</Typography>
                   </Box>
                    </Box>
                    <Typography  sx={{color:'#FFA800',background: '#FFF4DE',borderRadius: '6px', padding:'8px'}}>In progress</Typography>
                    <Box display={"flex"} alignItems={"center"}>
    
                                            <Box component='img' sx={{ height: "40px", width: "40px", cursor: "pointer", marginY: "4px", marginX: "6px" }}
                                                 src={images.Edit} alt='Menu'  />
                                            <Box component='img' sx={{ height: "40px", width: "40px", cursor: "pointer", marginY: "4px", marginX: "1px" }}
                                                src={images.View} alt='Menu'
                                        />

                                        </Box>

                    
                </Box>
                <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:'20px', marginLeft:'-6px'}}>
                    <Box sx={{display:'flex', alignItems:'center'}}>
                   <Avatar sx={{height:'50px', width:'50px'}} />
                   <Box sx={{marginLeft:'12px'}}>
                    <Typography sx={{color: '#464E5F', fontWeight:'500',fontFamily: 'Poppins', fontSize:'14px'}}>Brad Simmons</Typography>
                    <Typography sx={{color: ' #B5B5C3', fontWeight:'500',fontFamily: 'Poppins', fontSize:'13px'}}>ID#122222334</Typography>
                   </Box>
                    </Box>
                    <Typography sx={{color:'#50CD89',background: '#E8FFF3',borderRadius: '6px', padding:'8px'}}>Completed</Typography>
                    <Box display={"flex"} alignItems={"center"}>
    
                                            <Box component='img' sx={{ height: "40px", width: "40px", cursor: "pointer", marginY: "4px", marginX: "6px" }}
                                                 src={images.Edit} alt='Menu'  />
                                            <Box component='img' sx={{ height: "40px", width: "40px", cursor: "pointer", marginY: "4px", marginX: "1px" }}
                                                src={images.View} alt='Menu'
                                        />

                                        </Box>

                    
                </Box>
                <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:'20px', marginLeft:'-6px'}}>
                    <Box sx={{display:'flex', alignItems:'center'}}>
                   <Avatar sx={{height:'50px', width:'50px'}} />
                   <Box sx={{marginLeft:'12px'}}>
                    <Typography sx={{color: '#464E5F', fontWeight:'500',fontFamily: 'Poppins', fontSize:'14px'}}>Brad Simmons</Typography>
                    <Typography sx={{color: ' #B5B5C3', fontWeight:'500',fontFamily: 'Poppins', fontSize:'13px'}}>ID#122222334</Typography>
                   </Box>
                    </Box>
                    <Typography  sx={{color:'#FFA800',background: '#FFF4DE',borderRadius: '6px', padding:'8px'}}>In progress</Typography>
                    <Box display={"flex"} alignItems={"center"}>
    
                                            <Box component='img' sx={{ height: "40px", width: "40px", cursor: "pointer", marginY: "4px", marginX: "6px" }}
                                                 src={images.Edit} alt='Menu'  />
                                            <Box component='img' sx={{ height: "40px", width: "40px", cursor: "pointer", marginY: "4px", marginX: "1px" }}
                                                src={images.View} alt='Menu'
                                        />

                                        </Box>

                    
                </Box>
        </Box>
      </>
  );
}