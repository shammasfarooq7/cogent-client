import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Button, TablePagination, Typography } from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
import { ACCEPT_REQUEST_MUTATION, GET_REQUEST_USERS_QUERY } from '../../../graphql/resources';
import { Alert } from '../common/Alert';
import { getName } from '../../helper';


export const RequestUsersTable = ({ resourceTableRefetch }) => {

    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);

    const { data, loading, error, refetch } = useQuery(GET_REQUEST_USERS_QUERY, {
        variables: {
            getNewRequestUsersInput: {
                role: "RESOURCE",
                page,
                limit,
            }
        },
        fetchPolicy: "network-only"
    });

console.log({resourceTableRefetch});

    const [acceptRequest, { loading: acceptRequestLoading }] = useMutation(ACCEPT_REQUEST_MUTATION)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setLimit(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleAcceptClick = async (id) => {
        await acceptRequest({
            variables: {
                id

            }
        })
        await refetch();
        if (resourceTableRefetch) {
            await resourceTableRefetch();
        }
        Alert.success("Request Approved Successfully!")
    }


    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography sx={{ color: "black", fontWeight: "600", fontSize: "18px" }}>User Requests</Typography>
            </Box>
            <Table size="small">
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#F5F8FA", borderRadius: "10px" }}>
                        <TableCell>Resource ID</TableCell>
                        <TableCell>Email</TableCell>
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
                        : !data?.getNewRequestUsers?.users?.length
                            ?
                            <TableRow >
                                <TableCell sx={{ padding: "16px", textAlign: "center" }} colSpan={5} >
                                    No Record Found
                                </TableCell>
                            </TableRow>
                            : data?.getNewRequestUsers?.users?.map((resource) => (
                                <TableRow key={resource.id} sx={{ mt: 2 }}>
                                    <TableCell width={"30%"}>
                                        <Box display={"flex"} justifyContent={"center"} flexDirection={"column"}>
                                            <Box sx={{ fontFamily: 'Poppins, sans-serif', fontStyle: "normal", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>{getName(resource.firstName, resource.middleName, resource.lastName)} </Box>
                                            <Box sx={{ fontFamily: 'Poppins, sans-serif', fontStyle: "normal", fontWeight: 500, fontSize: "13px", lineHeight: "20px", color: "#B5B5C3" }}>
                                                ID# {resource.id}
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell width={"30%"}>{resource.email || "_ _"}</TableCell>
                                    <TableCell>
                                        <Button size='small' variant='contained' color='success' disabled={acceptRequestLoading}
                                            sx={{ fontFamily: "Poppins,sans-serif", fontSize: "13px" }}
                                            onClick={() => (handleAcceptClick(resource.id))}>
                                            {acceptRequestLoading ? "Accepting..." : "Accept Request"}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                </TableBody>
            </Table >
            <Box display={"flex"} justifyContent={"end"} marginTop={2}>
                <TablePagination
                    component="div"
                    count={data?.getNewRequestUsers?.count || 0}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={limit}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </>
    );
}
