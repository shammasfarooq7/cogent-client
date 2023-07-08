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
import { projectValidationSchema, ticketFormValidationSchema } from '../../../validationSchema';
import { CREATE_TICKET_MUTATION, UPDATE_TICKET_MUTATION, GET_All_CUSTOMERS_QUERY, GET_PROJECT_BY_CUSTOMERS_QUERY } from '../../../../graphql/tickets';
import { useMutation, useQuery } from '@apollo/client';
import { Alert } from '../../../components/common/Alert';
import { SimpleDropDownController } from '../../../components/common/SimpleDropDownController';
import { slaPriority, servicePriority, serviceLevel, serviceType, technology, tools_list, sites, regions, countries, projects, ticketsType, agreedSla, coverage, technologyType, serviceTypeProject, supportModel, talentLevel, IncrementTime, sowDesc, status } from '../../../constants';
import { CustomDocumentUploadController } from '../../../components/common/CustomDocumentUploadController';
// import { MultiDatePicker } from '../../components/common/CustomMultiDate';
import { uploadDocument } from '../../../services/rest-apis';
import { UserContext } from '../../../context/user-context';
import { getFileWithNewName, getName } from '../../../helper';
import FileUrlDisplay from '../../../components/common/FileUrlDisplay/FileUrlDisplay';
import CloseIcon from '@mui/icons-material/Close';
import { CREATE_PROJECT_MUTATION } from '../../../../graphql/admin';
import { CustomMultiSelect, CustomMultiSelectController } from '../../../components/common/CustomMultiSelect';

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

