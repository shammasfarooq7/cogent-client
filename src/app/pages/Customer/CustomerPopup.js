import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { FormProvider, useForm } from 'react-hook-form';
import { CustomDropDrownController } from '../../components/common/CustomDropDownController';
import { CREATE_TICKET_MUTATION, UPDATE_TICKET_MUTATION } from '../../../graphql/tickets';
import { useMutation } from '@apollo/client';
import { Alert } from '../../components/common/Alert';
import { CustomDocumentUploadController } from '../../components/common/CustomDocumentUploadController';
import { UserContext } from '../../context/user-context';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute',
    overflow: 'auto',
    top: '52%',
    left: '60%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: "10px",
    boxShadow: 24,
    height: "35%",
    width: "70%",

};

export const CustomerPopup = ({ openModal, setOpenModal, editInfo, refetchTickets, type }) => {
    const handleClose = () => setOpenModal(false);

    const Status = [
        {
            value: 'DIRECT',
            label: 'DIRECT',
        },
        {
            value: 'INDIRECT',
            label: 'INDIRECT',
        }
    ];

    const { user } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);

    const urlSearchParams = new URLSearchParams(window.location.search)
    const id = urlSearchParams?.get("id");

    const methods = useForm({
        mode: "all",
        defaultValues: {
            checkIn: "",
            checkOut: "",
        }
    });
   
    const [createTicket, { data, loading }] = useMutation(CREATE_TICKET_MUTATION);
    const [updateTicket, { data: UpdateData, loading: updateLoading }] = useMutation(UPDATE_TICKET_MUTATION);

    if (data || UpdateData) {
        Alert.success(UpdateData ? "Resource updated successfully!" : "Resource created successfully!")
    }
    const { handleSubmit, watch, setValue, getValues, formState: { errors } } = methods;

    const onSubmit = async (data) => {
    };

    return (
        <Box sx={{ overflowY: "auto" }}>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{ display: "flex" }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ padding: "12px", fontFamily: "popins", fontWeight: "600" }}>
                             {type === "Oportunity" ? "Apply for the Position" : "Select Project"}
                        </Typography>
                        <Box sx={{ position: "relative", left: "600px", top: "12px", cursor: "pointer" }} >
                            <CloseIcon onClick={handleClose} />
                        </Box>
                    </Box>
                    <Divider />
                    <Box sx={{ p: 2 }}>
    
                        <FormProvider {...methods}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {editInfo &&
                                    <Grid container spacing={2} >
                                        {
                                            type === "Oportunity" ?
                                            <>
                                              <Grid item xs={12}>
                                              <CustomDocumentUploadController
                                                controllerName='resume/Cv'
                                                controllerLabel='Attach your Resume/CV'
                                                fieldIcon={<AttachFileIcon>
                                                    <input type="file" />
                                                </AttachFileIcon>}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                        <CustomDocumentUploadController
                                                controllerName='coverLetter'
                                                controllerLabel='Attach your Cover Letter'
                                                fieldIcon={<AttachFileIcon>
                                                    <input type="file" />
                                                </AttachFileIcon>}
                                            />
                                        </Grid>   
                                        <Grid item xs={12}>
                                        <CustomDocumentUploadController
                                                controllerName='certification'
                                                controllerLabel='Important Documents/Certification'
                                                fieldIcon={<AttachFileIcon>
                                                    <input type="file" />
                                                </AttachFileIcon>}
                                            /> 
                                            </Grid>  
                                            </>
                                             :
                                            <>
                                              <Grid item xs={12}>
                                            <CustomDropDrownController
                                                controllerName='projectList'
                                                controllerLabel='Project List'
                                                selectDropdown={true}
                                                currencies={Status}
                                            />
                                        </Grid>
                                            </>
                                        }
                                                                   
                                    </Grid>
                                }

                               
                             
                                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2, paddingLeft: "40px", paddingRight: "40px", background: "#F64E60", borderRadius: "12px", fontWeight: "600" }}
                                        disabled={isLoading || loading || updateLoading}
                                    >
                                        {type === "Oportunity" ? "Submit" : "Update"}
                                    </Button>

                                </Box>
                            </form>
                        </FormProvider>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}
