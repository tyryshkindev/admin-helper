export const fetchPlayerInfo = async (nicknametoGet) => {
    try {
        const playerInfo = await $fetch('http://localhost:4000/players', {
            query: {
                nickname: nicknametoGet
            }
        })
        return playerInfo.length ? playerInfo[0] : null
    } catch (error) {
        console.error(error)
        return 503
    }
} 