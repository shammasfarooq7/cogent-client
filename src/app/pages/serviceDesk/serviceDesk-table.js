import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Button, TablePagination, Typography, Modal, InputLabel, Select, MenuItem, FormControl, Grid } from '@mui/material';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { images } from '../../assets/images';
import { Search } from '../../components/common/Search';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_TICKET_MUTATION, GET_ALL_TICKETS_QUERY, GET_TODAY_TICKET_QUERY, CHANGE_TICKET_STATUS, APPROVE_EXTERNAL_TICKET_MUTATION } from '../../../graphql/tickets';

import DeleteAlert from '../../components/common/DeleteAlert';
import { SDForm } from '../../components/tickets/addTicket/AddTicketForm';
import { Alert } from '../../components/common/Alert';
import { useNavigate } from 'react-router-dom';
import useDebounce from '../../customHooks/useDebounce';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { renderStatus, ticketStatus } from '../../constants';
import { TicketDetails } from './TicketDetails';


const statusStyle = {
    position: 'absolute',
    overflow: 'auto',
    top: '25%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: "8px",
    boxShadow: 54,
    height: "17%",
    width: "30%",
    backgroundColor: "white",
    p: 1.5,
    border: 1

};

export const ServiceDeskTable = ({
    tableName, search, setTicketTabelRefetch, ticketTableRefetch,
    label = 'All Tickets', todays = false, external = false,
    hideAddTicketButton = false, customer = false, approved = true
}) => {

    const navigate = useNavigate();

    const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
    const [openApproveAlert, setOpenApproveAlert] = useState(false);
    const [openSDForm, setOpenSDForm] = useState(false);
    const [openViewForm, setOpenViewForm] = useState(false);
    const [ticket, setTicket] = useState({})
    const [searchValue, setSearchValue] = useState(null);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [editInfo, setEditInfo] = useState(null);
    const [toBeDeleted, setToBeDeleted] = useState(null);
    const [statusModal, setStatusModal] = useState(false);
    const [status, setStatus] = useState('');
    const [currentTicket, setCurrentTicket] = useState({});


    //dummyData this need to be replaced with api data

    const [updateTicketStatus, { loading: isUpdateTicketLoading }] = useMutation(CHANGE_TICKET_STATUS);
    const [approveExternalTicket, { loading: isapproveExternalTicketLoading }] = useMutation(APPROVE_EXTERNAL_TICKET_MUTATION);
    const [deleteTicket] = useMutation(DELETE_TICKET_MUTATION)
    const searchQuery = useDebounce(searchValue, 500);

    const queryVariables = {
        page,
        limit,
        ...(searchQuery && { searchQuery }),
    };

    const queryKey = todays ? GET_TODAY_TICKET_QUERY : GET_ALL_TICKETS_QUERY

    const { data, loading, refetch } = useQuery(queryKey, {
        variables: {
            ...(todays
                ? {
                    getTodayTicketsInput: {
                        ...queryVariables,
                    }
                }
                : {
                    getAllTicketsInput: {
                        ...queryVariables,
                        approved,
                        external
                    }
                })
        },
        fetchPolicy: "network-only",
    })
    const ticketsData = todays ? data?.getTodayTicket : data?.getAllTickets

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setLimit(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDeleteConfirm = async () => {
        try {
            await deleteTicket({
                variables: {
                    id: toBeDeleted
                }
            })
            Alert.success("Deleted Successfully!")
            await refetch()
        } catch (error) {
        }
        finally {
            setOpenDeleteAlert(false);
        }
    }

    const handleApproveConfirm = async () => {
        await approveExternalTicket({
            variables: {
                id: currentTicket?.id,
            }
        });
        currentTicket.isApproved = true;
        Alert.success("Approve Successfully!");
        setOpenApproveAlert(false);
    }

    const handleEditClick = (info) => {
        setEditInfo(info);
        setOpenSDForm(true)
    }

    const handleViewClick = (id) => {
        const currentTicket = ticketsData?.tickets.filter((ticket) => ticket.id === id)
        setTicket(currentTicket[0])
        setOpenViewForm(true)
    }
    const onDeleteClick = (id) => {
        setToBeDeleted(id);
        setOpenDeleteAlert(true);

    }
    const handleApproveClick = (ticket) => {
        if (!ticket.isApproved) {
            setCurrentTicket(ticket);
            setOpenApproveAlert(true);
        }
    }

    const handleStatusClick = (ticket) => {
        setCurrentTicket(ticket);
        setStatusModal(true);
    }

    const updateStatus = (e) => {
        setStatus(e.target.value)
    }

    const changeStatus = async () => {
        await updateTicketStatus({
            variables: {
                changeStatusInput: {
                    ticketId: currentTicket?.id,
                    ticketStatus: status
                }
            }
        });
        Alert.success("Update Successfully!");
        currentTicket.status = status;
        setStatus('');
        setStatusModal(false);
    }

    return (
        <>

            <Modal
                open={statusModal}
                onClose={() => setStatusModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={statusStyle} textAlign='center'>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="statusSelect">Select Status</InputLabel>
                                <Select
                                    labelId="statusSelect"
                                    id="status-select"
                                    value={status}
                                    label="Status"
                                    onChange={updateStatus}
                                >
                                    {
                                        ticketStatus.map((status) => (
                                            <MenuItem value={status.value}>{status.label}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="success" onClick={changeStatus}>Change Status</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
            {(openDeleteAlert || openApproveAlert) &&
                <DeleteAlert
                    open={openDeleteAlert || openApproveAlert}
                    setOpen={openDeleteAlert ? setOpenDeleteAlert : setOpenApproveAlert}
                    handleConfirm={openDeleteAlert ? handleDeleteConfirm : handleApproveConfirm}
                    title={openDeleteAlert ? "Delete?" : "Approve?"}
                    text={
                        openDeleteAlert ? "Are you sure you want to delete this? This action cannot be revert back." :
                            "Are you sure you want to approve this? This action cannot be revert back."
                    }
                />}

            {openSDForm && <SDForm openModal={openSDForm} setOpenModal={setOpenSDForm} editInfo={editInfo} refetchTickets={refetch} />}
            {openViewForm && <TicketDetails openModal={openViewForm} setOpenModal={setOpenViewForm} info={ticket} />}

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography sx={{ color: "black", fontWeight: "600", fontSize: "18px" }}>{label}</Typography>
                {!hideAddTicketButton &&
                    <Box>
                        {search && <Search sx={{ width: "200px" }}
                            onChange={(e) => { setSearchValue(e.target.value) }}
                        />}
                        <Button sx={{ backgroundColor: "#F64E60", color: "white", padding: "6px 30px", marginLeft: "6px" }}
                            onClick={() => { setEditInfo(null); setOpenSDForm(true) }}
                        >Add</Button>
                    </Box>}

            </Box>
            <Table size="small">
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#F5F8FA", borderRadius: "10px" }}>
                        <TableCell sx={{ fontFamily: "Poppins, sans-serif" }}>Ticket Number</TableCell>
                        <TableCell>Customer Ticket No.</TableCell>
                        <TableCell>Cogent Case No.</TableCell>
                        <TableCell>Country</TableCell>
                        <TableCell>Region</TableCell>
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
                        : !ticketsData?.count
                            ?
                            <TableRow >
                                <TableCell sx={{ padding: "16px", textAlign: "center" }} colSpan={5} >
                                    No Record Found
                                </TableCell>
                            </TableRow>
                            : ticketsData?.tickets.map((ticket) => (
                                <TableRow key={ticket.id} sx={{ mt: 2 }}>
                                    <TableCell>
                                        <Box display={"flex"} justifyContent={"center"} flexDirection={"column"}>
                                            <Box sx={{ fontFamily: 'Poppins, sans-serif', fontStyle: "normal", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>ID# {ticket.id}</Box>
                                            <Box sx={{ fontFamily: 'Poppins, sans-serif', fontStyle: "normal", fontWeight: 500, fontSize: "13px", lineHeight: "20px", color: "#B5B5C3" }}>
                                                {ticket.city}, {ticket.country}
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{ticket.customerTicketNumber}</TableCell>
                                    <TableCell>{ticket.cogentCaseNumber}</TableCell>
                                    <TableCell>{ticket.ticketDetail.country}</TableCell>
                                    <TableCell>{ticket.ticketDetail.region}</TableCell>
                                    <TableCell>
                                        {
                                            renderStatus(ticket.status)
                                        }
                                    </TableCell>
                                    <TableCell >
                                        <Box display={"flex"} alignItems={"center"}>
                                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#F5F8FA", padding: "8px", borderRadius: "8px", cursor: "pointer" }}
                                                onClick={() => handleViewClick(ticket.id)} >
                                                <VisibilityIcon color='primary' />
                                            </Box>

                                            <Box sx={{ marginLeft: '5px', display: "flex", alignItems: "center", justifyContent: "center", background: "#F5F8FA", padding: "8px", borderRadius: "8px", cursor: "pointer" }}
                                                onClick={() => handleEditClick(ticket)} >
                                                <EditIcon />
                                            </Box>

                                            <Box sx={{ marginLeft: '5px', display: "flex", alignItems: "center", justifyContent: "center", background: "#F5F8FA", padding: "8px", borderRadius: "8px", cursor: "pointer" }}
                                                onClick={() => onDeleteClick(ticket?.id)} >
                                                <DeleteIcon sx={{ color: "#A1A5B7" }} />
                                            </Box>

                                            <Box sx={{ marginLeft: '5px', display: "flex", alignItems: "center", justifyContent: "center", background: "#F5F8FA", padding: "8px", borderRadius: "8px", cursor: "pointer" }}
                                                onClick={() => { handleStatusClick(ticket) }} >
                                                <ChangeCircleIcon color='secondary' />
                                            </Box>

                                            {customer &&
                                                <Box sx={{ marginLeft: '5px', display: "flex", alignItems: "center", justifyContent: "center", background: "#F5F8FA", padding: "8px", borderRadius: "8px", cursor: "pointer" }}
                                                    onClick={() => { handleApproveClick(ticket) }} >
                                                    {ticket.isApproved ? <ThumbUpAltIcon color='disabled' /> : <ThumbUpAltIcon color='success' />}
                                                </Box>
                                            }


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
