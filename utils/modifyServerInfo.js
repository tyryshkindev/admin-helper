import { authenticateUser as validateUserAuthorization } from "@/utils/authenticateUser"
import { alertClient } from "@/utils/alertClient"
import { updateServerInfo } from "@/api/updateServerInfo"
export const modifyServerInfo = async (authorizationInfo, serverInfo) => {
    const {nickname, password} = authorizationInfo
    if (nickname.length >= 4) {
    const authorizationResponse = await validateUserAuthorization({nickname, password})
    if (!authorizationResponse) {
        alertClient('Пройдите процедуру авторизации повторно') 
        return null
    } else if (authorizationResponse === 503) {
        alertClient('Сервер не доступен. Невозможно проверить подлинность авторизации')
        return null
    }

    const updateServerResponse = await updateServerInfo(serverInfo)
    if (!updateServerResponse) {
        alertClient('Обновление информации неудачно. Попробуйте позже')
        return null
    } else if (updateServerResponse === 503) {
        return null
    } return true
    
    } return null
}