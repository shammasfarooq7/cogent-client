import { useState, useEffect } from 'react';
import DatePicker from "react-multi-date-picker";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Modal from '@mui/material/Modal';
import { Button, FormHelperText, TextField } from '@mui/material';
import { HeaderResource } from '../../common/HeaderResource';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { CustomFormController } from '../../common/CustomFormController';
import { FormProvider, useForm, } from 'react-hook-form';
import { CustomDropDrownController } from '../../common/CustomDropDownController';
import { yupResolver } from '@hookform/resolvers/yup';
import { CREATE_TICKET_MUTATION, UPDATE_TICKET_MUTATION } from '../../../../graphql/tickets';
import { useMutation } from '@apollo/client';
import { Alert } from '../../common/Alert';
import { SimpleDropDownController } from '../../common/SimpleDropDownController';
import { slaPriority, servicePriority, serviceLevel, serviceType, technology, tools_list, regions, countries, ticketsType } from '../../../constants';
import { CustomDocumentUploadController } from '../../common/CustomDocumentUploadController';
import { uploadDocument } from '../../../services/rest-apis';
import { getFileWithNewName, getFutureDate, getName } from '../../../helper';
import FileUrlDisplay from '../../common/FileUrlDisplay/FileUrlDisplay';
import CloseIcon from '@mui/icons-material/Close';
import { CustomerDropdown } from '../../common/CustomerDropdown';
import { CustomFormCheckboxController } from '../../common/CustomFormCheckboxController';
import { ProjectDropdown } from './ProjectDropdown';
import { JobSiteDropdown } from './JobSiteDropdown';
import '../../common/style.css'
import { addTicketFormValidationSchema } from './AddTicketFormValidationSchema';


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

    const [isLoading, setIsLoading] = useState(false);
    const { ...info } = editInfo || {};

    const editDefaultState = {
        ...info
    }

    const methods = useForm({
        resolver: yupResolver(addTicketFormValidationSchema),
        mode: "all",
        defaultValues: {
            jobSiteId: "",
            ticketType: "",
            date: "",
            country: "",
            city: "",
            customer: "",
            customerCaseNumber: "",
            accountName: "",
            projectId: "",
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
            technologyType: "NETWORK",
            jobSummary: "",
            caseDetails: "",
            scopeOfWork: "",
            instructions: "",
            addInstruction: "",
            specialInstruction: "",
            toolsRequested: [],
            serviceDocUrl: "",
            hardwareSN: "",
            serviceType: "",
            serviceLevel: "",
            servicePriority: "",
            slaPriority: "",
            numberOfHoursReq: null,
            numberOfResource: null,
            ticketDates: [],
            projectCode: "",
            scheduledTime: "",
            isAdhoc: false,
            ...editDefaultState
        }
    });


    const [createTicket, { data, loading }] = useMutation(CREATE_TICKET_MUTATION);
    const [updateTicket, { data: UpdateData, loading: updateLoading }] = useMutation(UPDATE_TICKET_MUTATION);

    if (data || UpdateData) {
        Alert.success(UpdateData ? "Ticket updated successfully!" : "Ticket created successfully!")
    }

    const { handleSubmit, setValue, watch, getValues, formState: { errors } } = methods;

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);

            const { jobSiteId, ticketType, country, city, customer, customerCaseNumber,
                accountName, projectId, endClientName, siteName, region, provinceState, siteAddress, postCode, spocName,
                spocContactNumber, spocEmailAddress, siteAccessInstruction, technologyType, jobSummary, caseDetails,
                scopeOfWork, instructions, addInstruction, specialInstruction, toolsRequested, serviceDocUrl: serviceDocuments,
                hardwareSN, serviceType, serviceLevel, servicePriority, slaPriority, numberOfHoursReq, numberOfResource,
                attachments: attachment, myServiceDocument, myAttachment1, myAttachment2, myAttachment3, ticketDates, scheduledTime, projectCode } = data
            const customerId = customer?.value

            let serviceDocUrl = serviceDocuments || "";
            if (myServiceDocument) {
                const newFile = getFileWithNewName(myServiceDocument, customer?.label, "serviceDocuments")
                const response = await uploadDocument(newFile);
                serviceDocUrl = response?.url || "";
            };

            const attachedFiles = [...new Set([myAttachment1, myAttachment2, myAttachment3])]

            let attachments = [];
            for (const file of attachedFiles) {
                if (file) {
                    const newFile = getFileWithNewName(file, customer?.label, "attachment");
                    const response = await uploadDocument(newFile);
                    attachments.push(response?.url || "");
                };
            }

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
                toolsRequested: toolsRequested?.map(item => item?.value),
                serviceDocUrl,
                hardwareSN,
                serviceType,
                serviceLevel,
                servicePriority,
                slaPriority,
                numberOfHoursReq: String(numberOfHoursReq),
                numberOfResource: String(numberOfResource),
                attachments,
                ticketDates,
                scheduledTime,
                siteName: typeof siteName === "string" ? siteName : siteName?.name,
                region, siteAddress, postCode, country, city,
                province: provinceState,
                projectCode
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

    useEffect(() => {
        resetProjectStates()
        resetJobsiteStates()
    }, [watch("customer")])

    useEffect(() => {
        if (!watch("isAdhoc"))
            resetJobsiteStates()
    }, [watch("project")])

    useEffect(() => {
        resetProjectStates()
        setValue("jobSiteId", "")
        setValue("siteName", "")
    }, [watch("isAdhoc")])

    const resetProjectStates = () => {
        setValue("project", null)
        setValue("projectId", "")
        setValue("projectCode", "")
    }

    const resetJobsiteStates = () => {
        setValue("country", "")
        setValue("city", "")
        setValue("provinceState", "")
        setValue("siteAddress", "")
        setValue("spocName", "")
        setValue("spocContactNumber", "")
        setValue("spocEmailAddress", "")
        setValue("postCode", "")
        setValue("siteName", "")
        setValue("jobSiteId", "")
    }

    console.log("values:::", watch());
    console.log({ errors });

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

                        <FormProvider {...methods}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <HeaderResource heading="Ticket Type" />
                                <Grid container spacing={2} >
                                    <Grid item xs={12}>
                                        <CustomDropDrownController
                                            controllerName='ticketType'
                                            controllerLabel='Ticket Type'
                                            fieldType='text'
                                            currencies={ticketsType}
                                        />
                                    </Grid>
                                </Grid>
                                <HeaderResource heading="GENERAL INFORMATION" />
                                <Grid container spacing={2} >
                                    {editInfo &&
                                        <Grid>

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
                                        </Grid>
                                    }
                                    <Grid item xs={4}>
                                        {/* <CustomDropDrownController
                                            controllerName='customerId'
                                            controllerLabel='Customer'
                                            fieldType='text'
                                            currencies={getAllCustomerData?.getAllCustomer?.customers}
                                            onchange={true}
                                        /> */}
                                        <CustomerDropdown
                                            placeholder="Customer"
                                            controllerName="customer"
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='customerCaseNumber'
                                            controllerLabel='Customer Case Number'
                                            fieldType='text'
                                        />
                                    </Grid>

                                </Grid>

                                <HeaderResource heading="PROJECT INFORMATION" />
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <CustomFormCheckboxController controllerName='isAdhoc' controllerLabel="isAdhoc" />
                                    </Grid>

                                    <Grid item xs={4} display={"flex"} alignItems={"center"}>
                                        <CustomFormController
                                            controllerName='accountName'
                                            controllerLabel='Account Name'
                                            fieldType='text'
                                        />
                                    </Grid>

                                    <Grid item xs={4} sx={{ marginTop: !watch("isAdhoc") ? "8px" : "0px" }}>
                                        {/* <CustomDropDrownController
                                            controllerName='project'
                                            controllerLabel='Select Project'
                                            fieldType='text'
                                            currencies={projects}
                                        /> */}
                                        {!watch("isAdhoc") ?
                                            <Box>
                                                <ProjectDropdown
                                                    controllerName="project"
                                                    placeholder='Select Project'
                                                    customerId={watch("customer")?.value}
                                                    isDisabled={!watch("customer")}
                                                    selected={watch("project")}
                                                    setSelected={(val) => {
                                                        setValue("project", val)
                                                        setValue("projectId", val?.id)
                                                        setValue("projectCode", val?.code)
                                                    }}
                                                />
                                                {errors.project &&
                                                    <FormHelperText style={{ color: "#d32f2f", marginLeft: "12px" }}>{errors.project?.message}</FormHelperText>
                                                }
                                            </Box>
                                            :
                                            <CustomFormController
                                                controllerName='projectCode'
                                                controllerLabel='Project Code'
                                                fieldType='text'
                                            />
                                        }
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

                                    <Grid item xs={4} sx={{ marginTop: !watch("isAdhoc") ? "8px" : "0px" }}>
                                        {/* <CustomDropDrownController
                                            controllerName='siteName'
                                            controllerLabel='Site Name'
                                            fieldType='text'
                                            currencies={sites}
                                        /> */}
                                        {!watch("isAdhoc") ?
                                            <Box>
                                                <JobSiteDropdown
                                                    projectId={watch("project")?.id}
                                                    isDisabled={!watch("project")}
                                                    selected={watch("siteName")}
                                                    setSelected={(val) => {
                                                        const { country, city, province, postcode, siteAddress, pocContactNumber, pocEmailAdrress, pocName } = val || {};
                                                        setValue("country", country)
                                                        setValue("city", city)
                                                        setValue("provinceState", province)
                                                        setValue("siteAddress", siteAddress)
                                                        setValue("spocName", pocName)
                                                        setValue("spocContactNumber", pocContactNumber)
                                                        setValue("spocEmailAddress", pocEmailAdrress)
                                                        setValue("postCode", postcode)
                                                        setValue("siteName", val)
                                                        setValue("jobSiteId", val?.id)
                                                    }}
                                                />
                                                {errors.siteName &&
                                                    <FormHelperText style={{ color: "#d32f2f", marginLeft: "12px" }}>{errors.siteName?.message}</FormHelperText>
                                                }
                                            </Box>
                                            :
                                            <CustomFormController
                                                controllerName='siteName'
                                                controllerLabel='Site Name'
                                                fieldType='text'
                                            />
                                        }
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
                                            disabled={!watch("isAdhoc")}
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='city'
                                            controllerLabel='City'
                                            fieldType='text'
                                            disabled={!watch("isAdhoc")}
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='provinceState'
                                            controllerLabel='Province/State'
                                            fieldType='text'
                                            disabled={!watch("isAdhoc")}
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='postCode'
                                            controllerLabel='Post Code'
                                            disabled={!watch("isAdhoc")}
                                            fieldType='text'
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <CustomFormController
                                            controllerName='siteAddress'
                                            controllerLabel='Site Address'
                                            disabled={!watch("isAdhoc")}
                                            fieldType='text'
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='spocName'
                                            controllerLabel='SPOC Name'
                                            disabled={!watch("isAdhoc")}
                                            fieldType='text'
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='spocContactNumber'
                                            controllerLabel='SPOC Contact Number'
                                            disabled={!watch("isAdhoc")}
                                            fieldType='text'
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='spocEmailAddress'
                                            controllerLabel='SPOC Email Address'
                                            disabled={!watch("isAdhoc")}
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
                                                isClearable={true}
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
                                        <CustomDropDrownController
                                            controllerName='numberOfHoursReq'
                                            controllerLabel='Default number of Hours Requested'
                                            fieldType='text'
                                            currencies={new Array(10).fill().map((item, index) => ({
                                                value: index + 1,
                                                label: index + 1,
                                            }))}
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <CustomDropDrownController
                                            controllerName='numberOfResource'
                                            controllerLabel='Number of Resources Requested'
                                            fieldType='text'
                                            currencies={new Array(5).fill().map((item, index) => ({
                                                value: index + 1,
                                                label: index + 1,
                                            }))}
                                        />
                                    </Grid>


                                </Grid>
                                <HeaderResource heading="VISIT DETAILS" />
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Box display={"flex"} alignItems={"center"}>Select Dates:{" "}
                                            <DatePicker
                                                value={watch("ticketDates")}
                                                placeholder='Ticket Dates'
                                                multiple
                                                numberOfMonths={2}
                                                minDate={getFutureDate()}
                                                editable={false}
                                                maxDate={getFutureDate(60)}
                                                style={{ width: "100%", marginLeft: "4px", height: "40px", borderRadius: '8px' }}
                                                onChange={(val, val2) => { setValue("ticketDates", val2?.validatedValue?.filter(item => typeof item === "string")) }}
                                            />
                                        </Box>
                                        {errors.ticketDates &&
                                            <FormHelperText style={{ color: "#d32f2f" }}>{errors.ticketDates?.message}</FormHelperText>
                                        }
                                    </Grid>

                                    <Grid item xs={6}>
                                        {/* <Label> */}
                                        <Box display={"flex"} alignItems={"center"}>Pick Time:{" "}
                                            <TextField
                                                placeholder='Select Time'
                                                type='time'
                                                value={watch("scheduledTime")}
                                                size='small'
                                                onChange={(e) => { setValue("scheduledTime", `${e.target.value}:00`) }}
                                                sx={{ marginLeft: "4px", height: "40px", borderRadius: '8px' }}
                                            />
                                        </Box>
                                        {errors.scheduledTime &&
                                            <FormHelperText style={{ color: "#d32f2f" }}>{errors.scheduledTime?.message}</FormHelperText>
                                        }
                                    </Grid>
                                </Grid>
                                <HeaderResource heading="FILE UPLOAD" />

                                <Grid container spacing={2}>
                                    <Grid item xs={4} {...(getValues("attachments") && !getValues("myAttachment") && { display: "flex", alignItems: "center" })}>
                                        {(getValues("attachments") && !getValues("myAttachment"))
                                            ? <FileUrlDisplay
                                                url={getValues("attachments")}
                                                controllerName='myAttachment1'
                                                controllerLabel='Upload File (Attachment)'
                                            />
                                            : <CustomDocumentUploadController
                                                controllerName='myAttachment1'
                                                controllerLabel='Upload File (Attachment 1)'
                                                isClearable={true}
                                                fieldIcon={<AttachFileIcon>
                                                    <input type="file" />
                                                </AttachFileIcon>}
                                            />
                                        }
                                    </Grid>

                                    <Grid item xs={4} {...(getValues("attachments") && !getValues("myAttachment") && { display: "flex", alignItems: "center" })}>
                                        {(getValues("attachments") && !getValues("myAttachment"))
                                            ? <FileUrlDisplay
                                                url={getValues("attachments")}
                                                controllerName='myAttachment2'
                                                controllerLabel='Upload File (Attachment)'
                                            />
                                            : <CustomDocumentUploadController
                                                controllerName='myAttachment2'
                                                controllerLabel='Upload File (Attachment 2)'
                                                isClearable={true}
                                                fieldIcon={<AttachFileIcon>
                                                    <input type="file" />
                                                </AttachFileIcon>}
                                            />
                                        }
                                    </Grid>

                                    <Grid item xs={4} {...(getValues("attachments") && !getValues("myAttachment") && { display: "flex", alignItems: "center" })}>
                                        {(getValues("attachments") && !getValues("myAttachment"))
                                            ? <FileUrlDisplay
                                                url={getValues("attachments")}
                                                controllerName='myAttachment'
                                                controllerLabel='Upload File (Attachment)'
                                            />
                                            : <CustomDocumentUploadController
                                                controllerName='myAttachment3'
                                                controllerLabel='Upload File (Attachment 3)'
                                                isClearable={true}
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
