import { validateUserAuthorization } from "@/utils/validateUserAuthorization"
import { fetchServerInfo } from "@/api/fetchServerInfo"
export const getServerInfo = async (userAuthorizationInfo) => {
    const authorizationResponse = await validateUserAuthorization(userAuthorizationInfo)
    if (authorizationResponse) {
        const {serverID: server} = userAuthorizationInfo
        const serverInfo = await fetchServerInfo(server)
        if (!serverInfo || serverInfo === 503) {
            return null
        } return serverInfo 
    } return 401
    
}