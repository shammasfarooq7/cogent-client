import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Button, TablePagination, Typography } from '@mui/material';
import { images } from '../../assets/images';
import { Search } from '../../components/common/Search';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_TICKET_MUTATION, GET_ALL_TICKETSS_QUERY } from '../../../graphql/tickets';
import DeleteAlert from '../../components/common/DeleteAlert';
import { Alert } from '../../components/common/Alert';
import { useNavigate } from 'react-router-dom';
import useDebounce from '../../customHooks/useDebounce';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { renderStatus } from '../../constants';
import { CustomerForm } from './CustomerForm';
import { CustomerPopup } from './CustomerPopup';
import { GET_ALL_PROJECTS_QUERY } from '../../../graphql/admin';
import { ProjectView } from '../Admin/Project/ProjectView';


export const CustomerTable = ({ tableName, buttonText, search, setTicketTabelRefetch, ticketTableRefetch, todays=false}) => {

    const navigate = useNavigate();

    const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
    const [openSDForm, setOpenSDForm] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const [toBeDeleted, setToBeDeleted] = useState(null);
    const [searchValue, setSearchValue] = useState(null);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [editInfo, setEditInfo] = useState(null);
    const [openViewForm, setOpenViewForm] = useState(false);
    const [ticket, setTicket]= useState({})
    
   


    const searchQuery = useDebounce(searchValue, 500);

    const { data, loading, refetch } = useQuery(GET_ALL_PROJECTS_QUERY, {
        variables: {
            getAllProjectsInput: {
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
    const handleViewClick = (id) => {
        const currentTicket = data?.getAllProjects?.projects.filter((ticket) => ticket.id === id)
        setTicket(currentTicket[0])
         setOpenViewForm(true)
    }

    const handleEditPopup = (info) => {
        setEditInfo(info);
        setOpenPopup(true)
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

            {openPopup && <CustomerPopup openModal={openPopup} setOpenModal={setOpenPopup} editInfo={editInfo} refetchResources={refetch} />}
            {openSDForm && <CustomerForm openModal={openSDForm} setOpenModal={setOpenSDForm} editInfo={editInfo} refetchResources={refetch} />}
            {openViewForm && <ProjectView openModal={openViewForm} setOpenModal={setOpenViewForm} info={ticket}  />}

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography sx={{ color: "black", fontWeight: "600", fontSize: "18px" }}>{tableName}</Typography>
                <Box>
                    {search && <Search sx={{ width: "200px" }}
                        onChange={(e) => { setSearchValue(e.target.value) }}
                    />}
                   { buttonText && <Button sx={{ backgroundColor: "#F64E60", color: "white", padding: "6px 30px", marginLeft: "6px" }}
                        onClick={() => { setEditInfo(null); setOpenSDForm(true) }}
                    >{buttonText}</Button>}
                </Box>

            </Box>
            <Table size="small">
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#F5F8FA", borderRadius: "10px" }}>
                        <TableCell sx={{ fontFamily: "Poppins, sans-serif" }}>Project ID</TableCell>
                        {/* <TableCell>SERVICE TYPE</TableCell>
                        <TableCell>SCOPE OF WORK</TableCell> */}
                        <TableCell>START DATE</TableCell>
                        <TableCell>END DATE</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell >Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody sx={{ marginTop: "10px" }}>

                    { loading
                        ? <TableRow >
                            <TableCell sx={{ padding: "16px", textAlign: "center" }} colSpan={5} >
                               ...Loading
                            </TableCell>
                        </TableRow>
                        : data?.getAllProjects?.count && data?.getAllProjects?.count == 0
                            ?
                            <TableRow >
                                <TableCell sx={{ padding: "16px", textAlign: "center" }} colSpan={5} >
                                    No Record Found
                                </TableCell>
                            </TableRow>
                            : data?.getAllProjects?.projects.map((ticket) => (
                                <TableRow key={ticket.id} sx={{ mt: 2 }}>
                                    <TableCell>
                                        <Box display={"flex"} justifyContent={"center"} flexDirection={"column"}>
                                            <Box sx={{ fontFamily: 'Poppins, sans-serif', fontStyle: "normal", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>ID# {ticket.id}</Box>
                                            <Box sx={{ fontFamily: 'Poppins, sans-serif', fontStyle: "normal", fontWeight: 500, fontSize: "13px", lineHeight: "20px", color: "#B5B5C3" }}>
                                                {ticket.city}, {ticket.country}
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    {/* <TableCell>{ticket.serviceType}</TableCell>
                                    <TableCell>{ticket.scopeOfWork}</TableCell> */}
                                    <TableCell>{ticket.startDate}</TableCell>
                                    <TableCell>{ticket.startDate}</TableCell>
                                    <TableCell>
                                        {
                                            renderStatus(ticket.status)
                                        }
                                    </TableCell>
                                    <TableCell >
                                        <Box display={"flex"} alignItems={"center"}>
                                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#F5F8FA", padding: "8px", borderRadius: "8px", cursor: "pointer" }}
                                                onClick={() => { handleViewClick(ticket.id) }} >
                                                <VisibilityIcon color='action' />
                                            </Box>
                                            {/* <Box component='img' sx={{ height: "40px", width: "40px", cursor: "pointer", marginY: "4px", marginX: "6px" }}
                                                 src={images.Edit} alt='Menu' onClick={() => { handleEditPopup(ticket) }} />
                                            <Box component='img' sx={{ height: "40px", width: "40px", cursor: "pointer", marginY: "4px", marginX: "1px" }}
                                                src={images.Trash} alt='Menu'onClick={() => { onDeleteClick(ticket?.id) }}
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
