import { useContext, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import { CustomFormController } from '../../../components/common/CustomFormController';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { CustomDropDrownController } from '../../../components/common/CustomDropDownController';
import { yupResolver } from '@hookform/resolvers/yup';
import { ticketFormValidationSchema, userValidationSchema } from '../../../validationSchema';
import { CREATE_USER_MUTATION, GET_ALL_USERS_QUERY} from '../../../../graphql/admin';
import {roles} from  '../../../constants'
import { useMutation, useQuery } from '@apollo/client';
import { Alert } from '../../../components/common/Alert';
import { UserContext } from '../../../context/user-context';
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

export const CreateUser = ({ openModal, setOpenModal, editInfo, refetchUser }) => {
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
            
        }
    });

   
    const [createUser, { data, loading }] = useMutation(CREATE_USER_MUTATION);
    // const [updateTicket, { data: UpdateData, loading: updateLoading }] = useMutation(UPDATE_TICKET_MUTATION);
    // const {data: getAllCustomerData, loading: customerLoading} = useQuery(GET_All_CUSTOMERS_QUERY, {
    //     variables: {
    //         getAllCustomerInput: {
    //             role: "SD",
    //         }
    //     },
    //     fetchPolicy: "network-only"
    // });

    const { handleSubmit, setValue, watch , getValues, formState: { errors } } = methods;
    const customerId = getValues('customerId')
    const selectedDropdownValue = customerId !== undefined && watch('customerId');

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);

            const {email, firstName, middleName, lastName, role} = data
            const payload = {
                email,
                firstName,
                middleName,
                lastName,
                role,
            }

            if (editInfo) {
                await createUser({
                    variables: {
                        updateResourceInput: {
                            ...payload
                        },
                        id: info?.id
                    }
                })
            }
            else {
                await createUser({
                    variables: {
                        createUserInput: {
                            ...payload
                        }
                    },
                })
                Alert.success("User created successfully!")


            }


            if (refetchUser) {
                await refetchUser()
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
                                            controllerName='role'
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
                                     
                                    </Grid>
                               
                                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2, paddingLeft: "40px", paddingRight: "40px", background: "#0095FF", borderRadius: "12px", fontWeight: "600" }}
                                        disabled={isLoading || loading}
                                    >
                                        {(isLoading || loading) ? editInfo ? "UPDATING..." : "ADDING..." : editInfo ? "UPDATE" : "ADD"}
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
