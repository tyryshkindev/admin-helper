<template>
    <div class="container pt-4 mx-auto text-white">
        <ServerNumber />
        <div class="py-4 flex">
            <h2 class="font-bold text-2xl">Аккаунт: {{ playerInfo.value.nickname }}</h2>
            <p v-if="playerInfo.value.isPlayerBanned" class="font-bold text-xl text-red-500 pl-2 pt-1">ЗАБЛОКИРОВАН</p>
        </div>
        <p>Игровой уровень: {{ playerInfo.value.lvl }}</p>
        <p>Организация: {{ playerInfo.value.fraction || 'Отсутствует' }}</p>
        <p>Ранг: {{ playerInfo.value.rank || 'Отсутствует' }}</p>
        <PlayerAlist :alist="playerInfo.value.alist || null" />
        <PlayerPunishmentPanel 
            v-if="!playerInfo.value.isPlayerBanned" 
            :playerNickname="playerInfo.value.nickname"
            :playerID="Number(playerInfo.value.id)"
        />
    </div>
</template>

<script setup>
const playerInfo = reactive({})
const {nick} = useRoute().params
const mainStore = useMainAdminStore()
const responseplayerInfo = await getPlayerInfo(nick, mainStore.user)
if (!responseplayerInfo?.length) {
    throw createError({statusCode: 404, message: 'Запрашиваемый игрок не найден'})
} else {
    playerInfo.value = responseplayerInfo[0]
}
</script>