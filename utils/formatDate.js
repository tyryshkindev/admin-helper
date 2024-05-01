const addLeadingZero = (date) => {
    return date < 10 ? `0${date}` : `${date}`
}
export const formatDate = (date) => {
    const hours = parseInt(date / 60) 
    const minutes = date - (hours * 60)
    return `${addLeadingZero(hours)}:${addLeadingZero(minutes)}`
}