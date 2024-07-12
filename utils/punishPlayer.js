import { fetchPlayerInfo } from "@/api/fetchPlayerInfo"
import { setPunishment } from '@/api/setPunishment'
export const punishPlayer = async (target, punishmentInfo) => {
    const playerInfoResponse = await fetchPlayerInfo(target.nickname)
    if (!playerInfoResponse || playerInfoResponse == 503) {
        return null
    }
    const existingAlist = playerInfoResponse.alist
   const response = await setPunishment(target.ID, existingAlist, punishmentInfo)
   return !!response && response !== 503
}
