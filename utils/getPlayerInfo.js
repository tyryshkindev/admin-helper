import { validateUserAuthorization } from "@/utils/validateUserAuthorization"
import { alertClient } from "@/utils/alertClient"
import {fetchPlayerInfo} from "@/api/fetchPlayerInfo"
export const getPlayerInfo = async(nickname, requester) => {
    const authorizationResponse = await validateUserAuthorization(requester)
    if (authorizationResponse) {
        const getPlayerResponse = await fetchPlayerInfo(nickname)
        if (!getPlayerResponse) {
            alertClient('Получение информации об игрока не удалось')
            return null
        } else if (getPlayerResponse === 503) {
            return null
        } return getPlayerResponse[0]
    } return null    
}