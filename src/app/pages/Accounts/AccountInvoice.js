import { useState } from 'react';
import { createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Grid, Typography } from '@mui/material';
import { images } from '../../assets/images';
import { HeaderResource } from '../../components/common/HeaderResource';
import InvoiceTable from './AccountInvoiceTable';




export const AccountInvoice = () => {

    const headingStyles = {
        fontFamily: 'Poppins',
        fontWeight: '500',
        fontSize: '12px',
        color: '#7E8299'
      };
    const descriptionStyles = {
      
        fontFamily: 'Poppins',
        fontWeight: '600',
        fontSize: '14px',
        color:"#3F4254"

    }

    const headers = [
        { label: 'Po#', align: 'center' },
        { label: 'Ticket#', align: 'center' },
        { label: 'Date', align: 'center' },
        { label: 'Description', align: 'center' },
        { label: 'Time in', align: 'center' },
        { label: 'Time Out', align: 'center' },
        { label: 'Hours', align: 'center' },
        { label: 'Currency', align: 'center' },
        { label: 'Rate/Hour', align: 'center' },
        { label: 'Travel', align: 'center' },
        { label: 'Tools', align: 'center' },
        { label: 'Extras', align: 'center' },
        { label: 'Total', align: 'center' },
        // Add more headers as needed
      ];

      const data = [
        [
          { value: '120', align: 'center' },
          { value: '80', align: 'center' },
          { value: '01-01-23', align: 'center' },
          { value: 'Logo Design', align: 'center' },
          { value: '00:00', align: 'center' },
          { value: '00:00', align: 'center' },
          { value: '00:00', align: 'center' },
          { value: 'USD($)', align: 'center' },
          { value: '$   3200', align: 'center' },
          { value: '$   3200', align: 'center' },
          { value: '$   3200', align: 'center' },
          { value: '$   3200', align: 'center' },
          { value: '$   3200', align: 'center' },
          // Add more data cells as needed
        ],
        [
            { value: '120', align: 'center' },
            { value: '80', align: 'center' },
            { value: '01-01-23', align: 'center' },
            { value: 'Logo Design', align: 'center' },
            { value: '00:00', align: 'center' },
            { value: '00:00', align: 'center' },
            { value: '00:00', align: 'center' },
            { value: 'USD($)', align: 'center' },
            { value: '$   3200', align: 'center' },
            { value: '$   3200', align: 'center' },
            { value: '$   3200', align: 'center' },
            { value: '$   3200', align: 'center' },
            { value: '$   3200', align: 'center' },
        ],
        [
            { value: '120', align: 'center' },
            { value: '80', align: 'center' },
            { value: '01-01-23', align: 'center' },
            { value: 'Logo Design', align: 'center' },
            { value: '00:00', align: 'center' },
            { value: '00:00', align: 'center' },
            { value: '00:00', align: 'center' },
            { value: 'USD($)', align: 'center' },
            { value: '$   3200', align: 'center' },
            { value: '$   3200', align: 'center' },
            { value: '$   3200', align: 'center' },
            { value: '$   3200', align: 'center' },
            { value: '$   3200', align: 'center' },
        ],
        [
            { value: '120', align: 'center' },
            { value: '80', align: 'center' },
            { value: '01-01-23', align: 'center' },
            { value: 'Logo Design', align: 'center' },
            { value: '00:00', align: 'center' },
            { value: '00:00', align: 'center' },
            { value: '00:00', align: 'center' },
            { value: 'USD($)', align: 'center' },
            { value: '$   3200', align: 'center' },
            { value: '$   3200', align: 'center' },
            { value: '$   3200', align: 'center' },
            { value: '$   3200', align: 'center' },
            { value: '$   3200', align: 'center' },
        ],
        [
            { value: '120', align: 'center' },
            { value: '80', align: 'center' },
            { value: '01-01-23', align: 'center' },
            { value: 'Logo Design', align: 'center' },
            { value: '00:00', align: 'center' },
            { value: '00:00', align: 'center' },
            { value: '00:00', align: 'center' },
            { value: 'USD($)', align: 'center' },
            { value: '$   3200', align: 'center' },
            { value: '$   3200', align: 'center' },
            { value: '$   3200', align: 'center' },
            { value: '$   3200', align: 'center' },
            { value: '$   3200', align: 'center' },
        ],
        // Add more rows of data as needed
      ];

  return (
    <>
    <Box maxWidth="100%" sx={{ mt: 4, mb: 4, padding:'24px', display:'flex', justifyContent:'space-between' }}>
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
    <Box maxWidth="100%" sx={{mt:3, padding:'18px', background:'#FFFFFF', borderRadius:'12px'}}>
        <Grid container >
          <Grid item xs={12} md={8} sm={12}>
            <Box sx={{display:'flex', justifyContent:'space-between'}}>
            <Box component='img'src={images.CogentLogo}  />
            <Box>
                <Button sx={{background: '#50CD89', borderRadius: '6px', color:'#FFFFFF', textTransform:'capitalize', '&:hover': {
      background: '#50CD89', // Change the background color on hover
    },}}>
                    Approve Invoice
                </Button>
            </Box>
            </Box>
            <HeaderResource heading="from" />
            <Box  sx={{display:'flex', justifyContent:'space-between', paddingLeft:'20px', paddingRight:'20px', marginBottom:'18px'}}>
            <Box>
                <Typography sx={headingStyles}>Full Name</Typography>
                <Typography sx={descriptionStyles}>12 April 2021</Typography>
            </Box>
            <Box>
                <Typography sx={headingStyles}>Full Name</Typography>
                <Typography sx={descriptionStyles}>12 April 2021</Typography>
            </Box>
            <Box>
                <Typography sx={headingStyles}>Full Name</Typography>
                <Typography sx={descriptionStyles}>12 April 2021</Typography>
            </Box>
            </Box>
            <Box  sx={{display:'flex', justifyContent:'space-between', paddingLeft:'20px', paddingRight:'20px', marginBottom:'18px'}}>
            <Box>
                <Typography sx={headingStyles}>Full Name</Typography>
                <Typography sx={descriptionStyles}>12 April 2021</Typography>
            </Box>
            <Box>
                <Typography sx={headingStyles}>Full Name</Typography>
                <Typography sx={descriptionStyles}>12 April 2021</Typography>
            </Box>
            <Box>
                <Typography sx={headingStyles}>Full Name</Typography>
                <Typography sx={descriptionStyles}>12 April 2021</Typography>
            </Box>
            </Box>
            <Box  sx={{display:'flex', justifyContent:'space-between', paddingLeft:'20px', paddingRight:'20px', marginBottom:'18px'}}>
            <Box>
                <Typography sx={headingStyles}>Full Name</Typography>
                <Typography sx={descriptionStyles}>12 April 2021</Typography>
            </Box>
            <Box>
                <Typography sx={headingStyles}>Full Name</Typography>
                <Typography sx={descriptionStyles}>12 April 2021</Typography>
            </Box>
            <Box>
                <Typography sx={headingStyles}>Full Name</Typography>
                <Typography sx={descriptionStyles}>12 April 2021</Typography>
            </Box>
            </Box>
            <HeaderResource heading="INVOICE PARTICULARS" />
            <Box  sx={{display:'flex', justifyContent:'space-between', paddingLeft:'20px', paddingRight:'20px', marginBottom:'16px'}}>
            <Box>
                <Typography sx={headingStyles}>Invoice Date</Typography>
                <Typography sx={descriptionStyles}>12 April 2021</Typography>
            </Box>
            <Box>
                <Typography sx={headingStyles}>Due Date</Typography>
                <Typography sx={descriptionStyles}>12 April 2021</Typography>
            </Box>
            <Box>
                <Typography sx={headingStyles}>Currency</Typography>
                <Typography sx={descriptionStyles}>12 April 2021</Typography>
            </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} sm={12} >
            <Box sx={{padding:'12px',marginLeft:'10px', background:'#E4E6EF', paddingLeft:'10px'}}>
                <Button sx={{background:'#E8FFF3',textTransform:'capitalize', color:'#50CD89', borderRadius:'6px'}}>Approve</Button>
                <Button  sx={{marginLeft:'14px', background:'#FFF8DD',textTransform:'capitalize', color:'#F1BC00', borderRadius:'6px'}}>Pending Payment</Button>
                <Box>

                <Box sx={{paddingLeft:'10px', marginTop:'40px'}}>
                <Typography sx={{marginTop:'20px',fontFamily: 'Poppins',fontWeight: '600',fontSize: '17px',color: '#7E8299'}}>BILL TO</Typography>
                <Typography sx={{marginTop:'10px',fontFamily: 'Poppins',fontWeight: '600',fontSize: '14px',color:"#3F4254"}}>COGENTS NETWORK LTD</Typography>
               
                <Box sx={{marginTop:'10px'}}>
                <Typography sx={headingStyles}>VAt</Typography>
                <Typography sx={descriptionStyles}>GABDHAVH122233AS32322</Typography>
            </Box>
            <Box sx={{marginTop:'10px'}}>
                <Typography sx={headingStyles}>Email</Typography>
                <Typography sx={descriptionStyles}>GABDHAVH122233AS32322</Typography>
            </Box>
             
            <Box sx={{marginTop:'10px'}}>
                <Typography sx={headingStyles}>Contact</Typography>
                <Typography sx={descriptionStyles}>GABDHAVH122233AS32322</Typography>
            </Box>

            <Box sx={{marginTop:'10px'}}>
                <Typography sx={headingStyles}>Website</Typography>
                <Typography sx={descriptionStyles}>GABDHAVH122233AS32322</Typography>
            </Box>
            </Box>
            </Box>
            </Box>
      
          </Grid>
          {/* <Grid item xs={12} md={12}>
          
          </Grid> */}
        </Grid>
    </Box>
    <Box sx={{background:"#FFFFFF", padding:'12px'}}>
              <InvoiceTable headers={headers} data={data}/>
           </Box>
           <Box sx={{background:"#FFFFFF", padding:'12px'}}>
             <HeaderResource heading="REMITTANCE DETAILS" />
             <Box  sx={{display:'flex', justifyContent:'space-between', marginBottom:'18px', padding:'0px 10px'}}>
            <Box>
                <Typography sx={{fontFamily: 'Poppins',fontWeight: '500',fontSize: '12px',color: '#7E8299'}}>Acount Type</Typography>
                <Typography sx={{fontFamily: 'Poppins',fontWeight: '600',fontSize: '14px',color:"#3F4254"}}>12 April 2021</Typography>
            </Box>
            <Box>
                <Typography sx={{fontFamily: 'Poppins',fontWeight: '500',fontSize: '12px',color: '#7E8299'}}>Account Currency</Typography>
                <Typography sx={{fontFamily: 'Poppins',fontWeight: '600',fontSize: '14px',color:"#3F4254"}}>12 April 2021</Typography>
            </Box>
            <Box>
                <Typography sx={{fontFamily: 'Poppins',fontWeight: '500',fontSize: '12px',color: '#7E8299'}}>Bank Name</Typography>
                <Typography sx={{fontFamily: 'Poppins',fontWeight: '600',fontSize: '14px',color:"#3F4254"}}>12 April 2021</Typography>
            </Box>
            <Box>
                <Typography sx={{fontFamily: 'Poppins',fontWeight: '500',fontSize: '12px',color: '#7E8299'}}>Bank Address</Typography>
                <Typography sx={{fontFamily: 'Poppins',fontWeight: '600',fontSize: '14px',color:"#3F4254"}}>12 April 2021</Typography>
            </Box>
            </Box>

            <Box  sx={{display:'flex', justifyContent:'space-between', marginBottom:'18px', padding:'0px 10px'}}>
            <Box>
                <Typography sx={{fontFamily: 'Poppins',fontWeight: '500',fontSize: '12px',color: '#7E8299'}}>Acount Title</Typography>
                <Typography sx={{fontFamily: 'Poppins',fontWeight: '600',fontSize: '14px',color:"#3F4254"}}>12 April 2021</Typography>
            </Box>
            <Box>
                <Typography sx={{fontFamily: 'Poppins',fontWeight: '500',fontSize: '12px',color: '#7E8299'}}>Account Holder Name</Typography>
                <Typography sx={{fontFamily: 'Poppins',fontWeight: '600',fontSize: '14px',color:"#3F4254"}}>12 April 2021</Typography>
            </Box>
            <Box>
                <Typography sx={{fontFamily: 'Poppins',fontWeight: '500',fontSize: '12px',color: '#7E8299'}}>IBAN</Typography>
                <Typography sx={{fontFamily: 'Poppins',fontWeight: '600',fontSize: '14px',color:"#3F4254"}}>12 April 2021</Typography>
            </Box>
            <Box>
                <Typography sx={{fontFamily: 'Poppins',fontWeight: '500',fontSize: '12px',color: '#7E8299'}}>BC/Swift</Typography>
                <Typography sx={{fontFamily: 'Poppins',fontWeight: '600',fontSize: '14px',color:"#3F4254"}}>12 April 2021</Typography>
            </Box>
            </Box>

            <Box  sx={{display:'flex', justifyContent:'space-between', marginBottom:'18px', padding:'0px 10px'}}>
            <Box>
                <Typography sx={{fontFamily: 'Poppins',fontWeight: '500',fontSize: '12px',color: '#7E8299'}}>Sort Code</Typography>
                <Typography sx={{fontFamily: 'Poppins',fontWeight: '600',fontSize: '14px',color:"#3F4254"}}>12 April 2021</Typography>
            </Box>
            </Box>

            <Box sx={{paddingX:'10px', paddingLeft:'10px', paddingRight:'280px'}}>
                <Typography sx={{fontFamily: 'Poppins',fontWeight: '500',fontSize: '12px',color: '#7E8299'}}>Terms</Typography>
                <Typography sx={{fontFamily: 'Poppins',fontWeight: '600',fontSize: '14px',color:"#3F4254"}}>1. All invoices to be paid with 30-45 days receiaval</Typography>
                <Typography sx={{fontFamily: 'Poppins',fontWeight: '600',fontSize: '14px',color:"#3F4254"}}>1. All payments are subjected to provision of complete delivarables of the task.</Typography>
                <Typography sx={{fontFamily: 'Poppins',fontWeight: '600',fontSize: '14px',color:"#3F4254"}}>3. Cogent Networks Reserves Rights to hold any cancel any invoice if supplier is found in breach of supplier Code of Conduct or DNA.</Typography>
            </Box>
           </Box>
    </>
  );
}
