export const alertClient = (message) => {
    if (import.meta.client) {
        alert(message)
    }
}