<template>
    <div class="container pt-12 mx-auto text-white">
        <div class="flex justify-between">
            <ServerNumber class="py-4"/>
            <LogoutButton />
        </div>
        <div>
            <h2 class="font-bold text-2xl py-4">Профиль: {{ nicknameWithoutUnderscore }}</h2>
            <div class="flex">
                <ProfileDayRate 
                    :rateInfo="todayRateInfo" 
                    :serverInfo="serverInfo"
                    class="pr-4"
                />
                <ProfileTableRate 
                    :rateInfo="rateInfo" 
                    :serverInfo="serverInfo" 
                />
            </div>
        </div>
            
    </div>
</template>

<script setup>
import { getServerInfo } from '@/utils/getServerInfo'
const mainStore = useMainAdminStore()
const rateInfo = mainStore.user.rate
const todayRateInfo = rateInfo[rateInfo.length - 1]
const serverInfo = await getServerInfo(mainStore.user)
const nicknameWithoutUnderscore = computed(() => {
    return !!Object.keys(mainStore.user).length ? 
    mainStore.user.nickname.split('_').join(' ')
    : null
})
</script>