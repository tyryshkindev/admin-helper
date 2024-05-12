import { alertClient } from '@/utils/alertClient'
export const updateServerInfo = async (serverInfo) => {
    try {
        const {serverID, updatedInfo} = serverInfo
        const response = await $fetch(`http://localhost:4000/servers/${serverID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedInfo)
        })
        return response
    } catch (err) {
        alertClient('Обновление информации не удалось. Попробуйте позже')
        console.error(err)
        return 503
    }
}