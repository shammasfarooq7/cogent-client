import { useState } from 'react';
import { format } from "date-fns"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, TablePagination, Tooltip, Typography } from '@mui/material';
import { images } from '../../assets/images';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_TICKET_MUTATION, GET_ALL_TICKETS_QUERY, GET_TODAY_TICKET_QUERY } from '../../../graphql/tickets';
import DeleteAlert from '../../components/common/DeleteAlert';
import { Alert } from '../../components/common/Alert';
import { useNavigate } from 'react-router-dom';
import useDebounce from '../../customHooks/useDebounce';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { renderStatus } from '../../constants';
import { TicketDetails } from '../serviceDesk/TicketDetails';
import { SDForm } from '../../components/tickets/addTicket/AddTicketForm';


export const FeopsTable = ({ tableName, search, setTicketTabelRefetch, ticketTableRefetch, todays = false, approved = true }) => {

    const navigate = useNavigate();

    const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
    const [openSDForm, setOpenSDForm] = useState(false);
    const [openViewForm, setOpenViewForm] = useState(false);
    const [ticket, setTicket] = useState({})
    const [allticket, setAllTicket] = useState([])
    const [toBeDeleted, setToBeDeleted] = useState(null);
    const [searchValue, setSearchValue] = useState(null);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [editInfo, setEditInfo] = useState(null);


    const searchQuery = useDebounce(searchValue, 500);

    const queryVariables = {
        page,
        limit,
        ...(searchQuery && { searchQuery }),
    };

    const queryKey = todays ? GET_TODAY_TICKET_QUERY : GET_ALL_TICKETS_QUERY

    const [deleteTicket] = useMutation(DELETE_TICKET_MUTATION)
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
                        approved
                    }
                })
        },
        fetchPolicy: "network-only",
    })
    const allTickets = todays ? data?.getTodayTicket : data?.getAllTickets


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

    const handleViewClick = (id) => {
        const currentTicket = allTickets?.tickets?.filter((ticket) => ticket.id === id)
        setTicket(currentTicket[0])
        setOpenViewForm(true)
    }

    const handleEditClick = (info) => {
        setEditInfo(info);
        setOpenSDForm(true)
    }

    const onDeleteClick = (id) => {
        setToBeDeleted(id);
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
            {openViewForm && <TicketDetails openModal={openViewForm} setOpenModal={setOpenViewForm} info={ticket} />}
            {openSDForm && <SDForm openModal={openSDForm} setOpenModal={setOpenSDForm} editInfo={editInfo} refetchTickets={refetch} />}

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography sx={{ color: "black", fontWeight: "600", fontSize: "18px" }}>{tableName}</Typography>

            </Box>
            <Table size="small">
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#F5F8FA", borderRadius: "10px" }}>
                        <TableCell sx={{ fontFamily: "Poppins, sans-serif" }}>Ticket Number</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Country</TableCell>
                        <TableCell>Check In/Out</TableCell>
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
                        : !allTickets?.tickets?.length
                            ?
                            <TableRow >
                                <TableCell sx={{ padding: "16px", textAlign: "center" }} colSpan={5} >
                                    No Record Found
                                </TableCell>
                            </TableRow>
                            : allTickets?.tickets?.map((ticket) => (
                                <TableRow key={ticket.id} sx={{ mt: 2 }}>
                                    <TableCell>
                                        <Box display={"flex"} justifyContent={"center"} flexDirection={"column"}>
                                            <Box sx={{ fontFamily: 'Poppins, sans-serif', fontStyle: "normal", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>ID# {ticket.id}</Box>
                                            <Box sx={{ fontFamily: 'Poppins, sans-serif', fontStyle: "normal", fontWeight: 500, fontSize: "13px", lineHeight: "20px", color: "#B5B5C3" }}>
                                                {ticket.ticketDetail?.city}, {ticket?.ticketDetail.country}
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ display: "flex", alignItems: "center", height: 61 }}>{ticket?.ticketDates?.slice(0, 3)?.map(item => format(new Date(item?.date), "dd MMM yyyy"))?.join(", ")}
                                        {!!ticket?.ticketDates?.slice(3)?.length &&
                                            <Tooltip title={
                                                <Box>
                                                    {ticket?.ticketDates?.slice(3)?.map(item => <Box> {format(new Date(item?.date), "dd MMM yyyy")}</Box>)}
                                                </Box>}>
                                                <Box sx={{ fontWeight: 600 }}>{`  `}+ {ticket?.ticketDates?.slice(3)?.length} others </Box>
                                            </Tooltip>
                                        }
                                    </TableCell>
                                    {/* <TableCell>{format(ticket?.ticketDates?.[0]?.scheduledTime,"h")}</TableCell> */}
                                    <TableCell>{ticket?.ticketDates?.[0]?.scheduledTime}</TableCell>
                                    <TableCell>{ticket?.ticketDetail.country}</TableCell>
                                    <TableCell>{ticket.checkInOrOut}</TableCell>
                                    <TableCell>
                                        {
                                            renderStatus(ticket.status)
                                        }
                                    </TableCell>
                                    <TableCell >
                                        <Box display={"flex"} alignItems={"center"}>
                                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#F5F8FA", padding: "8px", borderRadius: "8px", cursor: "pointer" }}
                                                onClick={() => { handleViewClick(ticket?.id) }} >
                                                <VisibilityIcon color='action' />
                                            </Box>
                                            <Box component='img' sx={{ height: "40px", width: "40px", cursor: "pointer", marginY: "4px", marginX: "6px" }}
                                                src={images.Edit} alt='Menu' onClick={() => { handleEditClick(ticket) }} />
                                            <Box component='img' sx={{ height: "40px", width: "40px", cursor: "pointer", marginY: "4px", marginX: "1px" }}
                                                src={images.Trash} alt='Menu' onClick={() => { onDeleteClick(ticket?.id) }}
                                            />

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
