<template>
    <div v-if="isPlayerInfoAvailable" class="container pt-4 mx-auto text-white">
        <AppServerNumber />
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
            @alistUpdated="alistChange"
        />
    </div>
    <SearchWrongMessage v-else :role="'player'"/>
</template>

<script setup>
const playerInfo = reactive({})
const {nick} = useRoute().params
const mainStore = useMainAdminStore()
async function getPlayerInfoFromServer() {
    const requester = {
        nickname: mainStore.user.nickname,
        password: mainStore.user.password
    }
    const responsePlayerInfo = await getPlayerInfo(nick, requester)
    if (responsePlayerInfo) {
        playerInfo.value = responsePlayerInfo
    }
}
function alistChange() {
    getPlayerInfoFromServer()
}
const isPlayerInfoAvailable = computed(() => {
    return playerInfo.value && Object.keys(playerInfo.value).length
})
onMounted(() => {
    getPlayerInfoFromServer()
})
</script>