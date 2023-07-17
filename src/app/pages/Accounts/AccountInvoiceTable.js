import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomTableCell = styled(TableCell)({
  borderBottom: 'none', // Remove the border at the bottom of each cell
  fontSize:'11px',
  fontWeight:'600'
   // Apply bold font to table headers
});

const CustomTableRow = styled(TableRow)(({ theme }) => ({
  '&:last-child td': {
    borderBottom: 'none', // Remove the border at the bottom of the last row
  },
}));

const InvoiceTable = ({ headers, data }) => {
    const customCellStyles = {
        fontSize:'10px'
      };
    
  return (
    <TableContainer >
      <Table>
        <TableHead>
          <TableRow sx={{background:"#F5F8FA" , borderRadius:'6px'}}>
            {headers && headers.map((header, index) => (
              <CustomTableCell key={index} align={header.align} >{header.label}</CustomTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((row, index) => (
            <CustomTableRow key={index}>
              {row.map((cell, index) => (
                <TableCell key={index} sx={customCellStyles} align='center' >{cell.value}</TableCell>
              ))}
            </CustomTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InvoiceTable;
