import { validateUserAuthorization } from "@/utils/validateUserAuthorization"
import {fetchPlayerInfo} from "@/api/fetchPlayerInfo"
export const getPlayerInfo = async(nickname, requester) => {
    const authorizationResponse = await validateUserAuthorization(requester)
    return authorizationResponse ? await fetchPlayerInfo(nickname) : 401
}