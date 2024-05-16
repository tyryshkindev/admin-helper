import { validateUserAuthorization } from "@/utils/validateUserAuthorization"
import { alertClient } from "@/utils/alertClient"
import { updateServerInfo } from "@/api/updateServerInfo"
export const modifyServerInfo = async (authorizationInfo, serverInfo) => {
    const authorizationResponse = await validateUserAuthorization(authorizationInfo)
    if (authorizationResponse) {
        const updateServerResponse = await updateServerInfo(serverInfo)
        if (!updateServerResponse) {
            alertClient('Обновление информации неудачно. Попробуйте позже')
            return null
        } else if (updateServerResponse === 503) {
            return null
        } return true
        
        }
    return null
}
