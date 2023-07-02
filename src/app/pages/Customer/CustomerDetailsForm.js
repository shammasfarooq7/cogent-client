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

export const CustomerFormDetails = ({ openModal, setOpenModal, editInfo, refetchTickets }) => {
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
                            {"Customer Details"}
                        </Typography>
                        <Box sx={{ position: "relative", left: "74%", top: "12px", cursor: "pointer" }} >
                            <CloseIcon onClick={handleClose} />
                        </Box>
                    </Box>
                    <Divider />
                    <Box sx={{ p: 2 }}>
    
                        <FormProvider {...methods}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                
                                <HeaderResource heading="COMPANY OVERVIEW" />
                                    <Grid container spacing={2} >
                                        
                                        <Grid item xs={4}>
                                            <CustomFormController
                                                controllerName='companyName'
                                                controllerLabel='Comapany Name'
                                                fieldType='text'
                                                InputLabelProps={{ shrink: true }}  
                                                value={editInfo?.time ?? ""}
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <CustomFormController
                                                controllerName='vendorRefernce'
                                                controllerLabel='Vendor Refernce    '
                                                fieldType='text'
                                                InputLabelProps={{ shrink: true }}  
                                                value={editInfo?.time ?? ""}
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <CustomFormController
                                                controllerName='companyWebsite'
                                                controllerLabel='Company Website'
                                                fieldType='text'
                                                InputLabelProps={{ shrink: true }}  
                                                value={editInfo?.time ?? ""}
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <CustomFormController
                                                controllerName='companyEstablished'
                                                controllerLabel='Company Established year'
                                                fieldType='text'
                                                InputLabelProps={{ shrink: true }}  
                                                value={editInfo?.time ?? ""}
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <CustomFormController
                                                controllerName='employesOnLinkedin'
                                                controllerLabel='Number of Empoyees on LinkedIn'
                                                fieldType='text'
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <CustomFormController
                                                controllerName='companyLinkedinUrl'
                                                controllerLabel='Company Linkedin URL'
                                                fieldType='text'
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <CustomFormController
                                                controllerName='noOfEmployees'
                                                controllerLabel='No of Employees Total'
                                                fieldType='text'
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <CustomFormController
                                                controllerName='companyPhone'
                                                controllerLabel='Company Phone'
                                                fieldType='text'
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <CustomFormController
                                                controllerName='companyemail'
                                                controllerLabel='Company Email'
                                                fieldType='text'
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <CustomFormController
                                                controllerName='companyDispatchemail'
                                                controllerLabel='Company Dispatch Group Email'
                                                fieldType='text'
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <CustomDropDrownController
                                                controllerName='companyCountry'
                                                controllerLabel='Company Country'
                                                fieldType='text'
                                                currencies={regions}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <CustomFormController
                                                controllerName='companyState'
                                                controllerLabel='Company State/Province'
                                                fieldType='text'
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <CustomFormController
                                                controllerName='companyCity'
                                                controllerLabel='Company City'
                                                fieldType='text'
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <CustomFormController
                                                controllerName='companyPostalCode'
                                                controllerLabel='Company Postal Code'
                                                fieldType='text'
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <CustomFormController
                                                controllerName='companyAddress'
                                                controllerLabel='Company Address'
                                                fieldType='text'
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <CustomFormController
                                                controllerName='anuualRevenue'
                                                controllerLabel='Annual Revenue US($)Total'
                                                fieldType='text'
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <CustomFormController
                                                controllerName='revenueDevelopment'
                                                controllerLabel='Revenue(Software & Development)%'
                                                fieldType='text'
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <CustomFormController
                                                controllerName='revenueConsultancy'
                                                controllerLabel='Revenue(Professional & Consultancy)%'
                                                fieldType='text'
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <CustomFormController
                                                controllerName='revenueTechnicalSupport'
                                                controllerLabel='Revenue(Technical Support Services)%'
                                                fieldType='text'
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <CustomFormController
                                                controllerName='revenueLogistic'
                                                controllerLabel='Revenue(Logistic Services)%'
                                                fieldType='text'
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <CustomFormController
                                                controllerName='revenueOthers'
                                                controllerLabel='Revenue(Others)%'
                                                fieldType='text'
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='addressLine1'
                                                controllerLabel='Address Line1'
                                                fieldType='text'
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='addressLine2'
                                                controllerLabel='Address Line2'
                                                fieldType='text'
                                                disabled
                                            />
                                        </Grid>

                                        <Grid item xs={4}>
                                            <CustomFormController
                                                controllerName='emailId'
                                                controllerLabel='Email ID*'
                                                fieldType='text'
                                                disabled
                                            />
                                        </Grid>

                                        <Grid item xs={1}>
                                            <CustomDropDrownController
                                                controllerName='+92'
                                                controllerLabel='+92'
                                                fieldType='text'
                                                currencies={countries}
                                            />
                                        </Grid>
                                        
                                        <Grid item xs={3}>
                                        <CustomFormController
                                            controllerName={'mobileNo'}
                                            controllerLabel='Mobile No'
                                            inputStyle={{ height: 40 }}
                                        />
                                        </Grid>
                                        <Grid item xs={1}>
                                            <CustomDropDrownController
                                                controllerName='+92'
                                                controllerLabel='+92'
                                                fieldType='text'
                                                currencies={countries}
                                            />
                                        </Grid>
                                        
                                        <Grid item xs={3}>
                                        <CustomFormController
                                            controllerName={'contactNo'}
                                            controllerLabel='Contact No'
                                            inputStyle={{ height: 40 }}
                                        />
                                        </Grid>
                                        <Grid item xs={1}>
                                            <CustomDropDrownController
                                                controllerName='+92'
                                                controllerLabel='+92'
                                                fieldType='text'
                                                currencies={countries}
                                            />
                                        </Grid>
                                        
                                        <Grid item xs={3}>
                                        <CustomFormController
                                            controllerName={'whatsAppNo'}
                                            controllerLabel='WhatsApp No'
                                            inputStyle={{ height: 40 }}
                                        />
                                        </Grid>

                                        <Grid item xs={4}>
                                            <CustomDropDrownController
                                                controllerName='whatsGroup'
                                                controllerLabel='WhatsApp Group'
                                                fieldType='text'
                                                currencies={countries}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <CustomFormController
                                                controllerName='whatsAppLink'
                                                controllerLabel='WhatsApp Group Link'
                                                fieldType='text'
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <CustomFormController
                                                controllerName='cogentEmailId'
                                                controllerLabel='Cogent Email ID'
                                                fieldType='text'
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <CustomDropDrownController
                                                controllerName='workPermitStatus'
                                                controllerLabel='Work Permit Status'
                                                fieldType='text'
                                                currencies={countries}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <CustomFormController
                                                controllerName='industry'
                                                controllerLabel='Industry'
                                                fieldType='text'
                                                disabled
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                        <CustomFormController
                                            controllerName='companyOverviewPrimary'
                                            controllerLabel='Company Overview(List of Primary Technical Services)'
                                            fieldType='text'
                                            rowsLength={4}
                                            isMultiLine
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CustomFormController
                                            controllerName='companyOverviewField'
                                            controllerLabel='Company Overview(Key Field Services Customer Supported)'
                                            fieldType='text'
                                            rowsLength={4}
                                            isMultiLine
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CustomFormController
                                            controllerName='companyOverview'
                                            controllerLabel='Company Overview(Key Customer Supported)'
                                            fieldType='text'
                                            rowsLength={4}
                                            isMultiLine
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CustomFormController
                                            controllerName='languagesSupported'
                                            controllerLabel='Languages Supported'
                                            fieldType='text'
                                            rowsLength={4}
                                            isMultiLine
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CustomFormController
                                            controllerName='supportedCountries'
                                            controllerLabel='Supported Countries'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CustomFormController
                                            controllerName='company Certifications'
                                            controllerLabel='Company Certifications'
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
