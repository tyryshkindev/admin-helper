import { authenticateUser as validateUserAuthorization } from "@/utils/authenticateUser"
import { alertClient } from "@/utils/alertClient"
import { fetchAdminInfo } from "@/api/fetchAdminInfo"
export const getAdminInfo = async(nickname, requester) => {
    if (nickname.length >= 4) {
    const authorizationResponse = await validateUserAuthorization({nickname: requester.nickname, password: requester.password})
    if (!authorizationResponse) {
        alertClient('Пройдите процедуру авторизации повторно') 
        return null
    } else if (authorizationResponse === 503) {
        alertClient('Проверка на авторизацию не удачна')
        return null
    }

    const getAdminResponse = await fetchAdminInfo(nickname)
    if (!getAdminResponse) {
        alertClient('Получение информации об администраторе не удалось')
        return null
    } else if (getAdminResponse === 503) {
        return null
    } return getAdminResponse[0]
    
    } return null
}