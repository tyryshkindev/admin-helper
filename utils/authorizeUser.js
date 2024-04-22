import { authorizeUserOnServer } from "@/api/authorization"
export const authorizeUser = async (userInfo) => {
    const {nickname, password} = userInfo
    let responseUserInfo
        if (nickname.length >= 4 && password.length >= 6) {
            const serverResponceUserInfo = await authorizeUserOnServer(userInfo)
            if (serverResponceUserInfo.length && Object.keys(serverResponceUserInfo[0]).length) {
                responseUserInfo = serverResponceUserInfo[0]
        }
    }
    return responseUserInfo
}