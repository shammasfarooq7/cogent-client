import { Box, Input, InputAdornment, TextField, Tooltip, } from "@mui/material"
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { getNameFromUrl } from "../../../helper"
import "./index.css"
import { Controller, useFormContext } from "react-hook-form";
import { Alert } from "../Alert";

const FileUrlDisplay = ({ url, controllerName, controllerLabel, allowedFileTypes = ["application/pdf", "image/jpeg"], acceptFiles = ".jpg,.jpeg,.pdf", maxFileSize = 5, }) => {

    const { control } = useFormContext();

    const handleFileChange = (e, setValue) => {
        const file = e.target?.files[0];
        if (!file) return

        if (allowedFileTypes?.includes(file?.type)) {
            if (file?.size <= maxFileSize * 1024 * 1024) {

                setValue(file)
            }
            else {
                Alert.error("Please select a file that is 5 MB or less!")
            }
        }
        else {
            Alert.error("Only Pdf files and JPG/JPEG images are allowed!")
        }
    }

    return (
        <Controller
            name={controllerName}
            control={control}
            render={({ field, fieldState: {  error: { message } = {} } }) => (
                <Box className="root">
                    <Input
                        id={controllerName}
                        type="file"
                        sx={{ display: "none" }}
                        inputProps={{ accept: acceptFiles }}
                        onChange={(e) => handleFileChange(e, field.onChange)}
                    />
                    <TextField
                        className={"disabled textfield"}
                        name={controllerName}
                        label={controllerLabel}
                        disabled={true}
                        value={getNameFromUrl(url)}
                        onClick={() => { window.open(url, "_blank") }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    < OpenInNewRoundedIcon style={{ cursor: "pointer" }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Tooltip title="Re Uplaod File">
                        <label htmlFor={controllerName} className="upload">
                            <FileUploadIcon height={"30px"} width={"30px"} />
                        </label>
                    </Tooltip>
                </Box>
            )
            }
        />
    );

}
export default FileUrlDisplay