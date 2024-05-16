import { validateUserAuthorization } from "@/utils/validateUserAuthorization"
import { fetchServerInfo } from "@/api/fetchServerInfo"
import { alertClient } from "@/utils/alertClient"
export const getServerInfo = async (userAuthorizationInfo) => {
    const authorizationResponse = await validateUserAuthorization(userAuthorizationInfo)
    if (authorizationResponse) {
        const {serverID: server} = userAuthorizationInfo
        const serverInfo = await fetchServerInfo(server)
        if (!serverInfo) {
            alertClient('Неудалось получить информацию о сервере.')
            return null
        } return serverInfo 
    } return null
    
}