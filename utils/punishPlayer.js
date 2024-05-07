import { alertClient } from "@/utils/alertClient"
import { fetchPlayerInfo } from "@/api/fetchPlayerInfo"
import { setPunishment } from '@/api/setPunishment'
export const punishPlayer = async (target, punishmentInfo) => {
    const playerInfoResponse = await fetchPlayerInfo(target.nickname)
    if (!playerInfoResponse?.length || playerInfoResponse == 503) {
        alertClient('Не удалось получить актуальную информацию о игроке. Выдача наказания невозможна')
        return null
    }
    const existingAlist = playerInfoResponse[0].alist
   const response = await setPunishment(target.ID, existingAlist, punishmentInfo)
   return !!response && response !== 503
}
