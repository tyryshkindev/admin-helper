<template>
    <div v-if="isInfoAvailable" class="container mx-auto p-4 text-white">
        <AppServerNumber />
        <h2 class="text-2xl font-bold pt-4">Управление серверной информацией</h2>
        <ManagmentServerPermissions 
            :serverPermissions="serverInfo.value.allowedRate"
            @changePermissions="changePermissions"
        />
        <ManagmentMinimumRate 
            :minimumRate="serverInfo.value.minimumDailyRate"
            @changeRate="changeRate"
        />
        <ManagmentSaveButton 
            class="mt-4"
            :disabled="!isInfoChanged"
            @click="handleSaveChanges"
        />
        <p v-if="isServerUpdated" class="text-green-500">Информация о сервере успешно обновлена!</p>
    </div>
    <AppErrorMessage v-else :message="'Получение информации о сервере неудачно.'" />
</template>

<script setup>
useHead({
    title: 'Управление сервером'
})
const mainStore = useMainAdminStore()
const authorizationInfo = reactive({
    password: mainStore.user.password,
    nickname: mainStore.user.nickname
})
const isInfoChanged = ref(false)
const isServerUpdated = ref(false)
const serverInfo = reactive({
    value: await getServerInfo(authorizationInfo)
})
const modifiedServerInfo = reactive({})
modifiedServerInfo.value = JSON.parse(JSON.stringify(serverInfo.value))
const isInfoAvailable = computed(() => !!Object.keys(serverInfo.value).length)
function compareStates() {
    isInfoChanged.value = JSON.stringify(serverInfo.value) !== JSON.stringify(modifiedServerInfo.value)
}
function changePermissions(newPermissions) {
    modifiedServerInfo.value.allowedRate = newPermissions
    compareStates()
}
function changeRate(newRate) {
    modifiedServerInfo.value.minimumDailyRate = newRate
    compareStates()
}
async function updateServer() {
    serverInfo.value = await getServerInfo(authorizationInfo)
    modifiedServerInfo.value = JSON.parse(JSON.stringify(serverInfo.value))
    compareStates()
    isServerUpdated.value = true
    await new Promise(resolve => setTimeout(resolve, 5000))
    isServerUpdated.value = false
}
async function handleSaveChanges() {
    compareStates()
    if (isInfoChanged.value) {
        const serverData = {
            serverID: mainStore.user.serverID,
            updatedInfo: modifiedServerInfo.value
        }
        const response = await modifyServerInfo(authorizationInfo, serverData)
        response
        ? updateServer()
        : isServerUpdated.value = false
    }
}
</script>