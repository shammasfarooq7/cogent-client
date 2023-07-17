// packages block
import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import "./../../common/style.css"
import { useApolloClient } from '@apollo/client';
import { GET_JOBSITE_BY_PROJECT } from '../../../../graphql/tickets';

export const JobSiteDropdown = ({ selected, setSelected, projectId, isDisabled = false }) => {
    const client = useApolloClient();
    const [jobsites, setJobSites] = useState([])
    const [loading, setLoading] = useState(false)
    // const [selected, setSelected] = useState(null)

    const handleChange = (e) => {
        const jobsite = jobsites.find(jobsite => jobsite?.id === e?.target?.value);
        setSelected(jobsite)
    }

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                if (!projectId) return []
                setLoading(true)
                const { data } = await client.query({
                    query: GET_JOBSITE_BY_PROJECT,
                    variables: {
                        id: projectId
                    },
                    fetchPolicy: 'network-only',
                });

                setJobSites(
                    data?.getJobsitesByProject
                );

            } catch (error) {
                console.error('Error fetching data:', error);
                return [];
            }
            finally {
                setLoading(false)
            }
        }
        fetchProjects()

    }, [projectId])

    useEffect(() => { setJobSites([]) }, [projectId])

    return (
        <FormControl fullWidth variant='outlined'>
            <InputLabel id="jobsite-label-id" sx={{ top: -8 }}>Site Name</InputLabel>
            <Select
                labelId="jobsite-label-id"
                id="jobsite-id"
                value={selected?.id || ""}
                displayEmpty={false}
                label="Site Name"
                disabled={isDisabled}
                sx={{ borderRadius: "8px", height: "40px" }}
                onChange={handleChange}
            >
                {!!jobsites?.length && <MenuItem disabled value={""}>None</MenuItem>}
                {(!jobsites?.length && !loading)
                    ?
                    <MenuItem disabled value={""}>No Data Available</MenuItem>
                    :
                    jobsites?.map(jobsite => (
                        <MenuItem key={jobsite?.id} value={jobsite?.id}>{jobsite?.name}</MenuItem>
                    ))}
                {loading && <MenuItem disabled value={""}>Loading...</MenuItem>}
            </Select>
        </FormControl>
    );
};

