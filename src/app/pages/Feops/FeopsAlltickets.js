import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useQuery } from "@apollo/client";
import { ResourceCard } from '../../components/common/ResourceCard';
import { Get_RESOURCE_Dashboard_Stats } from '../../../graphql/resources';
import { Box } from '@mui/material';
import { ResourceTable } from '../resource/resource-table';

export const FeopsAllTickets = () => {

  const { data, loading, error } = useQuery(Get_RESOURCE_Dashboard_Stats, {
    fetchPolicy: "network-only"
  });

  const dashboardResourceStat = data?.getResourceDashboardStats;

  return (
    <Box sx={{ p: "30px" }}>
      <Grid container spacing={2}>
        {/* Chart */}
        <Grid item xs={4} md={4} lg={3}>
          <ResourceCard total={dashboardResourceStat?.resourceStats?.total || 0} difference={dashboardResourceStat?.resourceStats?.difference || 0} text={"All Resource"} downward="down" />
        </Grid>
        <Grid item xs={4} md={4} lg={3}>
          <ResourceCard total={dashboardResourceStat?.onboardedStats?.total || 0} difference={dashboardResourceStat?.onboardedStats?.difference || 0} text={"Onboarding Completed"} />
        </Grid>
        <Grid item xs={4} md={4} lg={3}>
          <ResourceCard total={0} difference={0} text={"Interview Scheduled"} />
        </Grid>
        <Grid item xs={4} md={4} lg={3}>
          <ResourceCard total={0} difference={0} text={"Documents Pending"} downward="down" />
        </Grid>

        {/* Recent Deposits */}

        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', position: "relative" }}>
            {/* <Orders tableName="All Resources" search="search" /> */}
            <ResourceTable tableName="Active Incidents"  />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
