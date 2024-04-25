import { authorizeUser } from "@/utils/authorizeUser"
export const checkUserAuthorization = async (userInfoToAuthorize) => {
    const {nickname: userNickname, password: userPassword} = userInfoToAuthorize
    const authorizationResponse = await authorizeUser({nickname: userNickname, password: userPassword})
    return authorizationResponse
}