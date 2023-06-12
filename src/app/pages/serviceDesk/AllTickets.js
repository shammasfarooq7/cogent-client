import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { ServiceDeskTable } from './serviceDesk-table';

import { Box } from '@mui/material';

export const AllTickets = () => {
  return (
    <Box sx={{ p: "30px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', position: "relative" }}>
            <ServiceDeskTable search="search" />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
