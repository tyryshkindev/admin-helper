<template>
    <div class="flex justify-center text-white">
        <div class="container pt-12">
            <div class="flex justify-between">
                <h2 class="font-bold text-4xl py-4">Сервер: {{ mainStore.user.serverID }}</h2>
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