export const CreateProject = ({ openModal, setOpenModal, editInfo, refetchTickets }) => {
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
        resolver:yupResolver(projectValidationSchema),
        mode: "all",
        defaultValues: {
            startDate:'',
            endDate:'',
            customerId:'',
            status:'',
            name:'',
            clientPartnerName:'',
            custSdmName:'',
            custSdmEmail:'',
            custSdmContNum:'',
            cogSdmName:'',
            cogSdmNum:'',
            cogSdmCont:'',
            cogSdEmail:'',
            cogSdContNum:'',
            agreedSla:'',
            coverage:'',
            technologyType:'',
            serviceType:'',
            supportModel:'',
            talentLevel:'',
            cancelPolicy:'',
            dispatchAgreed:'',
            incrementTime:'',
            sow:'',
            sowDesc:'',
            owJd:'',
            serviceDeliv:'',
            ssInst:'',
            asInst:'',
            toolsReq:'',
            namedWorker:'',
            assignedWorker:'',
            technicalSkill:'',
            behSkills:'',
            experienceReq:'',
            langReq:'',
            trainReq:'',
            trainDoc:'',
            reqTools:'',
            reqSoft:'',
            specReq:'',
            cl1ee:'',
            cl1ec:'',
            cl2ee:'',
            cl2ec:'',
            cgl1ee:'',
            cgl1ec:'',
            cfl2ee:'',
            cgl2ec:'',
            code:''
        }
    });

   
    const [createProject, { data, loading }] = useMutation(CREATE_PROJECT_MUTATION);
    const [updateTicket, { data: UpdateData, loading: updateLoading }] = useMutation(UPDATE_TICKET_MUTATION);
    const {data: getAllCustomerData, loading: customerLoading} = useQuery(GET_All_CUSTOMERS_QUERY, {
        variables: {
            getAllCustomerInput: {
                role: "ADMIN",
            }
        },
        fetchPolicy: "network-only"
    });
    const getAllCustomer = getAllCustomerData && getAllCustomerData.getAllCustomer.customers
    const getCustomerIds = getAllCustomer && getAllCustomer.map((customers) => customers.id) 
    const customerIds = getCustomerIds && getCustomerIds.map((id) => {

        return {
              value : id,
              label : id
        }
    })
    console.log("getAllCustomerData", customerIds)
    
    if (data) {
        Alert.success("Project created successfully!")
    }

    const { handleSubmit, setValue, watch , getValues, formState: { errors } } = methods;
    const customerId = getValues('customerId')
    const selectedDropdownValue = customerId !== undefined && watch('customerId');
    console.log("watch", selectedDropdownValue, customerId)


    useEffect(() => {
       if (customerId) {
        setValue('customerId',customerId )
       }

    }, [selectedDropdownValue, customerId]);

   
    const onSubmit = async (data) => {
        debugger
        try {
            setIsLoading(true);

            let {startDate, endDate, customerId, status, name, clientPartnerName, custSdmName,
                custSdmEmail, custSdmContNum, cogSdmName, cogSdmNum, cogSdmCont, cogSdEmail, cogSdContNum, agreedSla, coverage, technologyType, serviceType,
                supportModel, talentLevel, cancelPolicy, dispatchAgreed, incrementTime, sow, sowDesc, owJd,
                serviceDeliv, ssInst, asInst, toolsReq, namedWorker, assignedWorker, technicalSkill,
                behSkills, experienceReq, langReq, trainReq, trainDoc, reqTools, reqSoft, specReq, cl1ee, cl1ec,
                cl2ee, cl2ec, cgl1ee, cgl1ec, cfl2ee, cgl2ec, code
            
            } = data

             agreedSla = agreedSla && agreedSla.map((option)=> option.value);
             coverage = coverage && coverage.map((option)=> option.value);
             technologyType = technologyType && technologyType.map((option)=> option.value);
             serviceType = serviceType && serviceType.map((option)=> option.value);
             supportModel = supportModel && supportModel.map((option)=> option.value);
             talentLevel = talentLevel && talentLevel.map((option)=> option.value);




            const payload = {
                startDate,
                endDate,
                customerId,
                status,
                name,
                clientPartnerName,
                custSdmEmail,
                custSdmContNum,
                cogSdmName,
                cogSdmNum,
                cogSdmCont,
                cogSdEmail,
                cogSdContNum,
                agreedSla,
                coverage,
                technologyType,
                serviceType,
                custSdmName,
                supportModel,
                talentLevel,
                cancelPolicy,
                dispatchAgreed,
                incrementTime,
                sow,
                sowDesc,
                owJd,
                serviceDeliv,
                ssInst,
                asInst,
                toolsReq,
                namedWorker,
                assignedWorker,
                technicalSkill,
                // attachments,
                behSkills,
                experienceReq,
                langReq,
                trainReq,
                trainDoc,
                reqTools,
                reqSoft,
                specReq,
                cl1ee,
                cl1ec,
                cl2ee,
                cl2ec,
                cgl1ee,
                cgl1ec,
                cfl2ee,
                code,
                cgl2ec

            }

                await createProject({
                    variables: {
                        createProjectInput: {
                            ...payload
                        }
                    }
                })
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
                            {editInfo ? "Update Ticket" : "Add Project"}
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
                                
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='startDate'
                                                controllerLabel='Start Date'
                                                fieldType='date'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='endDate'
                                                controllerLabel='End Date'
                                                fieldType='date'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomDropDrownController
                                                controllerName='customerId'
                                                controllerLabel='Customer Id'
                                                fieldType='text'
                                                currencies={customerIds}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomDropDrownController
                                                controllerName='status'
                                                controllerLabel='status'
                                                fieldType='text'
                                                currencies = {status}
                                            />
                                        </Grid>

                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='name'
                                                controllerLabel='Name'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='clientPartnerName'
                                                controllerLabel='Client Partner Name'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='custSdmName'
                                                controllerLabel='Cust Sdm Name'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='custSdmEmail'
                                                controllerLabel='Cust Sdm Email'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='custSdmContNum'
                                                controllerLabel='Cust Sdm ContNum'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='cogSdmName'
                                                controllerLabel='Cog Sdm Name'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='cogSdmNum'
                                                controllerLabel='Cog Sdm Num'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='cogSdmCont'
                                                controllerLabel='Cog Sdm Cont'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='cogSdEmail'
                                                controllerLabel='Cog Sd Email'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='cogSdContNum'
                                                controllerLabel='Cog Sd ContNum'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomMultiSelect
                                                controllerName='agreedSla'
                                                controllerLabel='Agreed Sla'
                                                fieldType='text'
                                                currencies={agreedSla}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomMultiSelect
                                                controllerName='coverage'
                                                controllerLabel='coverage'
                                                fieldType='text'
                                                currencies={coverage}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomMultiSelect
                                                controllerName='technologyType'
                                                controllerLabel='Technology Type'
                                                fieldType='text'
                                                currencies={technologyType}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomMultiSelect
                                                controllerName='serviceType'
                                                controllerLabel='Service Type'
                                                fieldType='text'
                                                currencies={serviceTypeProject}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomMultiSelect
                                                controllerName='supportModel'
                                                controllerLabel='Support Model'
                                                fieldType='text'
                                                currencies={supportModel}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomMultiSelect
                                                controllerName='talentLevel'
                                                controllerLabel='Talent Level'
                                                fieldType='text'
                                                currencies={talentLevel}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='cancelPolicy'
                                                controllerLabel='Cancel Policy'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='dispatchAgreed'
                                                controllerLabel='Dispatch Agreed'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomDropDrownController
                                                controllerName='incrementTime'
                                                controllerLabel='Increment Time'
                                                fieldType='text'
                                                currencies={IncrementTime}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='sow'
                                                controllerLabel='Sow'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomDropDrownController
                                                controllerName='sowDesc'
                                                controllerLabel='Sow Desc'
                                                fieldType='text'
                                                currencies={sowDesc}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='owJd'
                                                controllerLabel='Ow Jd'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='serviceDeliv'
                                                controllerLabel='Service Deliv'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='ssInst'
                                                controllerLabel='Ss Inst'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='asInst'
                                                controllerLabel='As Inst'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='toolsReq'
                                                controllerLabel='Tools Req'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='namedWorker'
                                                controllerLabel='Named Worker'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='assignedWorker'
                                                controllerLabel='Assigned Worker'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='technicalSkill'
                                                controllerLabel='Technical Skill'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='behSkills'
                                                controllerLabel='Beh Skills'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='langReq'
                                                controllerLabel='Lang Req'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='trainReq'
                                                controllerLabel='Train Req'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='trainDoc'
                                                controllerLabel='Train Doc'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='reqTools'
                                                controllerLabel='Req Tools'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='reqSoft'
                                                controllerLabel='Req Soft'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='specReq'
                                                controllerLabel='Spec Req'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='experienceReq'
                                                controllerLabel='Experience Req'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='cl1ee'
                                                controllerLabel='Cl1ee'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='cl1ec'
                                                controllerLabel='Cl1ec'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='cl2ee'
                                                controllerLabel='Cl2ee'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='cl2ec'
                                                controllerLabel='Cl2ec'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='cgl1ee'
                                                controllerLabel='Cgl1ee'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='cgl1ec'
                                                controllerLabel='Cgl1ec'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='cfl2ee'
                                                controllerLabel='Cfl2ee'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='cgl2ec'
                                                controllerLabel='Cgl2ec'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='code'
                                                controllerLabel='Code'
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
