// packages block
import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import "./../../common/style.css"
import { useApolloClient } from '@apollo/client';
import { GET_PROJECT_BY_CUSTOMERS_QUERY } from '../../../../graphql/tickets';

export const ProjectDropdown = ({ selected, setSelected, customerId, isDisabled = false }) => {
    const client = useApolloClient();
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(false)
    // const [selected, setSelected] = useState(null)


    const handleChange = (e) => {
        const project = projects.find(project => project?.id === e?.target?.value);
        setSelected(project)
    }

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                if (!customerId) return []
                setLoading(true)
                const { data } = await client.query({
                    query: GET_PROJECT_BY_CUSTOMERS_QUERY,
                    variables: {
                        id: customerId,
                        getProjectsByCustomerInput: {}
                    },
                    fetchPolicy: 'network-only',
                });

                setProjects(
                    data?.getProjectByCustomer
                    // ?.map(item => ({
                    //     value: item?.id,
                    //     label: item?.name
                    // }))
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

    }, [customerId])

    useEffect(() => { setProjects([]) }, [customerId])

    return (
        <FormControl fullWidth variant='outlined'>
            <InputLabel id="demo-simple-select-label" sx={{ top: -8 }}>Projects</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selected?.id || ""}
                displayEmpty={false}
                label="Projects"
                disabled={isDisabled}
                sx={{ borderRadius: "8px", height: "40px" }}
                onChange={handleChange}
            >
                {!!projects?.length && <MenuItem disabled value={""}>None</MenuItem>}
                {(!projects?.length && !loading)
                    ?
                    <MenuItem disabled >No Data Available</MenuItem>
                    :
                    projects?.map(project => (
                        <MenuItem key={project?.id} value={project?.id}>{project?.name}</MenuItem>
                    ))
                }

                {loading && <MenuItem disabled value={""}>Loading...</MenuItem>}
            </Select>
        </FormControl>
    );
};

