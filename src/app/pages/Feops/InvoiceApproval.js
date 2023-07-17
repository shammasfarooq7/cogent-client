import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import { images } from '../../assets/images';




export const FeopsInvoiceApproval = () => {



  return (
    <Box maxWidth="100%" sx={{ mt: 4, mb: 4, padding:'20px', display:'flex', justifyContent:'space-between' }}>
     <Typography sx={{fontSize:'20px', color:'#181C32', fontWeight:'600'}}>Invoice #34782</Typography>
     <Box>
        <Button sx={{color:'#A1A5B7', background:' #FFFFFF', borderRadius:'8px', marginRight:'10px'}}>
            <Box component='img' src={images.DownloadPdf} sx={{marginRight:'5px'}} />
            Download PDF
        </Button>
        <Button sx={{color:'#A1A5B7', background:' #FFFFFF', borderRadius:'8px'}}>
            <Box component='img' src={images.UploadPdf} sx={{marginRight:'5px'}} />
            Print Invoice
        </Button>
     </Box>
    </Box>
  );
}
