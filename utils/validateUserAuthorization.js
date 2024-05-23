import { authenticateUser } from "@/utils/authenticateUser"
export const validateUserAuthorization = async (authorizationInfo) => {
    const authorizationResponse = await authenticateUser(authorizationInfo)
    return authorizationResponse || authorizationResponse !== 503
}