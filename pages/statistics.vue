<template>
    <div class="container mx-auto text-white">
        <div v-if="isInfoAvailable">
            <div class="flex justify-between">
                <AppServerNumber class="py-4" />
                <StatisticsLogoutButton />
            </div>
            <div>
                <h2 class="font-bold text-2xl py-4">Администратор {{ nicknameWithoutUnderscore }}</h2>
                <div class="lg:flex">
                    <StatisticsDayRate 
                        :rateInfo="todayRateInfo" 
                        :serverInfo="serverInfo" 
                        class="pr-4" 
                    />
                    <StatisticsTableRate 
                        :rateInfo="rateInfo" 
                        :serverInfo="serverInfo" 
                    />
                </div>
            </div>
        </div>
        <div v-else>
            <UILoadingSpinner v-show="isServerRequestInProgress" />
            <ModalServerError :isModalOpened="isServerRequestFailed" @closeModal="toggleFailedRequest" />
        </div>

    </div>
</template>

<script setup>
useHead({
    title: 'Статистика администратора'
})
const mainStore = useMainAdminStore()
const authorizationInfo = reactive({
    nickname: mainStore.user.nickname,
    password: mainStore.user.password,
    serverID: mainStore.user.serverID,
})
const serverInfo = reactive({})
const isServerRequestInProgress = ref(false)
const isServerRequestFailed = ref(false)

const rateInfo = computed(() => mainStore.user.rate || [])
const todayRateInfo = computed(() => rateInfo.value[rateInfo.value.length - 1] || {})
const nicknameWithoutUnderscore = computed(() => {
    return mainStore.isUserAuthorized ?
        mainStore.user.nickname.split('_').join(' ')
        : null
})
const isInfoAvailable = computed(() => !!Object.keys(serverInfo).length)

onMounted(() => {
    getInfoAboutServer()
})

function toggleFailedRequest(newValue = false) {
    isServerRequestFailed.value = newValue
}

function toggleRequestInProgress(newValue = false) {
    isServerRequestInProgress.value = newValue
}

async function getInfoAboutServer() {
    toggleRequestInProgress(true)
    const serverResponse = await getServerInfo(authorizationInfo)
    if (serverResponse && typeof serverResponse !== 'number') {
        Object.assign(serverInfo, JSON.parse(JSON.stringify(serverResponse)))
        modifyServerInfo()
    } else if (typeof serverResponse === 'number') {
        toggleFailedRequest(true)
    }
    toggleRequestInProgress(false)
}

function modifyServerInfo() {
    if (mainStore.user.adminLvl === '1') {
        serverInfo.minimumDailyRate = serverInfo.minimumDailyRate.helper
        const allowedForHelpersRates = {
            pm: serverInfo.allowedRate.pm,
            z: serverInfo.allowedRate.z,
            time: serverInfo.allowedRate.time
        }
        serverInfo.allowedRate = allowedForHelpersRates
    } else {
        serverInfo.minimumDailyRate = serverInfo.minimumDailyRate.admin
    }
}
</script>