import { useContext, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import { HeaderResource } from '../../../components/common/HeaderResource';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { CustomFormController } from '../../../components/common/CustomFormController';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { CustomDropDrownController } from '../../../components/common/CustomDropDownController';
import { yupResolver } from '@hookform/resolvers/yup';
import { ticketFormValidationSchema, userValidationSchema } from '../../../validationSchema';
import { CREATE_TICKET_MUTATION, UPDATE_TICKET_MUTATION, GET_All_CUSTOMERS_QUERY, GET_PROJECT_BY_CUSTOMERS_QUERY } from '../../../../graphql/tickets';
import { useMutation, useQuery } from '@apollo/client';
import { Alert } from '../../../components/common/Alert';
import { SimpleDropDownController } from '../../../components/common/SimpleDropDownController';
import { slaPriority, servicePriority, serviceLevel, serviceType, technology, tools_list, sites, regions, countries, projects, ticketsType, roles } from '../../../constants';
import { CustomDocumentUploadController } from '../../../components/common/CustomDocumentUploadController';
// import { MultiDatePicker } from '../../components/common/CustomMultiDate';
import { uploadDocument } from '../../../services/rest-apis';
import { UserContext } from '../../../context/user-context';
import { getFileWithNewName, getName } from '../../../helper';
import FileUrlDisplay from '../../../components/common/FileUrlDisplay/FileUrlDisplay';
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

export const CreateUser = ({ openModal, setOpenModal, editInfo, refetchTickets }) => {
    const handleClose = () => setOpenModal(false);

    const { user } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [customer, setCustomer] = useState('');

    const urlSearchParams = new URLSearchParams(window.location.search)
    const id = urlSearchParams?.get("id");
    const { ...info } = editInfo || {};

    const editDefaultState = {
        ...info
    }

    const methods = useForm({
        resolver : yupResolver(userValidationSchema),
        mode: "all",
        defaultValues: {
             roles:'',
             email:'',
             firstName:'',
             middleName:'',
             lastName:'',
             password:'',
            
        }
    });

   
    const [createTicket, { data, loading }] = useMutation(CREATE_TICKET_MUTATION);
    const [updateTicket, { data: UpdateData, loading: updateLoading }] = useMutation(UPDATE_TICKET_MUTATION);
    const {data: getAllCustomerData, loading: customerLoading} = useQuery(GET_All_CUSTOMERS_QUERY, {
        variables: {
            getAllCustomerInput: {
                role: "SD",
            }
        },
        fetchPolicy: "network-only"
    });
    
    if (data || UpdateData) {
        Alert.success(UpdateData ? "Resource updated successfully!" : "Resource created successfully!")
    }

    const { handleSubmit, setValue, watch , getValues, formState: { errors } } = methods;
    const customerId = getValues('customerId')
    const selectedDropdownValue = customerId !== undefined && watch('customerId');
    console.log("watch", selectedDropdownValue, customerId)


    useEffect(() => {
       if (customerId) {
        //    Pp();
       }

    }, [selectedDropdownValue, customerId]);

   
    const onSubmit = async (data) => {
        console.log("dta>>>>>>>...",data)
        try {
            setIsLoading(true);

            const {jobSiteId, ticketType, country, city, customerId, customerCaseNumber,
                accountName, projectId, endClientName, siteName, region, provinceState, siteAddress, postCode, spocName,
                spocContactNumber, spocEmailAddress, siteAccessInstruction, technologyType, jobSummary, caseDetails,
                scopeOfWork, instructions, addInstruction, specialInstruction, toolsRequested, serviceDocUrl : serviceDocuments,
                hardwareSN, serviceType, serviceLevel, servicePriority, slaPriority, numberOfHoursReq, numberOfResource,
                attachments : attachment, myServiceDocument, myAttachment, ticketDates, scheduledTime} = data
            // return
            let serviceDocUrl = serviceDocuments || "";
         

            let attachments = attachment || "";
        

            const payload = {
                jobSiteId,
                ticketType,
                customerId,
                customerCaseNumber,
                accountName,
                projectId,
                endClientName,
                spocName,
                spocContactNumber,
                spocEmailAddress,
                siteAccessInstruction,
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
                // attachments,
                ticketDates,
                scheduledTime
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
                console.log(payload)
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
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{ display: "flex" }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ padding: "12px", fontFamily: "popins", fontWeight: "600" }}>
                            {editInfo ? "Update Ticket" : "Add User"}
                        </Typography>
                        <Box sx={{ position: "relative", left: "78%", top: "12px", cursor: "pointer" }} >
                            <CloseIcon onClick={handleClose} />
                        </Box>
                    </Box>
                    <Divider />
                    <Box sx={{ p: 2 }}>

                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* <HeaderResource heading="Ticket Type" /> */}
                                
                                    <Grid container spacing={2} >
                                
                                        <Grid item xs={12}>
                                            <CustomDropDrownController
                                            controllerName='roles'
                                            controllerLabel='Roles'
                                            fieldType='text'
                                            currencies={roles}
                                            onchange={true}
                                        />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <CustomFormController
                                                controllerName='firstName'
                                                controllerLabel='First Name'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <CustomFormController
                                                controllerName='middleName'
                                                controllerLabel='Middle Name'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <CustomFormController
                                                controllerName='lastName'
                                                controllerLabel='Last Name'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <CustomFormController
                                                controllerName='email'
                                                controllerLabel='Email'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <CustomFormController
                                                controllerName='password'
                                                controllerLabel='Password'
                                                fieldType='text'
                                                
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
                                        {(isLoading || loading || updateLoading) ? editInfo ? "UPDATING..." : "ADDING..." : editInfo ? "UPDATE" : "ADD"}
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
