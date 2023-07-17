import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import { HeaderResource } from '../../components/common/HeaderResource';
import { CustomFormController } from '../../components/common/CustomFormController';
import { FormProvider, useForm } from 'react-hook-form';
import { CustomDropDrownController } from '../../components/common/CustomDropDownController';
import { CREATE_TICKET_MUTATION, UPDATE_TICKET_MUTATION } from '../../../graphql/tickets';
import { useMutation } from '@apollo/client';
import { Alert } from '../../components/common/Alert';
import { projects } from '../../constants';
import { uploadDocument } from '../../services/rest-apis';
import { UserContext } from '../../context/user-context';
import { getFileWithNewName, getName } from '../../helper';
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
    height: "80%",
    width: "75%",

};

export const CustomerOportunity = ({ openModal, setOpenModal, editInfo, refetchTickets }) => {
    const handleClose = () => setOpenModal(false);

    const { user } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);

    const urlSearchParams = new URLSearchParams(window.location.search)
    const id = urlSearchParams?.get("id");

    const { ...info } = editInfo || {};

    const editDefaultState = {
        ...info
    }

    const methods = useForm({
        mode: "all",
        defaultValues: {
            ticketType: "",
            date: "",
            time: "",
            country: "",
            city: "",
            status: "",
            checkInOrOut: "",
            customerName: "",
            customerTicketNumber: "",
            cogentCaseNumber: "",
            cogentWorkOrder: "",
            accountName: "",
            project: "",
            projectCode: "",
            endClientName: "",
            siteName: "",
            region: "",
            provinceState: "",
            siteAddress: "",
            postCode: "",
            spocName: "",
            spocContactNumber: "",
            spocEmailAddress: "",
            siteAccessInstruction: "",
            customerCaseNumber: "",
            technologyType: "",
            jobSummary: "",
            caseDetails: "",
            scopeOfWork: "",
            instructions: "",
            addInstruction: "",
            specialInstruction: "",
            toolsRequested: "",
            serviceDocUrl: "",
            hardwareSN: "",
            serviceType: "",
            serviceLevel: "",
            servicePriority: "",
            slaPriority: "",
            numberOfHoursReq: "",
            numberOfResource: "",
            attachments: "",
            ...editDefaultState
        }
    });
   
    const [createTicket, { data, loading }] = useMutation(CREATE_TICKET_MUTATION);
    const [updateTicket, { data: UpdateData, loading: updateLoading }] = useMutation(UPDATE_TICKET_MUTATION);

    if (data || UpdateData) {
        Alert.success(UpdateData ? "Resource updated successfully!" : "Resource created successfully!")
    }
    const { handleSubmit, watch, setValue, getValues, formState: { errors } } = methods;

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);

            const {id, ticketType, date, time, country, city, status, checkInOrOut, customerName, customerTicketNumber, cogentCaseNumber,
                cogentWorkOrder, accountName, project, projectCode, endClientName, siteName, region, provinceState, siteAddress, postCode, spocName,
                spocContactNumber, spocEmailAddress, siteAccessInstruction, customerCaseNumber, technologyType, jobSummary, caseDetails,
                scopeOfWork, instructions, addInstruction, specialInstruction, toolsRequested, serviceDocUrl : serviceDocuments,
                hardwareSN, serviceType, serviceLevel, servicePriority, slaPriority, numberOfHoursReq, numberOfResource,
                attachments : attachment, myServiceDocument, myAttachment} = data
            // return
            let serviceDocUrl = serviceDocuments || "";
            if (myServiceDocument) {
                const newFile = getFileWithNewName(myServiceDocument, getName(customerName), "serviceDocuments")
                const response = await uploadDocument(newFile);
                serviceDocUrl = response?.url || "";
            };

            let attachments = attachment || "";
            if (myAttachment) {
                const newFile = getFileWithNewName(myAttachment, getName(customerName), "attachment");
                const response = await uploadDocument(newFile);
                attachments = response?.url || "";
            };

            const payload = {
                id,
                ticketType,
                date,
                time,
                country,
                city,
                status,
                checkInOrOut,
                customerName,
                customerTicketNumber,
                cogentCaseNumber,
                cogentWorkOrder,
                accountName,
                project,
                projectCode,
                endClientName,
                siteName,
                region,
                provinceState,
                siteAddress,
                postCode,
                spocName,
                spocContactNumber,
                spocEmailAddress,
                siteAccessInstruction,
                customerCaseNumber,
                technologyType,
                jobSummary,
                caseDetails,
                scopeOfWork,
                instructions,
                addInstruction,
                specialInstruction,
                toolsRequested,
                serviceDocUrl,
                hardwareSN,
                serviceType,
                serviceLevel,
                servicePriority,
                slaPriority,
                numberOfHoursReq,
                numberOfResource,
                attachments
            }


            if (editInfo) {
                await updateTicket({
                    variables: {
                        updateResourceInput: {
                            ...payload
                        },
                        id: info?.id
                    }
                })
            }
            else {
                alert(payload)
                await createTicket({
                    variables: {
                        createTicketInput: {
                            ...payload
                        }
                    }
                })
            }


            if (refetchTickets) {
                await refetchTickets()
            }
            handleClose();

        } catch (error) {

        }
        finally {
            setIsLoading(false);

        }
    };

    return (
        <Box sx={{ overflowY: "auto" }}>
            <Modal
                open={true}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{ display: "flex" }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ padding: "12px", fontFamily: "popins", fontWeight: "600" }}>
                            {"Create Ticket"}
                        </Typography>
                        <Box sx={{ position: "relative", left: "78%", top: "12px", cursor: "pointer" }} >
                            <CloseIcon onClick={handleClose} />
                        </Box>
                    </Box>
                    <Divider />
                    <Box sx={{ p: 2 }}>
    
                        <FormProvider {...methods}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                  <HeaderResource heading="Job Details" />
                                <Grid container spacing={2}>

                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='jobTitle'
                                            controllerLabel='Job Title'
                                            fieldType='text'
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <CustomDropDrownController
                                            controllerName='designation'
                                            controllerLabel='Designation'
                                            fieldType='text'
                                            currencies={projects}
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='qualification'
                                            controllerLabel='Qualification'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='experience'
                                            controllerLabel='Experience'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='company'
                                            controllerLabel='Company'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='country'
                                            controllerLabel='Country'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='city'
                                            controllerLabel='City'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='email'
                                            controllerLabel='Email'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='applicationDeadline'
                                            controllerLabel='Apllication Deadline'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CustomFormController
                                            controllerName='jobDescription'
                                            controllerLabel='Job Description'
                                            fieldType='text'
                                            rowsLength={4}
                                            isMultiLine
                                        />
                                    </Grid>
                                    </Grid>
                               
                                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2, paddingLeft: "40px", paddingRight: "40px", background: "#0095FF", borderRadius: "12px", fontWeight: "600" }}
                                        disabled={isLoading || loading || updateLoading}
                                    >
                                        {(isLoading || loading || updateLoading) ? editInfo ? "UPDATING..." : "ADDING..." : editInfo ? "UPDATE" : "Create"}
                                    </Button>
                                    <Button
                                        onClick={handleClose}
                                        variant="text"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Cancel
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
