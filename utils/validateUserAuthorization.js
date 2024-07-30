import { authorizeUser } from "@/utils/authorizeUser"
export const validateUserAuthorization = async (authorizationInfo) => {
    const authorizationResponse = await authorizeUser(authorizationInfo)
    return authorizationResponse || authorizationResponse !== 503
}