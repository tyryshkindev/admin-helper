import { validateUserAuthorization } from "@/utils/validateUserAuthorization"
import { fetchServerInfo } from "@/api/fetchServerInfo"
export const getServerInfo = async (userAuthorizationInfo) => {
    const authorizationResponse = await validateUserAuthorization(userAuthorizationInfo)
    if (authorizationResponse) {
        const {serverID: server} = userAuthorizationInfo
        return await fetchServerInfo(server)
    } return 401
    
}