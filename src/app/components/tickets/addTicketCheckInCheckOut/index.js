import { useMutation, useQuery } from "@apollo/client";
import { format } from "date-fns";
import { Modal, Box, Typography, Avatar, Button, Radio, FormControlLabel, TextField } from "@mui/material"
import { useContext, useState } from "react";
import { convertTimeToUTCTime, filterCheckInOutTimeForRole, getName, getTimeFromDate } from "../../../helper";
import { GET_TIME_SHEETS_QUERY, TIME_SHEET_CHECK_IN_OUT } from "../../../../graphql/tickets";
import { Alert } from "../../common/Alert";
import { UserContext } from "../../../context/user-context";
import { ROLE } from "../../../constants";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    height: "80%",
    overflowY: "auto",
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: '12px',
    boxShadow: 24,
    p: 4,
};

const Record = ({ item, refetch }) => {
    const { user } = useContext(UserContext)
    const role = user?.roles?.[0]?.role || ""
    const [checkInTime, setCheckInTime] = useState(null);
    const [checkOutTime, setCheckOutTime] = useState(null);

    const { checkIn, checkOut } = filterCheckInOutTimeForRole(item, role);

    const [submitTime, { data, loading, error, reset }] = useMutation(TIME_SHEET_CHECK_IN_OUT, {
        variables: {
            checkinCheckoutInput: {
                resourceId: item?.resource?.id,
                ticketDateId: item?.ticketDate?.id,
                checkinOrCheckout: checkInTime ? 'CHECK_IN' : 'CHECK_OUT',
                time: convertTimeToUTCTime(checkInTime || checkOutTime)
            }
        }
    });

    const { timeSheetCheckInOut } = data || {};

    const isError = checkIn ? checkOutTime <= getTimeFromDate(checkIn) : false;
    const isSubmitDisabled = (!checkInTime && !checkOutTime) || (checkIn && checkOut) || data || loading || isError;

    const handleSubmit = async () => {
        try {
            await submitTime();
            await refetch()
            setCheckInTime(null)
            setCheckOutTime(null)
        } catch (error) {
        }
        finally {
        }
    }

    if (timeSheetCheckInOut) {
        const { message } = timeSheetCheckInOut || {};
        Alert.success(message || "Assigned Successfully");
        setTimeout(() => { reset() }, 3000)
    }

    return (
        <Box key={item?.id}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px', marginLeft: '-14px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ height: '50px', width: '50px' }} />
                    <Box sx={{ marginLeft: '12px', maxWidth: "150px" }}>
                        <Typography sx={{ color: '#464E5F', fontWeight: '500', fontFamily: 'Poppins', fontSize: '14px' }}>{getName(item?.resource?.firstName, item?.resource?.middleName, item?.resource?.lastName)}</Typography>
                        <Typography sx={{ color: ' #B5B5C3', fontWeight: '500', fontFamily: 'Poppins', fontSize: '13px' }}>ID#{item?.resource?.id}</Typography>
                    </Box>
                </Box>
                <Typography sx={{ maxWidth: "200px" }}>{format(new Date(item?.ticketDate?.date), "dd MMM yyyy") || "_ _"}</Typography>

                <Box>
                    <TextField
                        placeholder='Select Time'
                        type='time'
                        value={checkIn ? getTimeFromDate(checkIn) : checkInTime}
                        disabled={checkIn}
                        size='small'
                        onChange={(e) => { setCheckInTime(`${e.target.value}:00`) }}
                        sx={{ marginLeft: "4px", height: "40px", borderRadius: '8px' }}
                    />
                    {isError && <Box>&nbsp;</Box>}
                </Box>

                <Box>
                    <TextField
                        placeholder='Select Time'
                        type='time'
                        size='small'
                        value={checkOut ? getTimeFromDate(checkOut) : checkOutTime}
                        disabled={checkOut || !checkIn}
                        onChange={(e) => { setCheckOutTime(`${e.target.value}:00`) }}
                        sx={{ marginLeft: "4px", height: "40px", borderRadius: '8px' }}
                    />
                    {isError && <Box sx={{ fontSize: 12, color: "red" }}>Invalid checkout time</Box>}
                </Box>

                <Button style={{ width: 103 }} variant="contained" color="info" disabled={isSubmitDisabled} onClick={handleSubmit}>
                    {(checkIn && checkOut) ? "Submited" : "Submit"}
                </Button>
            </Box>
        </Box>
    )
}

const AddTimeSheetModal = ({ open, handleClose, ticketInfo }) => {

    const { user } = useContext(UserContext)
    const [page, setPage] = useState(0);


    const isResource = user?.roles?.find(item => item?.role?.toLowerCase() === ROLE.RESOURCE)

    const { data, loading, error, refetch } = useQuery(GET_TIME_SHEETS_QUERY, {
        variables: {
            ticketId: ticketInfo?.id
        },
        fetchPolicy: "network-only"
    })
    const { ticketTimeSheetData } = data || {};
    const resources = isResource ? ticketTimeSheetData?.filter(item => item?.resource?.id === user?.resource?.id) : ticketTimeSheetData


    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>

                <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} marginBottom={3}>
                    <Box sx={{ fontSize: 18, fontWeight: 600 }}>Timesheets</Box>
                </Box>
                <Box sx={{ p: 1, background: "#EFF4FA", color: "#464E5F", borderRadius: "5px", fontWeight: "600", fontSize: "14px", display: 'flex', justifyContent: 'space-between' }}>
                    <Typography id="modal-modal-description" >
                        Resource Id
                    </Typography>
                    <Typography id="modal-modal-description" >
                        Ticket Date
                    </Typography>
                    <Typography id="modal-modal-description" >
                        Check In  Time
                    </Typography>
                    <Typography id="modal-modal-description" >
                        Check Out Time
                    </Typography>
                    {/* <Typography id="modal-modal-description" >
                        Check In/Out
                    </Typography> */}
                    <Typography id="modal-modal-description" >
                        Action
                    </Typography>
                </Box>
                {loading ?
                    <Box>Loading...</Box>
                    : <>
                        {resources?.map(item => (
                            <Record  {...{ item, refetch }} />
                        ))}
                        {/* {count > resources?.length &&
                            <Box sx={{ display: "flex", justifyContent: "center", marginTop: "12px", fontSize: 12, }}>
                                <Button disabled={loading} onClick={() => { setPage(page + 1) }}> Show More</Button>
                            </Box>
                        } */}
                    </>
                }
            </Box>
        </Modal>
    )
}

export default AddTimeSheetModal