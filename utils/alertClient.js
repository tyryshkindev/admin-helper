export const alertClient = (message) => {
    if (process.client) {
        alert(message)
    }
}