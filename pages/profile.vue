<template>
    <div class="flex justify-center text-white">
        <div class="container pt-12">
            <h2 class="text-bold text-4xl py-4">Профиль: {{ nicknameWithoutUnderscore }}</h2>
            <ProfileDayRate :rateInfo="todayRateInfo" :serverLimits="serverInfo?.allowedRate"/>
        </div>
    </div>
    
</template>

<script setup>
import { getServerInfo } from '@/api/getServerInfo'
const mainStore = useMainAdminStore()
const todayRateInfo = mainStore.user.rate[mainStore.user.rate.length - 1]
const serverInfo = await getServerInfo(mainStore.user)
const nicknameWithoutUnderscore = computed(() => {
    return mainStore.user.nickname.split('_').join(' ')
})
</script>

<style lang="scss" scoped>

</style>