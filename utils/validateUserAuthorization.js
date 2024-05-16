import { authenticateUser } from "@/utils/authenticateUser"
export const validateUserAuthorization = async (authorizationInfo) => {
    const authorizationResponse = await authenticateUser(authorizationInfo)
    if (!authorizationResponse) {
        alertClient('Пройдите процедуру авторизации повторно') 
        return null
    } else if (authorizationResponse === 503) {
        alertClient('Сервер не доступен. Невозможно проверить подлинность авторизации')
        return null
    } return true
}