import { validateUserAuthorization } from "@/utils/validateUserAuthorization"
import {fetchPlayerInfo} from "@/api/fetchPlayerInfo"
export const getPlayerInfo = async(nickname, requester) => {
    const authorizationResponse = await validateUserAuthorization(requester)
    if (authorizationResponse) {
        const getPlayerResponse = await fetchPlayerInfo(nickname)
        if (!getPlayerResponse || getPlayerResponse === 503) {
            return 503
        } return getPlayerResponse[0]
    } return 401
}