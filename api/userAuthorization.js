export const authorizeUser = async (userInfo) => {
    try {
        const authorizationResponse = await $fetch('http://localhost:4000/admins', {
            query: {nickname: userInfo.nickname, password: userInfo.password, adminLvL_ne: 0}
        })
        return authorizationResponse.length ? authorizationResponse[0] : null
    } catch (error) {
        alertClient(error.message)
    }
    
}