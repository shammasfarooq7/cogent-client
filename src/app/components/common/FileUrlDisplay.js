import { Box } from "@mui/material"
import { getNameFromUrl } from "../../helper"

const FileUrlDisplay = ({ url }) => {

    return (
        <Box display={"flex"} marginY={"auto"} columnGap={2} alignItems={"center"} >
            {getNameFromUrl(url)}
            <a href={url} target="_blank">Open</a>
        </Box>)

}
export default FileUrlDisplay