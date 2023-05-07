import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';



export const HeaderResource = ({ heading }) => {

        return (
                <Box sx={{ marginTop: "10px", marginBottom: "12px" }}>
                        <Typography id="modal-modal-description" sx={{ p: 1, background: "#EFF4FA", color: "#464E5F", borderRadius: "5px", fontWeight: "600", fontSize: "14px", paddingLeft: "24px", }}>
                                {heading}
                        </Typography>
                </Box>
        );
}
