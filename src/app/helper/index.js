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