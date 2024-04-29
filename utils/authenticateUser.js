import {authorizeUser} from '@/api/userAuthorization'
export const authenticateUser = async (authorizationData) => {
    const {nickname, password} = authorizationData
    if (nickname?.length >= 4 && password?.length >= 6) {
        const response = await authorizeUser(authorizationData)
        if (typeof response === 'object') {
            return response[0]
        } else if (response === 503) {
            return response
        } else {
            return null
        }
        // return response?.length ? response[0] : null
    } else {
        return null
    }
}