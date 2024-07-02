import { validateUserAuthorization } from "@/utils/validateUserAuthorization"
import {fetchAllAdminsInfo} from "@/api/fetchAllAdminsInfo"
export const getAllAdminsInfo = async(serverID, requester) => {
    const authorizationResponse = await validateUserAuthorization(requester)
    return authorizationResponse ? await fetchAllAdminsInfo(serverID) : 401
}