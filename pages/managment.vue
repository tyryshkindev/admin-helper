<template>
    <div v-if="isInfoAvailable" class="container mx-auto pt-4 text-white">
        <ServerNumber />
        <h2 class="text-2xl font-bold pt-4">Управление серверной информацией</h2>
        <ManagmentServerPermissions 
            :serverPermissions="serverInfo.allowedRate"
            @changePermissions="changePermissions"
        />
    </div>
</template>

<script setup>
import { getServerInfo } from '@/utils/getServerInfo'
const isInfoAvailable = computed(() => !!Object.keys(serverInfo).length)
const mainStore = useMainAdminStore()
const authorizationInfo = {
    password: mainStore.user.password,
    nickname: mainStore.user.nickname
}
const serverInfo = await getServerInfo(authorizationInfo)
const modifiedServerInfo = reactive({})
const isInfoChanged = ref(false)
modifiedServerInfo.value = JSON.parse(JSON.stringify(serverInfo))
function compareStates() {
    isInfoChanged.value = JSON.stringify(serverInfo) !== JSON.stringify(modifiedServerInfo.value)
}
function changePermissions(newPermissions) {
    modifiedServerInfo.value.allowedRate = newPermissions
    compareStates()
}
</script>