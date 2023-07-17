import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import { CustomFormController } from '../../../components/common/CustomFormController';
import { FormProvider, useForm } from 'react-hook-form';
import { CustomDropDrownController } from '../../../components/common/CustomDropDownController';
import { yupResolver } from '@hookform/resolvers/yup';
import { JobsValidationSchema } from '../../../validationSchema';
import { useMutation, useQuery } from '@apollo/client';
import { Alert } from '../../../components/common/Alert';
import { IncrementTime, serviceTypeProject, supportModel, agreedSla, coverage, technologyType, currency } from '../../../constants';
import { UserContext } from '../../../context/user-context';
import CloseIcon from '@mui/icons-material/Close';
import { CREATE_JOBSITE_MUTATION, GET_ALL_PROJECTS_QUERY } from '../../../../graphql/admin';
import { CustomMultiSelect } from '../../../components/common/CustomMultiSelect';
import { CustomFormCheckboxController } from '../../../components/common/CustomFormCheckboxController';

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

export const CreateJobs = ({ openModal, setOpenModal, editInfo, refetchJob }) => {
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
        resolver: yupResolver(JobsValidationSchema),
        mode: "all",
        defaultValues: {
            name:'',
            country:'',
            city:'',
            state:'',
            province:'',
            postcode:'',
            siteAddress:'',
            pocName:'',
            pocContactNumber:'',
            pocEmailAdrress:'',
            ppe1h:'',
            ppe2h:'',
            ppe3h:'',
            ppe4h:'',
            ppe5h:'',
            ppe6h:'',
            ppe7h:'',
            ppe8h:'',
            tandm30:'',
            tandm1h:'',
            afth:'',
            wknd:'',
            ph:'',
            sat:'',
            sun:'',
            siteTiming:'',
            timeZone:'',
            dispatchAgreed:'',
            incrementTime:'',
            serviceType:'',
            supportType:'',
            serviceCatItem:'',
            agreedSla:'',
            coverage:'',
            technologyType:'',
            currency:'',
            projectId:''
        }
    });

   
    const [createJobsite, { data, loading }] = useMutation(CREATE_JOBSITE_MUTATION);
    const {data: getAllProjectsData, loading: projectLoading} = useQuery(GET_ALL_PROJECTS_QUERY, {
        variables: {
            getAllProjectsInput: {
                role: "ADMIN",
            }
        },
        fetchPolicy: "network-only"
    });
    const getAllProjects = getAllProjectsData && getAllProjectsData.getAllProjects.projects
    const getProjectIds = getAllProjects && getAllProjects.map((project) => project) 
    const projectIds = getProjectIds && getProjectIds.map((project) => {

        return {
              value : project.id,
              label : project.name
        }
    })

    const { handleSubmit, setValue, watch , getValues, formState: { errors } } = methods;
  
    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
             
            let {name, country, city, state, province, postcode,
                siteAddress, pocName, pocContactNumber, pocEmailAdrress, ppe1h, ppe2h, ppe3h, ppe4h, ppe5h, ppe6h, ppe7h,
                ppe8h, tandm30, tandm1h, afth, wknd, ph, sat, sun,
                siteTiming, timeZone, dispatchAgreed, incrementTime, serviceType, supportType, serviceCatItem,
                agreedSla, coverage, technologyType, currency, projectId
            
            } = data
            agreedSla = agreedSla && agreedSla.map((option)=> option.value);
            coverage = coverage && coverage.map((option)=> option.value);
            technologyType = technologyType && technologyType.map((option)=> option.value);
            serviceType = serviceType && serviceType.map((option)=> option.value);
            supportType = supportType && supportType.map((option)=> option.value);
            serviceCatItem = serviceCatItem && serviceCatItem.map((option)=> option.value);
            currency = currency && currency.map((option)=> option.value);

            const payload = {
                name,
                country,
                city,
                state,
                province,
                siteAddress,
                pocName,
                pocContactNumber,
                pocEmailAdrress,
                ppe1h,
                ppe2h,
                ppe3h,
                ppe4h,
                ppe5h,
                ppe6h,
                ppe7h,
                postcode,
                ppe8h,
                tandm30,
                tandm1h,
                afth,
                wknd,
                ph,
                sat,
                sun,
                siteTiming,
                timeZone,
                dispatchAgreed,
                incrementTime,
                serviceType,
                supportType,
                serviceCatItem,
                // attachments,
                agreedSla,
                coverage,
                technologyType,
                currency,
                projectId

            }
                await createJobsite({
                    variables: {
                        createJobsiteInput: {
                            ...payload
                        }
                    }
                })
                Alert.success("Job created successfully!")
                if (refetchJob) {
                    await refetchJob()
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
                            {editInfo ? "Update Ticket" : "Add Job"}
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
                                                controllerName='name'
                                                controllerLabel='Name'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='country'
                                                controllerLabel='Country'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='city'
                                                controllerLabel='City'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='state'
                                                controllerLabel='State'
                                                fieldType='text'
                                            />
                                        </Grid>

                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='province'
                                                controllerLabel='Province'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='postcode'
                                                controllerLabel='Post Code'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='siteAddress'
                                                controllerLabel='Site Address'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='pocName'
                                                controllerLabel='Poc Name'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='pocContactNumber'
                                                controllerLabel='Poc Contact Number'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='pocEmailAdrress'
                                                controllerLabel='Poc Email Adrress'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='ppe1h'
                                                controllerLabel='Ppe1h'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='ppe2h'
                                                controllerLabel='Ppe2h'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='ppe3h'
                                                controllerLabel='Ppe3h'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='ppe4h'
                                                controllerLabel='Ppe4h'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='ppe5h'
                                                controllerLabel='Ppe5h'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='ppe6h'
                                                controllerLabel='Ppe6h'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='ppe7h'
                                                controllerLabel='Ppe7h'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='ppe8h'
                                                controllerLabel='Ppe8h'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='tandm30'
                                                controllerLabel='Tandm30'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='tandm1h'
                                                controllerLabel='Tandm1h'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='afth'
                                                controllerLabel='Afth'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='wknd'
                                                controllerLabel='Wknd'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='ph'
                                                controllerLabel='Ph'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                        <CustomFormCheckboxController controllerName='sat' controllerLabel="Sat"  />
                                        </Grid>
                                        <Grid item xs={3}>
                                        <CustomFormCheckboxController controllerName='sun' controllerLabel="Sun"  />

                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='siteTiming'
                                                controllerLabel='Site Timing'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='timeZone'
                                                controllerLabel='Time Zone'
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
                                            <CustomMultiSelect
                                                controllerName='serviceType'
                                                controllerLabel='Service Type'
                                                fieldType='text'
                                                currencies={serviceTypeProject}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomMultiSelect
                                                controllerName='supportType'
                                                controllerLabel='Support Type'
                                                fieldType='text'
                                                currencies={supportModel}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomMultiSelect
                                                controllerName='serviceCatItem'
                                                controllerLabel='Service CatItem'
                                                fieldType='text'
                                                currencies={serviceTypeProject}
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
                                                controllerLabel='Coverage'
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
                                                controllerName='currency'
                                                controllerLabel='Currency'
                                                fieldType='text'
                                                currencies={currency}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomDropDrownController
                                                controllerName='projectId'
                                                controllerLabel='Project Id'
                                                fieldType='text'
                                                currencies={projectIds}
                                            />
                                        </Grid>

                                    </Grid>
                                    
                               
                                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2, paddingLeft: "40px", paddingRight: "40px", background: "#0095FF", borderRadius: "12px", fontWeight: "600" }}
                                        disabled={isLoading || loading}
                                    >
                                       ADD
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
