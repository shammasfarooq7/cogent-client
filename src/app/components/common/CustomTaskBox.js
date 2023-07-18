import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { images } from '../../assets/images';
import { Avatar, TablePagination } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import useDebounce from '../../customHooks/useDebounce';
import { useQuery } from '@apollo/client';
import { GET_ALL_TICKETS_QUERY, GET_RESOURCE_TICKET_QUERY, GET_TODAY_TICKET_QUERY } from '../../../graphql/tickets';
import { TicketView } from '../../pages/Admin/Tickets/TicketView';
import { UserContext } from '../../context/user-context';
import { SDForm } from '../tickets/addTicket/AddTicketForm';
import { ROLE, renderStatus } from '../../constants';

export const TaskBox = ({ taskName, buttonText, todays, type }) => {
  const { user } = useContext(UserContext)
  const [openViewForm, setOpenViewForm] = useState(false);
  const [ticket, setTicket] = useState({});
  const [searchValue, setSearchValue] = useState(null);
  const [openSDForm, setOpenSDForm] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const searchQuery = useDebounce(searchValue, 500);
  const isResource = user?.roles?.find(item => item?.role?.toLowerCase() === ROLE.RESOURCE)

  const queryVariables = {
    page,
    limit,
    ...(searchQuery && { searchQuery }),
  };

  const resourceTicketsQueryVariables = {
    page,
    limit,
    ...(todays ? { today: true } : { future: true }),
  };

  const queryKey = isResource ? GET_RESOURCE_TICKET_QUERY : todays ? GET_TODAY_TICKET_QUERY : GET_ALL_TICKETS_QUERY

  const { data, loading, refetch } = useQuery(queryKey, {
    variables: {
      ...(
        isResource ?
          {
            getResourceTicketInput: {
              ...resourceTicketsQueryVariables
            }
          }
          : todays
            ? {
              getTodayTicketsInput: {
                ...queryVariables,
              }
            }
            : {
              getAllTicketsInput: {
                ...queryVariables,
              }
            })
    }
  })

  const formatDataForResource = (data) => {
    const tickets = [];
    const { ticketDates, count = 0 } = data || {}

    if (ticketDates?.length) {
      ticketDates?.forEach(ticketDate => {
        const { date, scheduledTime } = ticketDate || {}
        const ticketObj = {
          ...ticketDate?.ticket,
          ticketDate: {
            date,
            scheduledTime
          }
        }
        tickets.push(ticketObj)
      })
    }

    return { count, tickets }
  }

  const ticketsData = isResource ? formatDataForResource(data?.getResourceTickets) : todays ? data?.getTodayTicket : data?.getAllTickets;

  const handleViewClick = (ticket) => {
    setTicket(ticket);
    setOpenViewForm(true);
  };

  const handleEditClick = (ticket) => {
    setOpenSDForm(true);
    setTicket(ticket)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ background: '#FFFFFF', padding: '14px', height: '449px', overflowY: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ fontSize: '18px', fontWeight: '600', marginBottom: '14px' }}>{taskName}</Typography>
        {buttonText &&
          <Button sx={{ backgroundColor: '#F64E60', color: 'white', padding: '6px 20px', marginBottom: '8px' }}
            onClick={() => { setOpenSDForm(true); setTicket(null) }}
          >
            {buttonText}
          </Button>
        }
      </Box>
      {openViewForm && <TicketView openModal={openViewForm} setOpenModal={setOpenViewForm} info={ticket} type={type} />}
      {openSDForm && <SDForm openModal={openSDForm} setOpenModal={setOpenSDForm} refetchTickets={refetch} editInfo={ticket} />}

      <Table>
        <TableHead>
          <TableRow sx={{ background: '#EFF4FA', color: '#464E5F', borderRadius: '5px', fontWeight: '600', fontSize: '14px' }}>
            <TableCell>Task Id</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell sx={{ padding: '16px', textAlign: 'center' }} colSpan={5}>
                Loading...
              </TableCell>
            </TableRow>
          ) : !ticketsData?.count ? (
            <TableRow>
              <TableCell sx={{ padding: '16px', textAlign: 'center' }} colSpan={5}>
                No Record Found
              </TableCell>
            </TableRow>
          ) : (
            ticketsData?.tickets.map((ticket) => (
              <TableRow
                key={ticket?.id}
                sx={{ marginTop: '20px', marginLeft: '-6px' }}
              >
                <TableCell>
                  <Box>
                    {todays ?
                      <Box sx={{ display: 'flex' }}>
                        <Avatar sx={{ height: '50px', width: '50px' }} />
                        <Box sx={{ marginLeft: '12px' }}>
                          <Typography sx={{ color: '#1ebbe3', fontWeight: '500', fontFamily: 'Poppins', fontSize: '11px' }}>
                            {`${ticket?.customerName || '--'}`}
                          </Typography>
                          <Typography sx={{ color: ' #B5B5C3', fontWeight: '500', fontFamily: 'Poppins', fontSize: '13px' }}>
                            {`ID#${ticket?.id || '--'}`}
                          </Typography>
                        </Box>
                      </Box>
                      :
                      <Box sx={{ marginLeft: '12px' }}>
                        <Typography sx={{ color: ' #B5B5C3', fontWeight: '500', fontFamily: 'Poppins', fontSize: '13px' }}>
                          {`ID#${ticket?.id || '--'}`}
                        </Typography>
                        <Typography sx={{ color: '#1ebbe3', fontWeight: '500', fontFamily: 'Poppins', fontSize: '11px' }}>
                          {`${ticket?.ticketDetail?.city || '--'},${ticket?.ticketDetail?.country || '--'}`}
                        </Typography>
                      </Box>
                    }

                  </Box>
                </TableCell>
                <TableCell>
                  <Typography>
                    {ticket?.status ? renderStatus(ticket.status) : '--'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box display={'flex'} alignItems={'center'}>
                    {!todays && !isResource &&
                      <Box
                        component="img"
                        sx={{
                          height: '40px',
                          width: '40px',
                          cursor: 'pointer',
                          marginY: '4px',
                          marginX: '6px',
                        }}
                        src={images.Edit}
                        alt="Menu"
                        onClick={() => { handleEditClick(ticket) }}
                      />}
                    <Box
                      component="img"
                      sx={{
                        height: '40px',
                        width: '40px',
                        cursor: 'pointer',
                        marginY: '4px',
                        marginX: '1px',
                      }}
                      src={images.View}
                      alt="Menu"
                      onClick={() => {
                        handleViewClick(ticket);
                      }}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <Box display={"flex"} justifyContent={"end"} marginTop={2}>
        <TablePagination
          component="div"
          count={ticketsData?.count || 0}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={limit}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
};
