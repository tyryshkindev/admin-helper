<template>
    <div class="flex justify-center text-white">
        <div class="container pt-12">
            <h2 class="font-bold text-4xl py-4">Сервер: {{ mainStore.user.serverID }}</h2>
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
    </div>
</template>

<script setup>
import { getServerInfo } from '@/utils/getServerInfo'
const mainStore = useMainAdminStore()
const rateInfo = mainStore.user.rate
const todayRateInfo = rateInfo[rateInfo.length - 1]
const serverInfo = await getServerInfo(mainStore.user)
if (typeof serverInfo !== 'object') await navigateTo('/authorization')
const nicknameWithoutUnderscore = computed(() => {
    return mainStore.user.nickname.split('_').join(' ')
})
</script>