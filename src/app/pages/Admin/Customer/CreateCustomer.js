import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import { CustomFormController } from '../../../components/common/CustomFormController';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { customerValidationSchema } from '../../../validationSchema';
import { useMutation } from '@apollo/client';
import { Alert } from '../../../components/common/Alert';
// import { MultiDatePicker } from '../../components/common/CustomMultiDate';
import { UserContext } from '../../../context/user-context';
import CloseIcon from '@mui/icons-material/Close';
import { CREATE_CUSTOMER_MUTATION } from '../../../../graphql/admin';

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

export const CreateCustomer = ({ openModal, setOpenModal, editInfo, refetchCustomer }) => {
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
        resolver: yupResolver(customerValidationSchema),
        mode: "all",
        defaultValues: {
             name:'',
             vendorReference:'',
             website:'',
             establishYear:'',
             employeesCount:'',
             dispatchGroupEmail:'',
             city:'',
             employeeCountLinkedin:'',
             phone:'',
             country:'',
             postCode:'',
             linkedinUrl:'',
             email:'',
             stateProvince:'',
             address:'',
             annualRevenue:'',
             revenueSoftware:'',
             revenueConsultancy:'',
             revenueSupport:'',
             revenueLogistics:'',
             revenueOther:'',
             contactNumber:'',
             addressLine1:'',
             addressLine2:'',
             emailId:'',
             mobile:'',
             whatsappNumber:'',
             whatsappGroup:'',
             whatsappLink:'',
             cogentEmailId:'',
             workPermitStatus:'',
             primaryTechService:'',
             fieldService:'',
             keyCustomerSupport:'',
             languageSupport:'',
             countrySupported:'',
             certification:'',
             customerAbbr:''
        }
    });
   
    
   
    const [createCustomer, { data, loading }] = useMutation(CREATE_CUSTOMER_MUTATION);

    const { handleSubmit, setValue, watch , getValues, formState: { errors } } = methods;

   
    const onSubmit = async ({
        name,
        vendorReference,
        establishYear,
        employeesCount,
        dispatchGroupEmail,
        city,
        phone,
        country,
        postCode,
        revenueSupport,
        linkedinUrl,
        email,
        revenueOther,
        employeeCountLinkedin,
        revenueLogistics,
        revenueSoftware,
        stateProvince,
        address,
        annualRevenue,
        revenueConsultancy,
        contactNumber,
        addressLine1,
        addressLine2,
        emailId,
        mobile,
        whatsappNumber,
        whatsappGroup,
        whatsappLink,
        cogentEmailId,
        workPermitStatus,
        primaryTechService,
        fieldService,
        keyCustomerSupport,
        languageSupport,
        countrySupported,
        website,
        certification,
        customerAbbr
      }) => {
       
      
        try {
          setIsLoading(true);

          const payload = {
            name,
            vendorReference,
            establishYear,
            employeesCount,
            dispatchGroupEmail,
            revenueLogistics,
            employeeCountLinkedin,
            city,
            phone,
            website,
            revenueOther,
            revenueSoftware,
            country,
            postCode,
            linkedinUrl,
            revenueSupport,
            email,
            stateProvince,
            address,
            annualRevenue,
            revenueConsultancy,
            contactNumber,
            addressLine1,
            addressLine2,
            emailId,
            mobile,
            whatsappNumber,
            whatsappGroup,
            whatsappLink,
            cogentEmailId,
            workPermitStatus,
            primaryTechService,
            fieldService,
            keyCustomerSupport,
            languageSupport,
            countrySupported,
            certification,
            customerAbbr
          };
      
          await createCustomer({
            variables: {
              createCustomerInput: {
                ...payload
              }
            }
          });
          Alert.success("Customer created successfully!")
          if (refetchCustomer) {
            await refetchCustomer()
        }

          handleClose();
        } catch (error) {
          console.error(error);
        } finally {
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
                            {editInfo ? "Update Ticket" : "Add Customer"}
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
                                                controllerName='vendorReference'
                                                controllerLabel='Vendor Refernce'
                                                fieldType='text'
                                                
                                            />
                                            </Grid>
                                             <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='employeeCountLinkedin'
                                                controllerLabel='Employee Count Linkedin'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='website'
                                                controllerLabel='Website'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='establishYear'
                                                controllerLabel='Establish Year'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>

                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='employeesCount'
                                                controllerLabel='Employees Count'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='dispatchGroupEmail'
                                                controllerLabel='Dispatch Group Email'
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
                                                controllerName='phone'
                                                controllerLabel='Phone'
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
                                                controllerName='postCode'
                                                controllerLabel='Post Code'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='linkedinUrl'
                                                controllerLabel='Linkedin Url'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='email'
                                                controllerLabel='Email'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='stateProvince'
                                                controllerLabel='State Province'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='address'
                                                controllerLabel='Address'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='annualRevenue'
                                                controllerLabel='Annual Revenue'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='revenueSoftware'
                                                controllerLabel='Revenue Software'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='revenueConsultancy'
                                                controllerLabel='Revenue Consultancy'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='revenueSupport'
                                                controllerLabel='Revenue Support'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='revenueLogistics'
                                                controllerLabel='Revenue Logistics'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='revenueOther'
                                                controllerLabel='Revenue Other'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='contactNumber'
                                                controllerLabel='Contact Number'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='addressLine1'
                                                controllerLabel='Address Line1'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='addressLine2'
                                                controllerLabel='Address Line2'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='emailId'
                                                controllerLabel='Email Id'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='mobile'
                                                controllerLabel='Mobile'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='whatsappNumber'
                                                controllerLabel='Whatsapp Number'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='whatsappGroup'
                                                controllerLabel='Whatsapp Group'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='whatsappLink'
                                                controllerLabel='Whatsapp Link'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='cogentEmailId'
                                                controllerLabel='Cogent EmailId'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='workPermitStatus'
                                                controllerLabel='Work Permit Status'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='primaryTechService'
                                                controllerLabel='Primary Tech Service'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='fieldService'
                                                controllerLabel='Field Service'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='keyCustomerSupport'
                                                controllerLabel='Key Customer Support'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='languageSupport'
                                                controllerLabel='Language Support'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='countrySupported'
                                                controllerLabel='Country Supported'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='certification'
                                                controllerLabel='certification'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFormController
                                                controllerName='customerAbbr'
                                                controllerLabel='Customer Abbreviation'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        
                                     
                                    </Grid>
                                    
                               
                                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2, paddingLeft: "40px", paddingRight: "40px", background: "#0095FF", borderRadius: "12px", fontWeight: "600" }}
                                        // disabled={isLoading || loading}
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
