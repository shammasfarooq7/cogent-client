export const getName = (firstName, middlename, lastname) => {
    let name = ''

    if (firstName) {
        name = firstName
    }
    if (middlename) {
        name = name + ` ${middlename}`
    }
    if (lastname) {
        name = name + ` ${lastname}`
    }
    return name
}

export const getNameFromUrl = (url) => {
    return url?.split("-")?.at(-1)
}

export const getUrlNameforDwnload = (url) => {
    return url?.split("/")?.at(-1)
}

export const getFileWithNewName = (file, userName, type) => {
    if (!file) return ""
    const fileName = file?.name || "";
    const newName = `${new Date().getTime()}-${userName}-${type}-${fileName}`
    const newFile = new File([file], newName, { type: file.type });
    return newFile
}