import { alertClient } from "@/utils/alertClient"
export const fetchAdminInfo = async (targetNickname) => {
    try {
        const response = await $fetch('http://localhost:4000/admins', {
            query: {
                nickname: targetNickname
            }
        })
        return response
    } catch (err) {
        alertClient('Получение информации с сервера неудачно. Попробуйте позже')
        console.error(err)
        return 503
    }
}