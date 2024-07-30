export const authorizeUserOnServer = async (userInfo) => {
    try {
        const authorizationResponse = await $fetch('http://localhost:4000/admins', {
            query: {nickname: userInfo.nickname, password: userInfo.password, adminLvL_ne: 0}
        })
        return authorizationResponse
    } catch (error) {
        console.error(error.message)
        return 503
    }
    
}