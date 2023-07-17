import { useMutation, useQuery } from "@apollo/client";
import { format } from "date-fns";
import { Modal, Box, Typography, Avatar, Button, Radio, FormControlLabel, TextField } from "@mui/material"
import { useState } from "react";
import { convertTimeToUTCTime, getName } from "../../../helper";
import { GET_TIME_SHEETS_QUERY, TIME_SHEET_CHECK_IN_OUT } from "../../../../graphql/tickets";
import { Alert } from "../../common/Alert";

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

const Record = ({ item }) => {
    const [isChecked, setIsChecked] = useState(null);
    const [time, setTime] = useState(null);


    const [submitTime, { data, loading, error }] = useMutation(TIME_SHEET_CHECK_IN_OUT, {
        variables: {
            checkinCheckoutInput: {
                resourceId: item?.resource?.id,
                ticketDateId: item?.ticketDate?.id,
                checkinOrCheckout: isChecked ? 'CHECK_IN' : 'CHECK_OUT',
                time: convertTimeToUTCTime(time)
            }
        }
    });

    const { timeSheetCheckInOut } = data || {};

    const isSubmitDisabled = !time || isChecked === null || data || loading;

    const handleSubmit = async () => {
        try {
            await submitTime();

        } catch (error) {
        }
        finally {
        }
    }

    if (timeSheetCheckInOut) {
        const { message } = timeSheetCheckInOut || {};
        Alert.success(message || "Assigned Successfully");
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

                <TextField
                    placeholder='Select Time'
                    type='time'
                    size='small'
                    onChange={(e) => { setTime(`${e.target.value}:00`) }}
                    sx={{ marginLeft: "4px", height: "40px", borderRadius: '8px' }}
                />

                <Box>
                    <FormControlLabel sx={{ color: "black" }}
                        control={<Radio checked={isChecked} size='small' onChange={() => setIsChecked(true)} />}
                        label={"Check In"} />

                    <FormControlLabel sx={{ color: "black" }}
                        control={<Radio checked={isChecked === false} size='small' onChange={() => setIsChecked(false)} />}
                        label={"Check Out"} />
                </Box>

                <Button variant="contained" color="info" disabled={isSubmitDisabled} onClick={handleSubmit}> Submit</Button>
            </Box>
        </Box>
    )
}

const AddTimeSheetModal = ({ open, handleClose, ticketInfo }) => {

    const [page, setPage] = useState(0);

    const { data, loading, error } = useQuery(GET_TIME_SHEETS_QUERY, {
        variables: {
            ticketId: ticketInfo?.id
        }
    })
    const { ticketTimeSheetData } = data || {};

    const { getAllResources } = data || {};
    const { count = 0, resources } = getAllResources || {};

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
                        Time
                    </Typography>
                    <Typography id="modal-modal-description" >
                        Check In/Out
                    </Typography>
                    <Typography id="modal-modal-description" >
                        Action
                    </Typography>
                </Box>
                {loading ?
                    <Box>Loading...</Box>
                    : <>
                        {ticketTimeSheetData?.map(item => (
                            <Record item={item} />
                        ))}
                        {count > resources?.length &&
                            <Box sx={{ display: "flex", justifyContent: "center", marginTop: "12px", fontSize: 12, }}>
                                <Button disabled={loading} onClick={() => { setPage(page + 1) }}> Show More</Button>
                            </Box>
                        }
                    </>
                }
            </Box>
        </Modal>
    )
}

export default AddTimeSheetModal