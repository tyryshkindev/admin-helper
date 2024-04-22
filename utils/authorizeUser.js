import { authorizeUserOnServer } from "@/api/authorization"
export default async function (userInfo) {
    const {nickname, password} = userInfo
    let responseUserInfo
        if (nickname.length >= 4 && password.length >= 6) {
            const serverResponceUserInfo = await authorizeUserOnServer(userInfo)
            if (serverResponceUserInfo.length && Object.keys(serverResponceUserInfo[0]).length) {
                responseUserInfo = serverResponceUserInfo[0]
                window.sessionStorage.setItem('authorization-nickname', `${serverResponceUserInfo[0].nickname}`)
                window.sessionStorage.setItem('authorization-password', `${serverResponceUserInfo[0].password}`)
        }
    }
    return responseUserInfo
}