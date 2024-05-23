export const fetchServerInfo = async (server) => {
    try {
        const serverInfoResponse = await $fetch('http://localhost:4000/servers', {
            query: {id: server}
        })
        return serverInfoResponse.length ? serverInfoResponse[0] : null
    } catch (error) {
        console.error(error.message)
        return 503
    }
    
}