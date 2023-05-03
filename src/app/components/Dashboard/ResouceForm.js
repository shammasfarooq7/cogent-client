import { useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import { HeaderResource } from '../common/HeaderResource';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { CustomFormController } from '../common/CustomFormController';
import { FormProvider, useForm } from 'react-hook-form';
import { CustomDropDrownController } from '../common/CustomDropDownController';
import { yupResolver } from '@hookform/resolvers/yup';
import { resourceFormValidationSchema } from '../../validationSchema';
import { CREATE_RESOURCE_MUTATION, UPDATE_RESOURCE_MUTATION } from '../../../graphql/resources';
import { useMutation } from '@apollo/client';
import { Alert } from '../common/Alert';
import { SimpleDropDownController } from '../common/SimpleDropDownController';
import { availableToolsList, languages_list, skillSetList } from '../../constants';
import { CustomDocumentUploadController } from '../common/CustomDocumentUploadController';
import { uploadDocument } from '../../services/rest-apis';
// import { CustomFormPhoneController } from '../common/CustomFormPhoneController';

const style = {
    position: 'absolute',
    overflow: 'auto',
    top: '52%',
    left: '58%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: "10px",
    boxShadow: 24,
    height: "80%",
    width: "75%",

};

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
const EngagementType = [
    {
        value: 'FSE',
        label: 'FSE',
    },
    {
        value: 'FTE',
        label: 'FTE',
    },
    {
        value: 'PTE',
        label: 'PTE',
    },
    {
        value: 'REMOTE',
        label: 'REMOTE',
    }
];



export const ResourceForm = ({ openModal, setOpenModal, editInfo, refetchResources }) => {
    const handleClose = () => setOpenModal(false);

    const urlSearchParams = new URLSearchParams(window.location.search)
    const id = urlSearchParams?.get("id");

    const { userPaymentMethod, ...info } = editInfo || {};
    const editDefaultState = {
        ...info,
        ...(info?.skillSet?.length ? { skillSet: info?.skillSet?.map(skill => ({ value: skill, label: skill })) } : {}),
        ...(info?.availableTools?.length ? { availableTools: info?.availableTools?.map(tool => ({ value: tool, label: tool })) } : {}),
        ...(info?.languages?.length ? { languages: info?.languages?.map(language => ({ value: language, label: language })) } : {}),
        ...(userPaymentMethod?.length ? { ...userPaymentMethod?.[0] } : {})
    }

    const methods = useForm({
        resolver: yupResolver(resourceFormValidationSchema),
        mode: "all",
        defaultValues: {
            status: "",
            vendorName: "",
            engagementType: "",
            rpocName: "",
            email: "",
            languages: [],
            skillSet: [],
            availableTools: [],
            beneficiaryFirstName: "",
            beneficiaryMiddleName: "",
            beneficiaryLastName: "",
            beneficiaryAddress: "",
            accountNumber: "",
            iban: "",
            swiftCode: "",
            bankName: "",
            branchName: "",
            bankAddress: "",
            isOnboarded: true,
            ...editDefaultState
        }
    });
    const [createResource, { data, loading, error }] = useMutation(CREATE_RESOURCE_MUTATION);
    const [updateResource, { data: UpdateData, loading: updateLoading, error: updateError }] = useMutation(UPDATE_RESOURCE_MUTATION);

    if (data || UpdateData) {
        Alert.success(UpdateData ? "Resource updated successfully!" : "Resource created successfully!")
    }
    const { handleSubmit, formState: { errors } } = methods;

    const onSubmit = async (data) => {
        const { email, cogentEmail, status, vendorName, engagementType, rpocName, rpocContactNumber, languages, skillSet, availableTools,
            beneficiaryFirstName, firstName, middleName, lastName, idCardNumber, taxNumber, nationality, region, country, city, state,
            postalCode, addressLine1, addressLine2, rpocEmail, code, mobileNo, contactCode, contactNo, whatsappCode, whatsappNo, whatsappGroup,
            whatsappGroupLink, workPermitStatus, hourlyRate, halfDayRate, fullDayRate, monthlyRate, anyExtraRate,
            beneficiaryMiddleName, beneficiaryLastName, beneficiaryAddress, accountNumber, accountType, accountTitle,
            swiftCode, iban, bankAddress, bankName, branchName, isOnboarded, onboardedBy, myResume } = data

        let resumeDocUrl = "";
        if (myResume) {
            const response = await uploadDocument(myResume);
            resumeDocUrl = response?.url || "";
        };

        const payload = {
            accountType,
            accountTitle,
            email,
            cogentEmail,
            status,
            engagementType,
            firstName,
            lastName,
            middleName,
            idCardNumber,
            taxNumber,
            nationality,
            region,
            country,
            city,
            state,
            postalCode,
            addressLine1,
            addressLine2,
            rpocName,
            rpocContactNumber,
            rpocEmail,
            whatsappGroup,
            // whatsappGroupLink,
            workPermitStatus,
            hourlyRate,
            halfDayRate,
            fullDayRate,
            monthlyRate,
            anyExtraRate,
            languages: languages?.map(item => item?.value) || [],
            skillSet: skillSet?.map(item => item?.value) || [],
            availableTools: availableTools?.map(item => item?.value) || [],
            beneficiaryFirstName,
            beneficiaryMiddleName,
            beneficiaryLastName,
            beneficiaryAddress,
            accountNumber,
            swiftCode,
            accountNumber,
            iban,
            bankAddress,
            branchName,
            bankName,
            isOnboarded,
            onboardedBy,
            resumeDocUrl
        }


        if (editInfo) {
            await updateResource({
                variables: {
                    updateResourceInput: {
                        ...payload
                    },
                    id
                }
            })
        }
        else {
            await createResource({
                variables: {
                    createResourceInput: {
                        ...payload
                    }
                }
            })
        }


        if (refetchResources) {
            await refetchResources()
        }
        handleClose()
    }

    return (
        <Box sx={{ overflowY: "auto" }}>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ padding: "12px" }}>
                        {editInfo ? "Update Resource" : "Add Resource"}
                    </Typography>
                    <Divider />
                    <Box sx={{ p: 2 }}>
                        <HeaderResource heading="General Information" />
                        <FormProvider {...methods}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Grid container spacing={2} >
                                    <Grid item xs={4}>
                                        <CustomDropDrownController
                                            controllerName='status'
                                            controllerLabel='Status'
                                            selectDropdown={true}
                                            currencies={Status}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='vendorName'
                                            controllerLabel='Vendor Name'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomDropDrownController
                                            controllerName='engagementType'
                                            controllerLabel='Engagement Type'
                                            selectDropdown={true}
                                            currencies={EngagementType}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='rpocName'
                                            controllerLabel='RPOC Name'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='rpocEmail'
                                            controllerLabel='RPOC Email'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomDropDrownController
                                            controllerName='rpocContactNumber'
                                            controllerLabel='RPOC Contact Number'
                                            selectDropdown={true}
                                            currencies={EngagementType}
                                        />
                                    </Grid>
                                </Grid>
                                <HeaderResource heading="PERSONAL DETAILS" />
                                <Grid container spacing={2}>

                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='firstName'
                                            controllerLabel='First Name'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='middleName'
                                            controllerLabel='Middle Name'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='lastName'
                                            controllerLabel='Last Name'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='idCardNumber'
                                            controllerLabel='ID Card Number'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='taxNumber'
                                            controllerLabel='Tax Number'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={4} alignSelf={"center"}>
                                        {/* <CustomFormController
                                            controllerName='languages'
                                            controllerLabel='Languages'
                                            fieldType='text'
                                        /> */}
                                        <SimpleDropDownController
                                            controllerName='languages'
                                            options={languages_list?.map(list => ({
                                                value: list?.name,
                                                label: list?.name
                                            }))}
                                            placeholder={"Languages"}
                                            isMulti={true}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='nationality'
                                            controllerLabel='Nationality'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='region'
                                            controllerLabel='Region'
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
                                            controllerName='state'
                                            controllerLabel='State'
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
                                            controllerName='postalCode'
                                            controllerLabel='Postal Code'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <CustomFormController
                                            controllerName='addressLine1'
                                            controllerLabel='Address Line 1'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <CustomFormController
                                            controllerName='addressLine2'
                                            controllerLabel='Address Line 2'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='email'
                                            controllerLabel='Email ID'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={1.5}>
                                        <CustomDropDrownController
                                            controllerName='code'
                                            controllerLabel='+92'
                                            fieldType='text'
                                            currencies={EngagementType}
                                        />
                                    </Grid>
                                    <Grid item xs={2.5}>
                                        <CustomFormController
                                            controllerName='mobileNo'
                                            controllerLabel='Mobile No'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={1.5}>
                                        <CustomDropDrownController
                                            controllerName='contactCode'
                                            controllerLabel='+92'
                                            fieldType='text'
                                            currencies={EngagementType}
                                        />
                                    </Grid>
                                    <Grid item xs={2.5}>
                                        <CustomFormController
                                            controllerName='contactNo'
                                            controllerLabel='Contact No'
                                            fieldType='text'
                                        />
                                        {/* <CustomFormPhoneController
                                            controllerName='contactNo'
                                            controllerLabel='Contact No'
                                            fieldType='text'
                                            currencies={EngagementType}
                                        /> */}
                                    </Grid>
                                    <Grid item xs={1.5}>
                                        <CustomDropDrownController
                                            controllerName='whatsappCode'
                                            controllerLabel='+92'
                                            fieldType='text'
                                            currencies={EngagementType}
                                        />
                                    </Grid>
                                    <Grid item xs={2.5}>
                                        <CustomFormController
                                            controllerName='whatsappNo'
                                            controllerLabel='WhatsApp No'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomDropDrownController
                                            controllerName='whatsappGroup'
                                            controllerLabel='WhatsApp Group'
                                            fieldType='text'
                                            currencies={EngagementType}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='whatsappGroupLink'
                                            controllerLabel='WhatsApp Group Link'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='cogentEmail'
                                            controllerLabel='Cogent Email Id'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomDropDrownController
                                            controllerName='workPermitStatus'
                                            controllerLabel='Work Permit Status'
                                            fieldType='text'
                                            currencies={EngagementType}
                                        />
                                    </Grid>
                                </Grid>
                                <HeaderResource heading="SKILL SET & TOOLS" />
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        {/* <CustomFormController
                                            controllerName='skillSet'
                                            controllerLabel='Skill Set'
                                            fieldType='text'
                                        /> */}
                                        <SimpleDropDownController
                                            controllerName='skillSet'
                                            options={skillSetList}
                                            placeholder={"Skill Set"}
                                            isMulti={true}
                                        />

                                    </Grid>
                                    <Grid item xs={7}>
                                        <CustomDocumentUploadController
                                            controllerName='myResume'
                                            controllerLabel='My Resume/CV (Attachment)'
                                            fieldIcon={<AttachFileIcon>
                                                <input type="file" />
                                            </AttachFileIcon>}
                                        />
                                    </Grid>
                                    <Grid item xs={5}>
                                        {/* <CustomFormController
                                            controllerName='availableTools'
                                            controllerLabel='Available Tools'
                                            fieldType='text'
                                        /> */}

                                        <SimpleDropDownController
                                            controllerName='availableTools'
                                            options={availableToolsList}
                                            placeholder={"Available Tools"}
                                            isMulti={true}
                                        />
                                    </Grid>
                                </Grid>
                                <HeaderResource heading="RATE" />
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <CustomDropDrownController
                                            controllerName='hourlyRate'
                                            controllerLabel='Hourly Rate'
                                            fieldType='text'
                                            currencies={EngagementType}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='halfDayRate'
                                            controllerLabel='Half Day Rate (4 Hours)'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomDropDrownController
                                            controllerName='fullDayRate'
                                            controllerLabel='Full Day Rate (8 Hours)'
                                            fieldType='text'
                                            currencies={EngagementType}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='monthlyRate'
                                            controllerLabel='Monthly Rate'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                    </Grid>
                                    <Grid item xs={4}>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CustomFormController
                                            controllerName='anyExtraRate'
                                            controllerLabel='Any Extra (Please Specify)'
                                            fieldType='text'
                                            rowsLength={4}
                                            isMultiLine
                                        />
                                    </Grid>
                                </Grid>
                                <HeaderResource heading="Payment" />
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <CustomFormController
                                            controllerName='accountType'
                                            controllerLabel='Account Type'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <CustomFormController
                                            controllerName='accountTitle'
                                            controllerLabel='Account Title'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='beneficiaryFirstName'
                                            controllerLabel='Beneficiarys First Name'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='beneficiaryMiddleName'
                                            controllerLabel='Beneficiarys Middle Name'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='beneficiaryLastName'
                                            controllerLabel='Beneficiarys Last Name'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={8}>
                                        <CustomFormController
                                            controllerName='beneficiaryAddress'
                                            controllerLabel='Beneficiarys Address'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='sortCode'
                                            controllerLabel='Sort Code(If Applicalbe)'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='accountNumber'
                                            controllerLabel='Account Number'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='iban'
                                            controllerLabel='IBAN'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='swiftCode'
                                            controllerLabel='BIC/SWIFT'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='bankName'
                                            controllerLabel='Bank Name'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='branchName'
                                            controllerLabel='Branch Name'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='bankAddress'
                                            controllerLabel='Bank Address'
                                            fieldType='text'
                                        />
                                    </Grid>
                                </Grid>
                                <HeaderResource heading="MOBILITY AND TRANSPORT" />
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <CustomDropDrownController
                                            controllerName='modeoftransportation'
                                            controllerLabel='Mode of Transportation'
                                            fieldType='text'
                                            currencies={EngagementType}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomDropDrownController
                                            controllerName='availability'
                                            controllerLabel='Availability'
                                            fieldType='text'
                                            currencies={EngagementType}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='mobility'
                                            controllerLabel='Mobility(km)'
                                            fieldType='text'
                                        />
                                    </Grid>
                                </Grid>
                                <HeaderResource heading="CONTRACT STATUS" />
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <CustomDocumentUploadController
                                            controllerName='ndaStatus'
                                            controllerLabel='NDA Status'
                                            fieldIcon={<AttachFileIcon>
                                                <input type="file" />
                                            </AttachFileIcon>}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <CustomDocumentUploadController
                                            controllerName='b2bStatus'
                                            controllerLabel='B2B Status'
                                            fieldIcon={<AttachFileIcon>
                                                <input type="file" />
                                            </AttachFileIcon>}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <CustomFormController
                                            controllerName='onboardedBy'
                                            controllerLabel='Onboarded By'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <CustomFormController
                                            controllerName='isOnboarded'
                                            controllerLabel='onboarded Completed'
                                            fieldType='text'
                                        />
                                    </Grid>
                                </Grid>
                                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2, paddingLeft: "40px", paddingRight: "40px", background: "#0095FF", borderRadius: "12px", fontWeight: "600" }}
                                        disabled={loading || updateLoading}
                                    >
                                        {(loading || updateLoading) ? editInfo ? "UPDATING..." : "ADDING..." : editInfo ? "UPDATE" : "ADD"}
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
