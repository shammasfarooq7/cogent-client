import { useMutation, useQuery } from "@apollo/client";
import { Modal, Box, Typography, Avatar, Checkbox, Button } from "@mui/material"
import { useState } from "react";
import { ASSIGN_RESOURCE_TO_TICKET_MUTATION, GET_RESOURCES_TO_BE_ASSIGN_QUERY } from "../../../graphql/feops";
import { getName } from "../../helper";
import { Alert } from "../../components/common/Alert";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: "80%",
    overflowY: "auto",
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: '12px',
    boxShadow: 24,
    p: 4,
};

const AssignResourceModal = ({ open, handleClose, ticketInfo }) => {

    const [page, setPage] = useState(0);
    const [resourceIds, setResourceIds] = useState([]);
    const limit = 20;

    const { data, loading, error } = useQuery(GET_RESOURCES_TO_BE_ASSIGN_QUERY, {
        variables: {
            getAllResourcesInput: {
                page,
                limit,
                isOnboarded: true
            }
        }
    })

    const [assignResourceToTicket, { data: AssignResourceResponse, error: AssignResourceError, loading: AssignResourceLoading }] = useMutation(ASSIGN_RESOURCE_TO_TICKET_MUTATION)

    const { getAllResources } = data || {};
    const { count = 0, resources } = getAllResources || {};
    const { numberOfResource } = ticketInfo || {};

    const isDisabled = resourceIds?.length === numberOfResource;

    const handleCheckBoxSelect = (id, isChecked) => {
        if (isChecked) {
            if ((resourceIds?.length < numberOfResource)) {
                setResourceIds([...resourceIds, id])
            }
        }
        else {
            setResourceIds(resourceIds.filter(resourceId => resourceId !== id))
        }
    }

    const handleAssignResource = async () => {
        await assignResourceToTicket({
            variables: {
                assignResourcesToTicketInput: {
                    ticketId: ticketInfo?.id,
                    resourceIds
                }
            }
        })
    };

    if (AssignResourceResponse) {
        const { assignResourcesToTicket } = AssignResourceResponse || {};
        Alert.success(assignResourcesToTicket?.message || "Assigned Successfully");
        handleClose()
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>

                <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} marginBottom={3}>
                    <Box sx={{ fontSize: 18, fontWeight: 600 }}>All Resources</Box>
                    <Button sx={{ fontSize: 12, fontWeight: 600 }} variant="contained" color="error" disabled={!resourceIds?.length || AssignResourceLoading}
                        onClick={handleAssignResource}>Assign</Button>
                </Box>
                <Box sx={{ p: 1, background: "#EFF4FA", color: "#464E5F", borderRadius: "5px", fontWeight: "600", fontSize: "14px", display: 'flex', justifyContent: 'space-between' }}>
                    <Typography id="modal-modal-description" >
                        Resource Id
                    </Typography>
                    <Typography id="modal-modal-description" >
                        Country
                    </Typography>
                    <Typography id="modal-modal-description" >
                        City
                    </Typography>
                    <Typography  >
                        Select
                    </Typography>
                </Box>
                {loading ?
                    <Box>Loading...</Box>
                    : <>
                        {resources?.map(resource => (
                            <Box key={resource?.id}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px', marginLeft: '-14px' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar sx={{ height: '50px', width: '50px' }} />
                                        <Box sx={{ marginLeft: '12px', maxWidth: "150px" }}>
                                            <Typography sx={{ color: '#464E5F', fontWeight: '500', fontFamily: 'Poppins', fontSize: '14px' }}>{getName(resource?.firstName, resource?.middleName, resource?.lastName)}</Typography>
                                            <Typography sx={{ color: ' #B5B5C3', fontWeight: '500', fontFamily: 'Poppins', fontSize: '13px' }}>ID#{resource?.id}</Typography>
                                        </Box>
                                    </Box>
                                    <Typography sx={{ maxWidth: "200px" }}>{resource?.country || "_ _"}</Typography>
                                    <Typography sx={{ maxWidth: "200px" }}>{resource?.city || "_ _"}</Typography>


                                    <Checkbox checked={resourceIds.includes(resource?.id)} onChange={(e) => handleCheckBoxSelect(resource?.id, e.target.checked)} disabled={isDisabled} />


                                </Box>
                            </Box>
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

export default AssignResourceModal