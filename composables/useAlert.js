export const useAlert = (message) => {
    if (process.client) {
        alert(message)
    }
}