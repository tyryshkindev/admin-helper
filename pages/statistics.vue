<template>
    <div class="container pt-12 mx-auto text-white">
        <div class="flex justify-between">
            <AppServerNumber class="py-4"/>
            <StatisticsLogoutButton />
        </div>
        <div>
            <h2 class="font-bold text-2xl py-4">Администратор {{ nicknameWithoutUnderscore }}</h2>
            <div class="flex">
                <StatisticsDayRate 
                    :rateInfo="todayRateInfo" 
                    :serverInfo="serverInfo || []"
                    class="pr-4"
                />
                <StatisticsTableRate 
                    :rateInfo="rateInfo" 
                    :serverInfo="serverInfo || []" 
                />
            </div>
        </div>
            
    </div>
</template>

<script setup>
useHead({
    title: 'Статистика администратора'
})
const mainStore = useMainAdminStore()
const rateInfo = mainStore.user.rate
const todayRateInfo = rateInfo[rateInfo.length - 1]
const authorizationInfo = reactive({
    nickname: mainStore.user.nickname,
    password: mainStore.user.password,
    serverID: mainStore.user.serverID,
})
const serverInfo = await getServerInfo(authorizationInfo)
serverInfo.minimumDailyRate = mainStore.user.adminLvl === '1' // если пользовать - помощник
? serverInfo.minimumDailyRate.helper // выставляем минимальные требования как к помощнику
: serverInfo.minimumDailyRate.admin // в ином случае требования как к администратору
const allowedForHelpersRates = {
    pm: serverInfo.allowedRate.pm,
    z: serverInfo.allowedRate.z,
    time: serverInfo.allowedRate.time
}
serverInfo.allowedRate = mainStore.user.adminLvl === '1' // если пользователь - помощник
? serverInfo.allowedRate = allowedForHelpersRates // выставляем только нужные ему разрешенные требования 
: serverInfo.allowedRate // оставляем все как есть
const nicknameWithoutUnderscore = computed(() => {
    return mainStore.isUserAuthorized ? 
    mainStore.user.nickname.split('_').join(' ')
    : null
})
</script>