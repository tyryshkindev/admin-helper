import { alertClient } from "@/utils/alertClient"
export const fetchServerInfo = async (server) => {
    try {
        const serverInfoResponse = await $fetch('http://localhost:5000/servers', {
            query: {id: server}
        })
        return serverInfoResponse.length ? serverInfoResponse[0] : null
    } catch (error) {
        console.error(error.message)
        alertClient('Возникла ошибка при получении данных о сервере. Попробуйте позже')
    }
    
}