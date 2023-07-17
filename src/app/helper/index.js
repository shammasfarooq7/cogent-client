
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
    if (!url) return ""
    if (url?.split("-")?.length === 1) {
        return decodeURIComponent(url.split('/').pop());
    }
    return decodeURIComponent(url.split('-').pop());
}

export const getUrlNameforDwnload = (url) => {
    if (!url) return ""
    return url?.split("/")?.at(-1)
}

export const getFileWithNewName = (file, userName, type) => {
    if (!file) return ""
    const fileName = file?.name || "";
    const newName = `${new Date().getTime()}-${userName}-${type}-${fileName}`
    const newFile = new File([file], newName, { type: file.type });
    return newFile
}

export const getFutureDate = (daysAfter = 1) => {
    return new Date(new Date().setDate(new Date().getDate() + daysAfter))
}

export const convertTimeToUTCTime = (timeString) => {
    if (!timeString) return ""
    const [hours, minutes, seconds] = timeString.split(':');
    const now = new Date(); // Get the current date and time in local timezone
    now.setHours(hours, minutes, seconds); // Set the specified time in UTC

    const utcTime = now.toLocaleTimeString('en-US', { timeZone: 'UTC', hour12: false }) + "Z";

    const formatTime = (time) => {
        const [hour, min, sec] = time?.split(":")
        if (hour === "24") {
            return `00:${min}:${sec}`
        }
        return time
    }
    return formatTime(utcTime)
}