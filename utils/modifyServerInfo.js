import { validateUserAuthorization } from "@/utils/validateUserAuthorization"
import { updateServerInfo } from "@/api/updateServerInfo"
export const modifyServerInfo = async (authorizationInfo, serverInfo) => {
    const authorizationResponse = await validateUserAuthorization(authorizationInfo)
    if (authorizationResponse) {
        const updateServerResponse = await updateServerInfo(serverInfo)
        return !updateServerResponse || updateServerResponse === 503
        ? null
        : updateServerResponse
    }
    return null
}
