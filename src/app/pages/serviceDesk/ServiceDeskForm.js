import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import { HeaderResource } from '../../components/common/HeaderResource';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { CustomFormController } from '../../components/common/CustomFormController';
import { FormProvider, useForm } from 'react-hook-form';
import { CustomDropDrownController } from '../../components/common/CustomDropDownController';
import { yupResolver } from '@hookform/resolvers/yup';
import { ticketFormValidationSchema } from '../../validationSchema';
import { CREATE_TICKET_MUTATION, UPDATE_TICKET_MUTATION } from '../../../graphql/tickets';
import { useMutation } from '@apollo/client';
import { Alert } from '../../components/common/Alert';
import { SimpleDropDownController } from '../../components/common/SimpleDropDownController';
import { slaPriority, servicePriority, serviceLevel, serviceType, technology, tools_list, sites, regions, countries, projects } from '../../constants';
import { CustomDocumentUploadController } from '../../components/common/CustomDocumentUploadController';
import { uploadDocument } from '../../services/rest-apis';
import { CustomPhoneController } from '../../components/common/CustomPhoneController';
import { UserContext } from '../../context/user-context';
import { getFileWithNewName, getName } from '../../helper';
import { CutomFormRadioController } from '../../components/common/CutomFormRadioController';
import FileUrlDisplay from '../../components/common/FileUrlDisplay/FileUrlDisplay';
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

