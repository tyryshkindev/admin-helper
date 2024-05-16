import { validateUserAuthorization } from "@/utils/validateUserAuthorization"
import { alertClient } from "@/utils/alertClient"
import { fetchAdminInfo } from "@/api/fetchAdminInfo"
export const getAdminInfo = async(nickname, requester) => {
    const authorizationResponse = await validateUserAuthorization(requester)
    if (authorizationResponse) {
    const getAdminResponse = await fetchAdminInfo(nickname)
    if (!getAdminResponse) {
        alertClient('Получение информации об администраторе не удалось')
        return null
    } else if (getAdminResponse === 503) {
        return null
    } return getAdminResponse[0]
    
    } return null
}