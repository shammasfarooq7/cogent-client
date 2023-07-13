import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Button, TablePagination, Typography } from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
// import { DELETE_TICKET_MUTATION, GET_ALL_TICKETSS_QUERY } from '../../../graphql/tickets';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { images } from '../../../assets/images';
import DeleteAlert from '../../../components/common/DeleteAlert';
import { Alert } from '../../../components/common/Alert';
import useDebounce from '../../../customHooks/useDebounce';
import { renderStatus } from '../../../constants';
import { CreateUser } from './CreateUser';
import { Search } from '../../../components/common/Search';
import { GET_ALL_USERS_QUERY } from '../../../../graphql/admin';


export const UserTable = ({ tableName, search, setUserTabelRefetch, userTableRefetch}) => {

    const navigate = useNavigate();

    const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
    const [openSDForm, setOpenSDForm] = useState(false);
    const [toBeDeleted, setToBeDeleted] = useState(null);
    const [searchValue, setSearchValue] = useState(null);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [editInfo, setEditInfo] = useState(null);

    const searchQuery = useDebounce(searchValue, 500);

    const { data, loading, refetch } = useQuery(GET_ALL_USERS_QUERY, {
        variables: {
            getAllUsersInput: {
                page,
                limit,
                ...(searchQuery && { searchQuery })
            }
        },
        fetchPolicy: "network-only"
    });


    // loading, data, refetch will remove once api binding cpomplete and above commented code runs
   
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setLimit(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDeleteConfirm = async () => {
        Alert.success("Deleted Successfully!")

        setOpenDeleteAlert(false);
    }

    const handleEditClick = (info) => {
        setEditInfo(info);
        setOpenSDForm(true)
    }

    const onDeleteClick = (id) => {
        setOpenDeleteAlert(true);
    }

    return (
        <>
            <DeleteAlert
                open={openDeleteAlert}
                setOpen={setOpenDeleteAlert}
                handleConfirm={handleDeleteConfirm}
                title={"Delete?"}
                text={"Are you sure you want to delete this? This action cannot be revert back."}
            />

            {openSDForm && <CreateUser openModal={openSDForm} setOpenModal={setOpenSDForm} editInfo={editInfo} refetchResources={refetch} />}

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography sx={{ color: "black", fontWeight: "600", fontSize: "18px" }}>User's Listing</Typography>
                <Box>
                    {search && <Search sx={{ width: "200px" }}
                        onChange={(e) => { setSearchValue(e.target.value) }}
                    />}
                    <Button sx={{ backgroundColor: "#F64E60", color: "white", padding: "6px 30px", marginLeft: "6px" }}
                        onClick={() => { setEditInfo(null); setOpenSDForm(true) }}
                    >Add</Button>
                </Box>

            </Box>
            <Table >
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#F5F8FA", borderRadius: "10px" }}>
                        <TableCell sx={{ fontFamily: "Poppins, sans-serif" }}>User ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
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
                        : data?.count && data.count == 0
                            ?
                            <TableRow >
                                <TableCell sx={{ padding: "16px", textAlign: "center" }} colSpan={5} >
                                    No Record Found
                                </TableCell>
                            </TableRow>
                            : data?.getAllUsers?.users.map((user) => (
                                <TableRow key={user.id} sx={{ mt: 2 }}>
                                    <TableCell>
                                        <Box display={"flex"} justifyContent={"center"} flexDirection={"column"}>
                                            <Box sx={{ fontFamily: 'Poppins, sans-serif', fontStyle: "normal", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>ID# {user.id}</Box>
                
                                        </Box>
                                    </TableCell>
                                    <TableCell>{user.firstName + ' ' + user.lastName } </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.roles.map(role => role.role).join()}</TableCell>
                                    <TableCell >
                                        <Box display={"flex"} alignItems={"center"}>
                                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#F5F8FA", padding: "8px", borderRadius: "8px", cursor: "pointer" }}
                                                // onClick={() => { navigate(`/admin/userview`) }} 
                                                >
                                                <VisibilityIcon color='action' />
                                            </Box>
                                            {/* <Box component='img' sx={{ height: "40px", width: "40px", cursor: "pointer", marginY: "4px", marginX: "1px" }}
                                                src={images.Trash} alt='Menu'onClick={() => { onDeleteClick(user?.id) }}
                                        /> */}
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                </TableBody>
            </Table >
            <Box display={"flex"} justifyContent={"end"} marginTop={2}>
                <TablePagination
                    component="div"
                    count={data?.getAllUsers?.count || 0}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={limit}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </>
    );
}

