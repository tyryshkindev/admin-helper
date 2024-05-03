import { alertClient } from "@/utils/alertClient";
export const fetchPlayerInfo = async (nicknametoGet) => {
    try {
        const playerInfo = await $fetch('http:localhost:4000/players', {
            query: {nickname: nicknametoGet}
        })
        return playerInfo
    } catch (error) {
        console.error(error)
        alertClient('Не удалось получить информацию о игроке с сервера')
        return 503
    }
} 