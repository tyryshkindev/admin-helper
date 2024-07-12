<template>
    <div class="container p-4 mx-auto text-white">
        <UILoadingSpinner v-show="isServerRequestInProgress" />
        <div v-if="isPlayerInfoAvailable">
            <AppServerNumber />
            <div class="md:py-4 md:flex">
                <h2 class="font-bold text-2xl">{{ $t('player_title') }}: {{ playerInfo.nickname }}</h2>
                <p v-if="playerInfo.isPlayerBanned" class="font-bold text-xl text-red-500 md:pl-2 md:pt-1">
                    {{ $t('player_banned') }}
                </p>
            </div>
            <p>{{ $t('player_lvl') }}: {{ playerInfo.lvl }}</p>
            <p>{{ $t('player_fraction') }}: {{ playerInfo.fraction || 'Отсутствует' }}</p>
            <p>{{ $t('player_rank') }}: {{ playerInfo.rank || 'Отсутствует' }}</p>
            <PlayerAlist :alist="playerInfo.alist || null" />
            <PlayerPunishmentPanel 
                v-if="!playerInfo.isPlayerBanned" 
                :playerNickname="playerInfo.nickname"
                :playerID="Number(playerInfo.id)" 
                @alistUpdated="getPlayerInfoFromServer" 
            />
        </div>
        <div v-else>
            <SearchWrongMessage v-show="!isServerRequestInProgress && !isServerRequestFailed" :role="'player'" />
        </div>
        <ModalServerError 
            :isModalOpened="isServerRequestFailed" 
            @closeModal="toggleModalWindow" 
        />
    </div>
</template>

<script setup>
const playerInfo = reactive({})
const {nick} = useRoute().params
const isServerRequestInProgress = ref(false)
const isServerRequestFailed = ref(false)
const mainStore = useMainAdminStore()

const isPlayerInfoAvailable = computed(() => playerInfo && Object.keys(playerInfo).length)

onMounted(() => {
    getPlayerInfoFromServer()
})

async function getPlayerInfoFromServer() {
    isServerRequestInProgress.value = true
    const requester = {
        nickname: mainStore.user.nickname,
        password: mainStore.user.password
    }
    const responsePlayerInfo = await getPlayerInfo(nick, requester)
    if (responsePlayerInfo && typeof responsePlayerInfo !== 'number') {
        Object.assign(playerInfo, responsePlayerInfo)
    } else if (typeof responsePlayerInfo === 'number') {
        toggleModalWindow(true)
    }
    isServerRequestInProgress.value = false
}
function toggleModalWindow(newValue = false) {
    isServerRequestFailed.value = newValue
    return !newValue ? navigateTo('/players') : null
}
</script>