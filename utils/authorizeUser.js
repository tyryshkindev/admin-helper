import {authorizeUserOnServer} from '@/api/authorizeUserOnServer'
export const authorizeUser = async (authorizationData) => {
    const {nickname, password} = authorizationData
    if (nickname?.length >= 4 && password?.length >= 6) {
        const response = await authorizeUserOnServer(authorizationData)
        if (typeof response === 'object') {
            return response[0]
        } else if (response === 503) {
            return response
        } else {
            return null
        }
    } else {
        return null
    }
}