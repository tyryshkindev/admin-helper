import { authenticateUser as validateUserAuthorization } from "@/utils/authenticateUser"
import { fetchServerInfo } from "@/api/fetchServerInfo"
import { alertClient } from "@/utils/alertClient"
export const getServerInfo = async (userAuthorizationInfo) => {
    const authorizationResponse = await validateUserAuthorization(userAuthorizationInfo)
    if (!authorizationResponse) {
        alertClient('Пройдите процедуру авторизации повторно') 
        return null
    }
    const {serverID: server} = userAuthorizationInfo
    const serverInfo = await fetchServerInfo(server)
    if (!serverInfo) {
        alertClient('Неудалось получить информацию о сервере.')
        return null
    } return serverInfo 
}
// import { alertClient } from "@/utils/alertClient";

// export const getServerInfo = async (userInfoToAuthorize) => {
//     try {
//         const authorizationResponse = await checkUserAuthorization(userInfoToAuthorize)
//         if (!authorizationResponse) {
//             throw new Error('Неверные данные авторизации')
//         }
//         const { serverID: server } = userInfoToAuthorize
//         const res = await fetch(`http://localhost:5000/servers?id=${server}`)
//         if (!res.ok) {
//             throw new Error('Ошибка сервера, попробуйте позже')
//         }
//         const response = await res.json()
//         return response.length ? response[0] : null
//     } catch (error) {
//         console.error(error);
//         const errorMessage = error.message === 'Неверные данные авторизации' ?
//             error.message :
//             'Ошибка при получении информации о сервере. Попробуйте позже'
//         alertClient(errorMessage)
//     }
// };
