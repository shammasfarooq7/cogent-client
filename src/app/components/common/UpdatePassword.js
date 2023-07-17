import { useContext, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';
import CloseIcon from '@mui/icons-material/Close';
import { UserContext } from '../../context/user-context';
import { CREATE_UPDATE_PASSWORD_MUTATION } from '../../../graphql/admin';
import { Alert } from './Alert';
import { CustomFormController } from './CustomFormController';
import { UpdatePasswordSchema } from '../../validationSchema';

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

export const UpdatePassword = ({ openModal, setOpenModal, editInfo, refetchUser }) => {
    const handleClose = () => setOpenModal(false);

    const { user } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);

    const methods = useForm({
        resolver : yupResolver(UpdatePasswordSchema),
        mode: "all",
        defaultValues: {
            oldPass:'',
            newPass:'',
            confirmPassword:''
            
        }
    });

   
    const [changePassword, { data, loading }] = useMutation(CREATE_UPDATE_PASSWORD_MUTATION);

    const { handleSubmit, setValue, watch , getValues, formState: { errors } } = methods;

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);

            const { oldPass, newPass} = data
            const payload = {
                email:user.email,
                oldPass,
                newPass
            }

         
                await changePassword({
                    variables: {
                        changePasswordInput: {
                            ...payload
                        },
                    }
                })
            
          
                Alert.success("Password Changed successfully!")

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
                            {"Change Password"}
                        </Typography>
                        <Box sx={{ position: "relative", left: "70%", top: "12px", cursor: "pointer" }} >
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
                                            <CustomFormController
                                                controllerName='oldPass'
                                                controllerLabel='Old Password'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <CustomFormController
                                                controllerName='newPass'
                                                controllerLabel='New Password'
                                                fieldType='text'
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <CustomFormController
                                                controllerName='confirmPassword'
                                                controllerLabel='Confirm Password'
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
                                       Change Password
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
