export const fetchAllAdminsInfo = async (serverID) => {
    try {
        const serverResponse = await $fetch('http://localhost:4000/admins', {
            query: {
                serverID: serverID
            }
        })
        return serverResponse.length ? serverResponse : null
    } catch (error) {
        console.error(error)
        return 503
    }
} 