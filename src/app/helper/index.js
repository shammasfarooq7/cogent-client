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
    return url?.split("/")?.at(-1)
}