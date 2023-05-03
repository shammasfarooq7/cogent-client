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
            debugger
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