<template>
    <div class="container px-4 pt-2 md:pt-4 mx-auto text-white" >
        <div v-if="isInfoAvailable" >
            <AppServerNumber class="py-2 md:pt-4"/>
            <div>
                <h2 class="font-bold text-2xl py-2 md:py-4">Администратор {{ nicknameWithoutUnderscore }}</h2>
                <p class="text-lg">Уровень: {{ adminInfo.adminLvl }}</p>
                <div class="md:flex">
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
            <SearchWrongMessage v-if="!isRequestInProgress && !isRequestFailed" :role="'admin'" />
        </div>
        <UILoadingSpinner v-show="isRequestInProgress" />
        <ModalServerError :isModalOpened="isRequestFailed" @closeModal="toggleWrongRequest" />
    </div>
    
</template>
<script setup>
const mainStore = useMainAdminStore()
const {nick} = useRoute().params
const authorizationInfo = reactive({
    nickname: mainStore.user.nickname,
    password: mainStore.user.password
})
const adminInfo = reactive({})
const serverInfo = reactive({})
const isRequestInProgress = ref(false)
const isRequestFailed = ref(false)

const isInfoAvailable = computed(() => !!Object.keys(adminInfo).length)
const nicknameWithoutUnderscore = computed(() => adminInfo.nickname.split('_').join(' '))
const rateInfo = computed(() => adminInfo.rate || [])
const todayRateInfo = computed(() => rateInfo.value[rateInfo.value.length - 1] || [])

onMounted(async () => {
    await loadAdminInfo()
    if (Object.keys(adminInfo).length) {
        loadServerInfo()
    }
})

function toggleWrongRequest(newValue = false) {
    isRequestFailed.value = newValue
    return !newValue ? navigateTo('/monitoring') : null
}

function toggleRequestInProgress(newValue = false) {
    isRequestInProgress.value = newValue
}

async function loadAdminInfo() {
    toggleRequestInProgress(true)
    const responseAdminInfo = await getAdminInfo(nick, authorizationInfo)
    if (responseAdminInfo && typeof responseAdminInfo !== 'number') {
        Object.assign(adminInfo, JSON.parse(JSON.stringify(responseAdminInfo)))
    } else if (typeof responseAdminInfo === 'number') {
        toggleWrongRequest(true)
    }
    toggleRequestInProgress()
}
async function loadServerInfo() {
    toggleRequestInProgress(true)
    const authData = {...authorizationInfo, serverID: mainStore.user.serverID}
    const responseServerInfo = await getServerInfo(authData)
    if (responseServerInfo && typeof responseServerInfo !== 'number') {
        Object.assign(serverInfo, JSON.parse(JSON.stringify(responseServerInfo)))
        modifyServerInfo()
    } else if (typeof responseServerInfo === 'number'){
        toggleWrongRequest(true)
    }
    toggleRequestInProgress()
}

function modifyServerInfo() {
    if (adminInfo.adminLvl === '1') {
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