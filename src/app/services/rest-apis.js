export const uploadDocument = async (document) => {
    const formData = new FormData();
    formData.append("myfile", document);

    try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/azure-blob/upload`, {
            method: "POST",
            body: formData,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("cogent_token")}`,
            }
        })
        if (response.ok) {
            const data = await response.json();

            return { url: data?.url }
        }

        return {
            error: `${document} File Upload Faied`
        }

    } catch (error) {
        console.log({ error });
        return { error }
    }
};

export const downloadFile = (fileName) => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/azure-blob/download?filename=${fileName}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/octet-stream',
            "Authorization": `Bearer ${localStorage.getItem("cogent_token")}`,

        },
    })
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        })
        .catch(error => {
            console.error('Error downloading file:', error);
        });
}