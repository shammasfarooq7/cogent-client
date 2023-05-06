import { useContext, useEffect, useState } from 'react';
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
import { accountTypeBusiness, availabilityOptions, availableToolsList, idCardTypeOptions, interviewStatusOptions, languages_list, skillSetList, transportOptions, workPermitStatusOptions } from '../../constants';
import { CustomDocumentUploadController } from '../common/CustomDocumentUploadController';
import { uploadDocument } from '../../services/rest-apis';
import { CustomPhoneController } from '../common/CustomPhoneController';
import { UserContext } from '../../context/user-context';
import { getName } from '../../helper';
import { CutomFormRadioController } from '../common/CutomFormRadioController';
import FileUrlDisplay from '../common/FileUrlDisplay';
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
        value: 'Remote',
        label: 'REMOTE',
    }
];



export const ResourceForm = ({ openModal, setOpenModal, editInfo, refetchResources }) => {
    const handleClose = () => setOpenModal(false);

    const { user } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);

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
            firstName: "",
            lastName: "",
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
            rpocContactNumber: "",
            isOnboarded: false,
            contractDocuments: false,
            onboardedBy: getName(user?.firstName, user?.middleName, user?.lastName),
            ...editDefaultState
        }
    });
    const [createResource, { data, loading }] = useMutation(CREATE_RESOURCE_MUTATION);
    const [updateResource, { data: UpdateData, loading: updateLoading }] = useMutation(UPDATE_RESOURCE_MUTATION);

    if (data || UpdateData) {
        Alert.success(UpdateData ? "Resource updated successfully!" : "Resource created successfully!")
    }
    const { handleSubmit, watch, setValue, getValues, formState: { errors } } = methods;

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);

            const { email, cogentEmail, status, vendorName, engagementType, rpocName, rpocContactNumber, rpocEmail, idCardType, identityDocument, languages, skillSet, availableTools,
                beneficiaryFirstName, firstName, middleName, lastName, idCardNumber, taxNumber, nationality, region, country, city, state,
                postalCode, addressLine1, addressLine2, mobileNumber, contactNumber, whatsappNumber, whatsappGroup, resumeDocUrl: resumeUrl, identityDocUrl: identityUrl,
                whatsappGroupLink, workPermitStatus, hourlyRate, halfDayRate, fullDayRate, monthlyRate, anyExtraRate,
                beneficiaryMiddleName, beneficiaryLastName, beneficiaryAddress, accountNumber, accountType, accountTitle,
                swiftCode, sortCode, iban, bankAddress, bankName, branchName, transport, availability, mobility, isOnboarded, onboardedBy, myResume, contractDocuments, interviewStatus } = data
            // return
            let resumeDocUrl = resumeUrl || "";
            if (myResume) {
                const response = await uploadDocument(myResume);
                resumeDocUrl = response?.url || "";
            };

            let identityDocUrl = identityUrl || "";
            if (myResume) {
                const response = await uploadDocument(identityDocument);
                identityDocUrl = response?.url || "";
            };

            const payload = {
                accountType,
                accountTitle,
                email,
                cogentEmail,
                status,
                engagementType,
                vendorName,
                firstName,
                lastName,
                idCardType,
                identityDocUrl,
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
                whatsappGroupLink,
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
                swiftCode,
                sortCode,
                accountNumber,
                iban,
                bankName,
                branchName,
                bankAddress,
                transport,
                availability,
                mobility,
                isOnboarded,
                onboardedBy,
                resumeDocUrl,
                mobileNumber,
                contactNumber,
                contractDocuments,
                whatsappNumber,
                interviewStatus
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
            handleClose();

        } catch (error) {

        }
        finally {
            setIsLoading(false);

        }
    };

    useEffect(() => {
        if (!editDefaultState?.isOnboarded) {
            if (watch("contractDocuments") &&
                watch("interviewStatus") === "Complete" &&
                watch("myResume") && watch("identityDocument")) {
                setValue("isOnboarded", true)
            }
            else {
                setValue("isOnboarded", false)
            }
        }
    }, [watch("contractDocuments"), watch("interviewStatus"), watch("myResume"), watch("identityDocument")]);

    return (
        <Box sx={{ overflowY: "auto" }}>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{display:"flex"}}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ padding: "12px", fontFamily:"popins", fontWeight:"600"}}>
                        {editInfo ? "Update Resource" : "Add Resource"}
                    </Typography>
                    <Box sx={{position:"relative", left:"78%", top:"12px", cursor:"pointer"}} >
                        <CloseIcon onClick={handleClose}/>
                    </Box>
                    </Box>
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
                                        <CustomPhoneController
                                            controllerName={'rpocContactNumber'}
                                            controllerLabel='RPOC Contact Number'
                                            inputStyle={{ height: 40 }}
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
                                    <Grid item xs={2}>
                                        <CustomDropDrownController
                                            controllerName='idCardType'
                                            controllerLabel='ID Card Type'
                                            selectDropdown={true}
                                            currencies={idCardTypeOptions}
                                        />
                                    </Grid>
                                    <Grid item xs={3} {...(getValues("identityDocUrl") && { display: "flex", alignItems: "center" })}>
                                        {getValues("identityDocUrl")
                                            ? <FileUrlDisplay url={getValues("identityDocUrl")} />
                                            : <CustomDocumentUploadController
                                                controllerName='identityDocument'
                                                controllerLabel='Identity (Attachment)'
                                                fieldIcon={<AttachFileIcon>
                                                    <input type="file" />
                                                </AttachFileIcon>}
                                            />
                                        }
                                    </Grid>
                                    <Grid item xs={3}>
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
                                            maxLength={500}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <CustomFormController
                                            controllerName='addressLine2'
                                            controllerLabel='Address Line 2'
                                            fieldType='text'
                                            maxLength={500}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='email'
                                            controllerLabel='Email ID'
                                            fieldType='text'
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomPhoneController
                                            controllerName={'mobileNumber'}
                                            controllerLabel='Mobile No'
                                            inputStyle={{ height: 40 }}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomPhoneController
                                            controllerName={'contactNumber'}
                                            controllerLabel='Contact No'
                                            inputStyle={{ height: 40 }}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomPhoneController
                                            controllerName={'whatsappNumber'}
                                            controllerLabel='WhatsApp No'
                                            inputStyle={{ height: 40 }}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='whatsappGroup'
                                            controllerLabel='WhatsApp Group'
                                            fieldType='text'
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
                                            currencies={workPermitStatusOptions}
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
                                    <Grid item xs={7} {...(getValues("resumeDocUrl") && { display: "flex", alignItems: "center" })}>
                                        {getValues("resumeDocUrl")
                                            ? <FileUrlDisplay url={getValues("resumeDocUrl")} />
                                            : <CustomDocumentUploadController
                                                controllerName='myResume'
                                                controllerLabel='My Resume/CV (Attachment)'
                                                fieldIcon={<AttachFileIcon>
                                                    <input type="file" />
                                                </AttachFileIcon>}
                                            />
                                        }
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
                                        <CustomFormController
                                            controllerName='hourlyRate'
                                            controllerLabel='Hourly Rate'
                                            fieldType='text'
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
                                        <CustomFormController
                                            controllerName='fullDayRate'
                                            controllerLabel='Full Day Rate (8 Hours)'
                                            fieldType='text'
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
                                        <CustomDropDrownController
                                            controllerName='accountType'
                                            controllerLabel='Account Type'
                                            fieldType='text'
                                            currencies={accountTypeBusiness}
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
                                            controllerName='transport'
                                            controllerLabel='Mode of Transportation'
                                            fieldType='text'
                                            currencies={transportOptions}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomDropDrownController
                                            controllerName='availability'
                                            controllerLabel='Availability'
                                            fieldType='text'
                                            currencies={availabilityOptions}
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
                                    <Grid item xs={4}>
                                        <CustomDropDrownController
                                            controllerName='interviewStatus'
                                            controllerLabel='Interview Status'
                                            fieldType='text'
                                            currencies={interviewStatusOptions}
                                        />
                                    </Grid>
                                    <Grid item xs={1}></Grid>
                                    <Grid item xs={3} >
                                        <CutomFormRadioController
                                            controllerName='contractDocuments'
                                            controllerLabel='Contract Documents'
                                            options={[{
                                                label: "True",
                                                value: true,
                                                disabled: false
                                            }, {
                                                label: "False",
                                                value: false,
                                                disabled: false
                                            }]}
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <CutomFormRadioController
                                            controllerName='isOnboarded'
                                            controllerLabel='Onboarded Completed?'
                                            options={[{
                                                label: "True",
                                                value: true,
                                                disabled: true
                                            }, {
                                                label: "False",
                                                value: false,
                                                disabled: true
                                            }]}
                                        />
                                    </Grid>


                                    <Grid item xs={4}>
                                        <CustomFormController
                                            controllerName='onboardedBy'
                                            controllerLabel='Onboarded By'
                                            fieldType='text'
                                            disabled={true}
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
