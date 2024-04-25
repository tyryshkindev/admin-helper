import { alertClient } from "@/utils/alertClient"
export const fetchServerInfo = async (server) => {
    try {
        const serverInfoResponse = await $fetch('http://localhost:5000/servers', {
            query: {id: server}
        })
        return serverInfoResponse.length ? serverInfoResponse[0] : null
    } catch (error) {
        alertClient(error.message)
    }
    
}