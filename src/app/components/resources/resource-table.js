import { useState } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { images } from './../../assets/images';
import { Search } from '../common/Search';
import Title from '../common/Title';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_RESOURCE_MUTATION, GET_ALL_USERS_QUERY } from '../../../graphql/resources';
import DeleteAlert from '../common/DeleteAlert';
import { ResourceForm } from '../Dashboard/ResouceForm';
import { Alert } from '../common/Alert';
import { useNavigate } from 'react-router-dom';
import useDebounce from '../../customHooks/useDebounce';

function preventDefault(event) {
    event.preventDefault();
}

export const ResourceTable = ({ tableName, search }) => {

    const navigate = useNavigate();

    const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
    const [openResourceForm, setOpenResourceForm] = useState(false);
    const [toBeDeleted, setToBeDeleted] = useState(null);
    const [searchValue, setSearchValue] = useState(null);

    const searchQuery = useDebounce(searchValue, 500);

    const { data, loading, error, refetch } = useQuery(GET_ALL_USERS_QUERY, {
        variables: {
            getAllUsersInput: {
                role: "RESOURCE",
                ...(searchQuery && { searchQuery })
            }
        },
        fetchPolicy: "network-only"
    });

    const [deleteResource, { loading: isDeleteLoading }] = useMutation(DELETE_RESOURCE_MUTATION)

    const onDeleteClick = (id) => {
        setToBeDeleted(id);
        setOpenDeleteAlert(true)
    };

    const handleDeleteConfirm = async () => {
        await deleteResource({
            variables: {
                id: toBeDeleted

            }
        })
        await refetch();
        Alert.success("Deleted Successfully!")
        setOpenDeleteAlert(false);
    }

    const renderStatus = (status) => {
        let background = "#E8FFF3";
        let color = "#50CD89";
        if (status === "Documents Pending") {
            background = "#FFE8E8";
            color = "#FF0000";
        }

        return <Box sx={{
            textAlign: "center", paddingX: "2px", paddingY: "4px", borderRadius: "6px", background, color,
            width: 151, fontStyle: "normal", fontWeight: 500, fontSize: "11px", lineHeight: "16px"
        }}>{status}</Box>
    }

    return (
        <>
            <DeleteAlert
                open={openDeleteAlert}
                setOpen={setOpenDeleteAlert}
                handleConfirm={handleDeleteConfirm}
                isLoading={isDeleteLoading}
                title={"Delete Resource"}
                text={"Are you sure you want to delete this resource? This action cannot be revert back."}
            />

            {openResourceForm && <ResourceForm openModal={openResourceForm} setOpenModal={setOpenResourceForm} refetchResources={refetch} />}

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Title sx={{ color: "black" }}>Add Resources</Title>
                <Box>
                    {search && <Search sx={{ width: "200px" }}
                        onChange={(e) => { setSearchValue(e.target.value) }}
                    />}
                    <Button sx={{ backgroundColor: "#F64E60", color: "white", padding: "6px 30px", marginLeft: "6px" }}
                        onClick={() => setOpenResourceForm(true)}
                    >Add</Button>
                </Box>

            </Box>
            <Table size="small">
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#F5F8FA", borderRadius: "10px" }}>
                        <TableCell>Resource ID</TableCell>
                        <TableCell>Country</TableCell>
                        <TableCell>City</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell >Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody sx={{ marginTop: "10px" }}>

                    {loading
                        ? <TableRow >
                            <TableCell sx={{ padding: "16px", textAlign: "center" }} colSpan={5} >
                                Loading...
                            </TableCell>
                        </TableRow>
                        : !data?.getAllUsers?.length
                            ?
                            <TableRow >
                                <TableCell sx={{ padding: "16px", textAlign: "center" }} colSpan={5} >
                                    No Record Found
                                </TableCell>
                            </TableRow>
                            : data?.getAllUsers?.map((resource) => (
                                <TableRow key={resource.id} sx={{ mt: 2 }}>
                                    <TableCell>
                                        <Box display={"flex"} justifyContent={"center"} flexDirection={"column"}>
                                            <Box sx={{ fontFamily: 'Poppins, sans-serif', fontStyle: "normal", fontWeight: 600, fontSize: "14px", lineHeight: "21px" }}>{resource.firstName} {resource.middleName} {resource.lastName}</Box>
                                            <Box sx={{ fontFamily: 'Poppins, sans-serif', fontStyle: "normal", fontWeight: 500, fontSize: "13px", lineHeight: "20px", color: "#B5B5C3" }}>
                                                ID# {resource.id}
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{resource.country || "_ _"}</TableCell>
                                    <TableCell>{resource.city || "_ _"}</TableCell>
                                    <TableCell>{resource.isOnboarded ? renderStatus("Onboarding Completed") : renderStatus("Documents Pending")}</TableCell>
                                    <Box sx={{ display: "flex" }}>
                                        <TableCell ><Box component='img' sx={{ height: "40px", width: "40px" }} src={images.Menu} alt='Menu' /></TableCell>
                                        <TableCell ><Box component='img' sx={{ height: "40px", width: "40px", cursor: "pointer" }} src={images.Edit} alt='Menu'
                                            onClick={() => { navigate(`/resource-details?id=${resource?.id}`) }} /></TableCell>
                                        <TableCell ><Box component='img' sx={{ height: "40px", width: "40px", cursor: "pointer" }}
                                            src={images.Trash} alt='Menu'
                                            onClick={() => { onDeleteClick(resource?.id) }}
                                        /></TableCell>
                                    </Box>
                                </TableRow>
                            ))}
                </TableBody>
            </Table >
            {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link> */}
        </>
    );
}
