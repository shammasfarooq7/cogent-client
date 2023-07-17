import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Modal from '@mui/material/Modal';
import { HeaderResource } from '../../components/common/HeaderResource';
import { CustomFormController } from '../../components/common/CustomFormController';
import { FormProvider, useForm } from 'react-hook-form';
import { CREATE_TICKET_MUTATION, UPDATE_TICKET_MUTATION } from '../../../graphql/tickets';
import { useMutation } from '@apollo/client';
import { Alert } from '../../components/common/Alert';
import { slaPriority, regions } from '../../constants';
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

export const AccountForm = ({ openModal, setOpenModal, editInfo, refetchTickets }) => {
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
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{ display: "flex" }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ padding: "12px", fontFamily: "popins", fontWeight: "600" }}>
                            {editInfo ? "Update Invoice" : "Add Invoice"}
                        </Typography>
                        <Box sx={{ position: "relative", left: "78%", top: "12px", cursor: "pointer" }} >
                            <CloseIcon onClick={handleClose} />
                        </Box>
                    </Box>
                    <Divider />
                    <Box sx={{ p: 2 }}>
                    {editInfo &&
                            <HeaderResource heading="Genarate Invoice" />
                    }
                        <FormProvider {...methods}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {editInfo &&
                                    <Grid container spacing={2} >
                                        
                                        <Grid item xs={4}>
                                            <CustomFormController
                                                controllerName='fullName'
                                                controllerLabel='Full Name'
                                                fieldType='text'
                                                InputLabelProps={{ shrink: true }}  
                                                value={editInfo?.time ?? ""}
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <CustomFormController
                                                controllerName='tax'
                                                controllerLabel='Tax#'
                                                fieldType='date'
                                                value={editInfo?.date ?? ""}
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <CustomFormController
                                                controllerName='contact'
                                                controllerLabel='Contact'
                                                fieldType='text'
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <CustomFormController
                                                controllerName='email'
                                                controllerLabel='Email'
                                                fieldType='text'
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <CustomFormController
                                                controllerName='country'
                                                controllerLabel='Country'
                                                fieldType='text'
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <CustomFormController
                                                controllerName='city'
                                                controllerLabel='City'
                                                fieldType='text'
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <CustomFormController
                                                controllerName='state'
                                                controllerLabel='State'
                                                fieldType='text'
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <CustomFormController
                                                controllerName='state'
                                                controllerLabel='State'
                                                fieldType='text'
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <CustomFormController
                                                controllerName='postalCode'
                                                controllerLabel='postalCode'
                                                fieldType='text'
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <CustomFormController
                                                controllerName='homeAddress'
                                                controllerLabel='Home Address'
                                                fieldType='text'
                                                disabled
                                            />
                                        </Grid>
                                    </Grid>
                                }
                                <HeaderResource heading="INVOICE PARTICULARS" />
                                <Grid container spacing={2}>

                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='invoice'
                                            controllerLabel='Invoice#'
                                            fieldType='text'
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='date'
                                            controllerLabel='Date'
                                            fieldType='date'
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='dueDate'
                                            controllerLabel='Due Date'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='currency'
                                            controllerLabel='Currency'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    {/* <Grid item xs={3} {...(getValues("identityDocUrl") && !getValues("identityDocument") && { display: "flex", alignItems: "center" })}>
                                        {(getValues("identityDocUrl") && !getValues("identityDocument"))
                                            ? <FileUrlDisplay
                                                url={getValues("identityDocUrl")}
                                                controllerName='identityDocument'
                                                controllerLabel='Identity (Attachment)'
                                            />
                                            : <CustomDocumentUploadController
                                                controllerName='identityDocument'
                                                controllerLabel='Identity (Attachment)'
                                                fieldIcon={<AttachFileIcon>
                                                    <input type="file" />
                                                </AttachFileIcon>}
                                            />
                                        }
                                    </Grid> */}
                                    {/* <Grid item xs={4} alignSelf={"center"}>
                                        <SimpleDropDownController
                                            controllerName='languages'
                                            options={languages_list?.map(list => ({
                                                value: list?.name,
                                                label: list?.name
                                            }))}
                                            placeholder={"Languages"}
                                            isMulti={true}
                                        />
                                    </Grid> */}
                                </Grid>
                                <HeaderResource heading="BILL TO" />
                                <Grid container spacing={2}>

                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='cogentNetworkLtd'
                                            controllerLabel='Cogent Networks LTD'
                                            fieldType='text'
                                            
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='vat'
                                            controllerLabel='VAT#'
                                            fieldType='text'
                                            currencies={regions}
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
                                            controllerName='contract'
                                            controllerLabel='Contract'
                                            fieldType='text'
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='website'
                                            controllerLabel='Website'
                                            fieldType='text'
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='postCode'
                                            controllerLabel='Post Code'
                                            fieldType='text'
                                        />
                                    </Grid>

                                  </Grid>
                                <HeaderResource heading="TASKS LISTS" />
                                <Grid container spacing={2}>

                                    <Grid item xs={1}>
                                        <CustomFormController
                                            controllerName='po'
                                            controllerLabel='PO#'
                                            fieldType='text'
                                           
                                        />
                                    </Grid>

                                    <Grid item xs={2}>
                                        <CustomFormController
                                            controllerName='ticketNumber'
                                            controllerLabel='Ticket Number'
                                            fieldType='text'
                                           
                                        />
                                    </Grid>

                                    <Grid item xs={2}>
                                        <CustomFormController
                                            controllerName='scheduleDetail'
                                            controllerLabel='Schedule Details'
                                            fieldType='text'
                                       
                                        />
                                    </Grid>

                                    <Grid item xs={3}>
                                        <CustomFormController
                                            controllerName='description'
                                            controllerLabel='Description'
                                            fieldType='text'
                                            currencies={slaPriority}
                                        />
                                    </Grid>

                                    <Grid item xs={2}>
                                        <CustomFormController
                                            controllerName='timeIn'
                                            controllerLabel='Time In'
                                            fieldType='text'
                                        />
                                    </Grid>

                                    <Grid item xs={2}>
                                        <CustomFormController
                                            controllerName='timeOut'
                                            controllerLabel='Time Out'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <CustomFormController
                                            controllerName='noOfhours'
                                            controllerLabel='No Of Hours'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <CustomFormController
                                            controllerName='currency'
                                            controllerLabel='Currency'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <CustomFormController
                                            controllerName='rateHour'
                                            controllerLabel='Rate/Hour'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <CustomFormController
                                            controllerName='travelCharges'
                                            controllerLabel='Travel Charges'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='tools'
                                            controllerLabel='Tools'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='anyExtraCharges'
                                            controllerLabel='Any Extra Charges'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='totla'
                                            controllerLabel='Total'
                                            fieldType='text'
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                    <Divider />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <CustomFormController
                                            controllerName='po'
                                            controllerLabel='PO#'
                                            fieldType='text'
                                           
                                        />
                                    </Grid>

                                    <Grid item xs={2}>
                                        <CustomFormController
                                            controllerName='ticketNumber'
                                            controllerLabel='Ticket Number'
                                            fieldType='text'
                                           
                                        />
                                    </Grid>

                                    <Grid item xs={2}>
                                        <CustomFormController
                                            controllerName='scheduleDetail'
                                            controllerLabel='Schedule Details'
                                            fieldType='text'
                                       
                                        />
                                    </Grid>

                                    <Grid item xs={3}>
                                        <CustomFormController
                                            controllerName='description'
                                            controllerLabel='Description'
                                            fieldType='text'
                                            currencies={slaPriority}
                                        />
                                    </Grid>

                                    <Grid item xs={2}>
                                        <CustomFormController
                                            controllerName='timeIn'
                                            controllerLabel='Time In'
                                            fieldType='text'
                                        />
                                    </Grid>

                                    <Grid item xs={2}>
                                        <CustomFormController
                                            controllerName='timeOut'
                                            controllerLabel='Time Out'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <CustomFormController
                                            controllerName='noOfhours'
                                            controllerLabel='No Of Hours'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <CustomFormController
                                            controllerName='currency'
                                            controllerLabel='Currency'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <CustomFormController
                                            controllerName='rateHour'
                                            controllerLabel='Rate/Hour'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <CustomFormController
                                            controllerName='travelCharges'
                                            controllerLabel='Travel Charges'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='tools'
                                            controllerLabel='Tools'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='anyExtraCharges'
                                            controllerLabel='Any Extra Charges'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='totla'
                                            controllerLabel='Total'
                                            fieldType='text'
                                        />
                                    </Grid>
                                   
                                

                                </Grid>
                               
                                {/* <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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
                                </Box> */}
                            </form>
                        </FormProvider>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}
