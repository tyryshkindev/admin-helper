import { validateUserAuthorization } from "@/utils/validateUserAuthorization"
import { fetchAdminInfo } from "@/api/fetchAdminInfo"
export const getAdminInfo = async(targetNickname, requester) => {
    const authorizationResponse = await validateUserAuthorization(requester)
    return authorizationResponse ? await fetchAdminInfo(targetNickname) : 401 
}