const addLeadingZero = (date) => {
    return date < 10 ? `0${date}` : `${date}`
}
export const formatDate = (date) => {
    const hours = parseInt(date.time / 60) 
    const minutes = date.time - (hours * 60)
    return `${addLeadingZero(hours)}:${addLeadingZero(minutes)}`
}