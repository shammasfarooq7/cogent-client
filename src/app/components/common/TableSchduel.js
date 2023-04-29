import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { images } from '../../assets/images';
import { Search } from './Search';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'Elvis Presley',
    'Tupelo, MS',
    'VISA ⠀•••• 3719',
    312.44,
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Paul McCartney',
    'London, UK',
    'VISA ⠀•••• 2574',
    866.99,
  ),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(
    3,
    '16 Mar, 2019',
    'Michael Jackson',
    'Gary, IN',
    'AMEX ⠀•••• 2000',
    654.39,
  ),
  createData(
    4,
    '15 Mar, 2019',
    'Bruce Springsteen',
    'Long Branch, NJ',
    'VISA ⠀•••• 5919',
    212.79,
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export const Orders = ({tableName,search}) => {
  return (
    <React.Fragment>
      <Box sx={{display:"flex", justifyContent:"space-between", mb:2}}>
      <Title sx={{color : "black"}}>{tableName}</Title>
      <Box>
      {search &&   <Search sx={{ width:"200px"}}
     
     />}
     {search &&  <Button sx={{backgroundColor:"#242D60", color:"white", padding:"6px 30px", marginLeft:"6px"}}>Add</Button>}
      </Box>
    
       </Box>
      <Table size="small">
        <TableHead>
          <TableRow sx={{backgroundColor : "#F5F8FA" , borderRadius:"10px"}}>
            <TableCell>Resource ID</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Status</TableCell>
            <TableCell >Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{marginTop:"10px"}}>
          {rows.map((row) => (
            <TableRow key={row.id}  sx={{mt:2}}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
             <Box sx={{display : "flex"}}>
             <TableCell ><Box component='img' sx={{height:"40px", width:"40px"}} src={images.Menu} alt='Menu' /></TableCell>
             <TableCell ><Box component='img' sx={{height:"40px", width:"40px"}} src={images.Edit} alt='Menu' /></TableCell>
             <TableCell ><Box component='img' sx={{height:"40px", width:"40px"}} src={images.Trash} alt='Menu' /></TableCell>
             </Box>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link> */}
    </React.Fragment>
  );
}
