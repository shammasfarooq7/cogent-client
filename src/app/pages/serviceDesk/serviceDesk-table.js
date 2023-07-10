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
import { DELETE_TICKET_MUTATION, GET_ALL_TICKETS_QUERY, GET_TODAY_TICKET_QUERY } from '../../../graphql/tickets';
import DeleteAlert from '../../components/common/DeleteAlert';
import { SDForm } from '../../components/tickets/addTicket/AddTicketForm';
import { Alert } from '../../components/common/Alert';
import { useNavigate } from 'react-router-dom';
import useDebounce from '../../customHooks/useDebounce';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { renderStatus } from '../../constants';
import { TicketDetails } from './TicketDetails';


export const ServiceDeskTable = ({ tableName, search, setTicketTabelRefetch, ticketTableRefetch, label = 'All Tickets', todays = false, external = false, hideAddTicketButton = false }) => {

    const navigate = useNavigate();

    const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
    const [openSDForm, setOpenSDForm] = useState(false);
    const [openViewForm, setOpenViewForm] = useState(false);
    const [ticket, setTicket]= useState({})
    const [allticket, setAllTicket] = useState([])
    const [searchValue, setSearchValue] = useState(null);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [editInfo, setEditInfo] = useState(null);


   

    //dummyData this need to be replaced with api data
  


    const searchQuery = useDebounce(searchValue, 500);


    const { data, loading, refetch } = useQuery(GET_ALL_TICKETS_QUERY, {
        variables: {
            getAllTicketsInput: {
                page,
                limit,
                ...(searchQuery && { searchQuery }),
                external
            }
        },
        fetchPolicy: "network-only",
        onCompleted: (data) => {
             setAllTicket(data)
          }
    });

    // loading, data, refetch will remove once api binding cpomplete and above commented code runs

    const handleChangePage = (event, newPage) => {
        console.log({ newPage });
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
        const currentTicket = allticket?.getAllTickets?.tickets.filter((ticket) => ticket.id === id)
        setTicket(currentTicket[0])
         setOpenViewForm(true)
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

            {openSDForm && <SDForm openModal={openSDForm} setOpenModal={setOpenSDForm} editInfo={editInfo} refetchTickets={refetch} />}
            {openViewForm && <TicketDetails openModal={openViewForm} setOpenModal={setOpenViewForm} info={ticket}  />}

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
                        : !data?.getAllTickets?.count
                            ?
                            <TableRow >
                                <TableCell sx={{ padding: "16px", textAlign: "center" }} colSpan={5} >
                                    No Record Found
                                </TableCell>
                            </TableRow>
                            : data?.getAllTickets?.tickets.map((ticket) => (
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
                                                <VisibilityIcon color='action' />
                                            </Box>
                                            <Box component='img' sx={{ height: "40px", width: "40px", cursor: "pointer", marginY: "4px", marginX: "6px" }}
                                                src={images.Edit} alt='Menu' onClick={() => { handleEditClick(ticket) }} />

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
