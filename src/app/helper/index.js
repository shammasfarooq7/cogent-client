import { ROLE } from "../constants"

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

export const filterCheckInOutTimeForRole = (item, role) => {

    const { checkIn: resourceCheckIn, checkOut: resourceCheckOut, feopsCheckIn, feopsCheckOut, sdCheckIn, sdCheckOut } = item || {}

    const formatResult = (checkIn, checkOut) => {
        return { checkIn, checkOut }
    }

    switch (role?.toLowerCase()) {
        case ROLE.RESOURCE:
            return formatResult(resourceCheckIn, resourceCheckOut)

        case ROLE.SD:
            return formatResult(sdCheckIn, sdCheckOut)

        case ROLE.FEOPS:
            return formatResult(feopsCheckIn, feopsCheckOut)

        default:
            return formatResult(resourceCheckIn, resourceCheckOut)
    }

}

export const getTimeFromDate = (date) => {
    if (!date) return ""
    const hour = new Date(date).getHours();
    const hourVal = hour < 10 ? `0${hour}` : hour;
    const min = new Date(date).getMinutes();
    const minVal = min < 10 ? `0${min}` : min;
    const sec = new Date(date).getSeconds();
    const secVal = sec < 10 ? `0${sec}` : sec;

    return `${hourVal}:${minVal}:${secVal}`
}