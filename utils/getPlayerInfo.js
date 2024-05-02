import { authenticateUser as validateUserAuthorization } from "@/utils/authenticateUser"
import { alertClient } from "@/utils/alertClient"
import {fetchPlayerInfo} from "@/api/fetchPlayerInfo"
export const getPlayerInfo = async(nickname, requester) => {
    if (nickname.length >= 4) {
    const authorizationResponse = await validateUserAuthorization({nickname: requester.nickname, password: requester.password})
    if (!authorizationResponse) {
        alertClient('Пройдите процедуру авторизации повторно') 
        return null
    } else if (authorizationResponse === 503) {
        alertClient('Проверка на авторизацию не удачна')
        return null
    }

    const getPlayerResponse = await fetchPlayerInfo(nickname)
    if (!getPlayerResponse) {
        alertClient('Получение информации об игрока не удалось')
        return null
    } else if (getPlayerResponse === 503) {
        return null
    } return getPlayerResponse
    
    } return null
}