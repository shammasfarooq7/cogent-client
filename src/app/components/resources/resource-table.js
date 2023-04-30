import { Fragment } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { images } from './../../assets/images';
import { Search } from '../common/Search';
import Title from '../common/Title';
import { useQuery } from '@apollo/client';
import { GET_ALL_USERS_QUERY } from '../../../graphql/resources';

function preventDefault(event) {
    event.preventDefault();
}

export const ResourceTable = ({ tableName, search }) => {

    const { data, loading, error } = useQuery(GET_ALL_USERS_QUERY, {
        variables: {
            getAllUsersInput: {
                role: "RESOURCE"
            }
        },
    });

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Title sx={{ color: "black" }}>Add Resources</Title>
                <Box>
                    {search && <Search sx={{ width: "200px" }}

                    />}
                    {search && <Button sx={{ backgroundColor: "#242D60", color: "white", padding: "6px 30px", marginLeft: "6px" }}>Add</Button>}
                </Box>

            </Box>
            <Table size="small">
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#F5F8FA", borderRadius: "10px" }}>
                        <TableCell>Resource ID</TableCell>
                        <TableCell>Country</TableCell>
                        <TableCell>City</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell >Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody sx={{ marginTop: "10px" }}>

                    {loading
                        ? <TableRow >
                            <TableCell sx={{ padding: "16px", textAlign: "center" }} colSpan={5} >
                                Loading...
                            </TableCell>
                        </TableRow>
                        : !data?.getAllUsers?.length
                            ?
                            <TableRow >
                                <TableCell sx={{ padding: "16px", textAlign: "center" }} colSpan={5} >
                                    No Record Found
                                </TableCell>
                            </TableRow>
                            : data?.getAllUsers?.map((resource) => (
                                <TableRow key={resource.id} sx={{ mt: 2 }}>
                                    <TableCell>
                                        <Box display={"flex"} justifyContent={"center"} flexDirection={"column"}>
                                            <Box sx={{ fontFamily: 'Poppins, sans-serif', fontStyle: "normal", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>{resource.firstName} {resource.middleName} {resource.lastName}</Box>
                                            <Box sx={{ fontFamily: 'Poppins, sans-serif', fontStyle: "normal", fontWeight: 500, fontSize: "13px", lineHeight: "20px", color: "#B5B5C3" }}>
                                                ID# {resource.id}
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{resource.country || "_ _"}</TableCell>
                                    <TableCell>{resource.city || "_ _"}</TableCell>
                                    <TableCell>{resource.isOnboarded ? <>Onboarding Completed</> : <>Documents Pending</>}</TableCell>
                                    <Box sx={{ display: "flex" }}>
                                        <TableCell ><Box component='img' sx={{ height: "40px", width: "40px" }} src={images.Menu} alt='Menu' /></TableCell>
                                        <TableCell ><Box component='img' sx={{ height: "40px", width: "40px" }} src={images.Edit} alt='Menu' /></TableCell>
                                        <TableCell ><Box component='img' sx={{ height: "40px", width: "40px" }} src={images.Trash} alt='Menu' /></TableCell>
                                    </Box>
                                </TableRow>
                            ))}
                </TableBody>
            </Table >
            {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link> */}
        </>
    );
}
