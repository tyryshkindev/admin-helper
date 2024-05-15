<template>
    <div v-if="isInfoAvailable" class="container px-4 pt-2 md:pt-4 mx-auto text-white">
        <AppServerNumber class="py-2 md:pt-4"/>
        <div>
            <h2 class="font-bold text-2xl py-2 md:py-4">Администратор {{ nicknameWithoutUnderscore }}</h2>
            <p class="text-lg">Уровень: {{ adminInfo.value.adminLvl }}</p>
            <div class="md:flex">
                <StatisticsDayRate 
                    :rateInfo="todayRateInfo" 
                    :serverInfo="serverInfo.value || {}"
                    class="pr-4"
                />
                <StatisticsTableRate 
                    :rateInfo="rateInfo" 
                    :serverInfo="serverInfo.value || {}" 
                />
            </div>
        </div>
    </div>
    <SearchWrongMessage v-else :role="'admin'" />
</template>

<script setup>
const mainStore = useMainAdminStore()
const {nick} = useRoute().params
const authorizationInfo = reactive({
    nickname: mainStore.user.nickname,
    password: mainStore.user.password
})
const adminInfo = reactive({
    value: await getAdminInfoFromServer()
})
const serverInfo = reactive({
    value: await getServerInfoFromServer()
})
const isInfoAvailable = computed(() => {
    return adminInfo.value && Object.keys(adminInfo.value).length
})
const nicknameWithoutUnderscore = computed(() => adminInfo.value?.nickname.split('_').join(' '))
const rateInfo = computed(() => adminInfo.value?.rate)
const todayRateInfo = computed(() => rateInfo.value[rateInfo.value.length - 1])

if (adminInfo.value?.adminLvl === '1') {
    serverInfo.value.minimumDailyRate = serverInfo.value.minimumDailyRate.helper
    const allowedForHelpersRates = {
        pm: serverInfo.value.allowedRate.pm,
        z: serverInfo.value.allowedRate.z,
        time: serverInfo.value.allowedRate.time
    }
    serverInfo.value.allowedRate = allowedForHelpersRates
} else {
    serverInfo.value.minimumDailyRate = serverInfo.value.minimumDailyRate.admin
}

async function getAdminInfoFromServer() {
    const responseAdminInfo = await getAdminInfo(nick, authorizationInfo)
    if (responseAdminInfo) {
        return responseAdminInfo
    } 
}
async function getServerInfoFromServer() {
    const authData = {...authorizationInfo, serverID: mainStore.user.serverID}
    const responseServerInfo = await getServerInfo(authData)
    if (responseServerInfo) {
        return responseServerInfo
    }
}
</script>