export const SDForm = ({ openModal, setOpenModal, editInfo, refetchTickets }) => {
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
                            {editInfo ? "Update Ticket" : "Add Ticket"}
                        </Typography>
                        <Box sx={{ position: "relative", left: "78%", top: "12px", cursor: "pointer" }} >
                            <CloseIcon onClick={handleClose} />
                        </Box>
                    </Box>
                    <Divider />
                    <Box sx={{ p: 2 }}>
                    {editInfo &&
                            <HeaderResource heading="GENERAL INFORMATION" />
                    }
                        <FormProvider {...methods}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {editInfo &&
                                    <Grid container spacing={2} >
                                        
                                        <Grid item xs={4}>
                                            <CustomFormController
                                                controllerName='time'
                                                controllerLabel='Ticket Received Time'
                                                fieldType='time'
                                                InputLabelProps={{ shrink: true }}  
                                                value={editInfo?.time ?? ""}
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <CustomFormController
                                                controllerName='date'
                                                controllerLabel='Ticket Received Date'
                                                fieldType='date'
                                                value={editInfo?.date ?? ""}
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <CustomFormController
                                                controllerName='customerName'
                                                controllerLabel='Customer Name'
                                                fieldType='text'
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <CustomFormController
                                                controllerName='customerTicketNumber'
                                                controllerLabel='Customer Ticket Number'
                                                fieldType='text'
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <CustomFormController
                                                controllerName='cogentCaseNumber'
                                                controllerLabel='Cogent Case Number'
                                                fieldType='text'
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <CustomFormController
                                                controllerName='cogentWorkOrder'
                                                controllerLabel='Cogent Work Order'
                                                fieldType='text'
                                                disabled
                                            />
                                        </Grid>
                                    </Grid>
                                }
                                <HeaderResource heading="PROJECT INFORMATION" />
                                <Grid container spacing={2}>

                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='accountName'
                                            controllerLabel='Account Name'
                                            fieldType='text'
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <CustomDropDrownController
                                            controllerName='project'
                                            controllerLabel='Select Project'
                                            fieldType='text'
                                            currencies={projects}
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='projectCode'
                                            controllerLabel='Project Code'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='endClientName'
                                            controllerLabel='End Client Name'
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
                                <HeaderResource heading="SERVICE DETAILS" />
                                <Grid container spacing={2}>

                                    <Grid item xs={4}>
                                        <CustomDropDrownController
                                            controllerName='siteName'
                                            controllerLabel='Site Name'
                                            fieldType='text'
                                            currencies={sites}
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <CustomDropDrownController
                                            controllerName='region'
                                            controllerLabel='Region'
                                            fieldType='text'
                                            currencies={regions}
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <CustomDropDrownController
                                            controllerName='country'
                                            controllerLabel='Country'
                                            fieldType='text'
                                            currencies={countries}
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
                                            controllerName='provinceState'
                                            controllerLabel='Province/State'
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

                                    <Grid item xs={12}>
                                        <CustomFormController
                                            controllerName='siteAddress'
                                            controllerLabel='Site Address'
                                            fieldType='text'
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='spocName'
                                            controllerLabel='SPOC Name'
                                            fieldType='text'
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='spocContactNumber'
                                            controllerLabel='SPOC Contact Number'
                                            fieldType='text'
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='spocEmailAddress'
                                            controllerLabel='SPOC Email Address'
                                            fieldType='text'
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <CustomFormController
                                            controllerName='siteAccessInstruction'
                                            controllerLabel='Site Access Instructions'
                                            fieldType='text'
                                            rowsLength={4}
                                            isMultiLine
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <CustomFormController
                                            controllerName='customerCaseNumber'
                                            controllerLabel='Customer Case Number'
                                            fieldType='text'
                                            disabled
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <CustomDropDrownController
                                            controllerName='technologyType'
                                            controllerLabel='Technology Type'
                                            fieldType='text'
                                            currencies={technology}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <CustomFormController
                                            controllerName='jobSummary'
                                            controllerLabel='Job Summary'
                                            fieldType='text'
                                            rowsLength={4}
                                            isMultiLine
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <CustomFormController
                                            controllerName='caseDetails'
                                            controllerLabel='Case Details'
                                            fieldType='text'
                                            rowsLength={4}
                                            isMultiLine
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <CustomFormController
                                            controllerName='scopeOfWork'
                                            controllerLabel='Scope Of Work'
                                            fieldType='text'
                                            rowsLength={4}
                                            isMultiLine
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <CustomFormController
                                            controllerName='instructions'
                                            controllerLabel='Instructions'
                                            fieldType='text'
                                            rowsLength={4}
                                            isMultiLine
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <CustomFormController
                                            controllerName='addInstruction'
                                            controllerLabel='Additional Instructions'
                                            fieldType='text'
                                            rowsLength={4}
                                            isMultiLine
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <CustomFormController
                                            controllerName='specialInstruction'
                                            controllerLabel='Special Instructions'
                                            fieldType='text'
                                            rowsLength={4}
                                            isMultiLine
                                        />
                                    </Grid>

                                    <Grid item xs={12} alignSelf={"center"}>
                                        <SimpleDropDownController
                                            controllerName='toolsRequested'
                                            options={tools_list?.map(list => ({
                                                value: list?.name,
                                                label: list?.name
                                            }))}
                                            isMulti={true}
                                        />
                                    </Grid>
 
                                    <Grid item xs={6} {...(getValues("serviceDocUrl") && !getValues("myServiceDocument") && { display: "flex", alignItems: "center" })}>
                                        {(getValues("serviceDocUrl") && !getValues("myServiceDocument"))
                                            ? <FileUrlDisplay
                                                url={getValues("serviceDocUrl")}
                                                controllerName='myServiceDocument'
                                                controllerLabel='Service Document (Attachment)'
                                            />
                                            : <CustomDocumentUploadController
                                                controllerName='myServiceDocument'
                                                controllerLabel='Service Document (Attachment)'
                                                fieldIcon={<AttachFileIcon>
                                                    <input type="file" />
                                                </AttachFileIcon>}
                                            />
                                        }
                                    </Grid> 

                                    <Grid item xs={6}>
                                        <CustomFormController
                                            controllerName='hardwareSN'
                                            controllerLabel='Hardware S/N'
                                            fieldType='text'
                                        />
                                    </Grid>

                                </Grid>
                                <HeaderResource heading="SERVICE SCHEDULE" />
                                <Grid container spacing={2}>

                                    <Grid item xs={4}>
                                        <CustomDropDrownController
                                            controllerName='serviceType'
                                            controllerLabel='Service Type'
                                            fieldType='text'
                                            currencies={serviceType}
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <CustomDropDrownController
                                            controllerName='serviceLevel'
                                            controllerLabel='Service Level'
                                            fieldType='text'
                                            currencies={serviceLevel}
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <CustomDropDrownController
                                            controllerName='servicePriority'
                                            controllerLabel='Service Priority'
                                            fieldType='text'
                                            currencies={servicePriority}
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <CustomDropDrownController
                                            controllerName='slaPriority'
                                            controllerLabel='SLA Priority'
                                            fieldType='text'
                                            currencies={slaPriority}
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='numberOfHoursReq'
                                            controllerLabel='Default NumberOf Hours Requested'
                                            fieldType='text'
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='numberOfResource'
                                            controllerLabel='Number of FSE Requested'
                                            fieldType='text'
                                        />
                                    </Grid>

                                   
                                </Grid>
                                <HeaderResource heading="VISIT DETAILS" />
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <CustomFormController
                                            controllerName='singleVisit'
                                            controllerLabel='Single Visit'
                                            fieldType='date'
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <CustomFormController
                                            controllerName='multiVisit'
                                            controllerLabel='Multiple Visit'
                                            fieldType='date'
                                        />
                                    </Grid>

                                </Grid>
                                <HeaderResource heading="FILE UPLOAD" />

                                <Grid container spacing={2}>
                                    <Grid item xs={6} {...(getValues("attachments") && !getValues("myAttachment") && { display: "flex", alignItems: "center" })}>
                                        {(getValues("attachments") && !getValues("myAttachment"))
                                            ? <FileUrlDisplay
                                                url={getValues("attachments")}
                                                controllerName='myAttachment'
                                                controllerLabel='Upload File (Attachment)'
                                            />
                                            : <CustomDocumentUploadController
                                                controllerName='myAttachment'
                                                controllerLabel='Upload File (Attachment)'
                                                fieldIcon={<AttachFileIcon>
                                                    <input type="file" />
                                                </AttachFileIcon>}
                                            />
                                        }
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
