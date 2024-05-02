import { authenticateUser as validateUserAuthorization } from "@/utils/authenticateUser"
import { fetchServerInfo } from "@/api/fetchServerInfo"
import { alertClient } from "@/utils/alertClient"
export const getServerInfo = async (userAuthorizationInfo) => {
    const authorizationResponse = await validateUserAuthorization(userAuthorizationInfo)
    if (!authorizationResponse) {
        alertClient('Пройдите процедуру авторизации повторно') 
        return null
    } else if (authorizationResponse === 503){
        alertClient('Проверка на авторизацию не удачна')
        return null
    }
    const {serverID: server} = userAuthorizationInfo
    const serverInfo = await fetchServerInfo(server)
    if (!serverInfo) {
        alertClient('Неудалось получить информацию о сервере.')
        return null
    } return serverInfo 
}