export const fetchAdminInfo = async (targetNickname) => {
    try {
        const response = await $fetch('http://localhost:4000/admins', {
            query: {
                nickname: targetNickname
            }
        })
        return response.length ? response[0] : null
    } catch (err) {
        console.error(err)
        return 503
    }
}