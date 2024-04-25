import {authorizeUser} from '@/api/userAuthorization'
export const authenticateUser = async (authorizationData) => {
    const {nickname, password} = authorizationData
    if (nickname?.length >= 4 && password?.length >= 6) {
        const response = await authorizeUser(authorizationData)
        console.log(response)
        return response
    } else {
        return null
    }
}