import { validateUserAuthorization } from "@/utils/validateUserAuthorization"
import { fetchAdminInfo } from "@/api/fetchAdminInfo"
export const getAdminInfo = async(targetNickname, requester) => {
    const authorizationResponse = await validateUserAuthorization(requester)
    if (authorizationResponse) {
        return await fetchAdminInfo(targetNickname)
    } return 401
}