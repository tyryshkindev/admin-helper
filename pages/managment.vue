<template>
    <div v-if="isInfoAvailable" class="container mx-auto pt-4 text-white">
        <ServerNumber />
        <h2 class="text-2xl font-bold pt-4">Управление серверной информацией</h2>
        <ManagmentServerPermissions 
            :serverPermissions="serverInfo.allowedRate"
            @changePermissions="changePermissions"
        />
        <ManagmentMinimumRate 
            :minimumRate="serverInfo.minimumDailyRate"
            @changeRate="changeRate"
        />
        <ManagmentSaveButton 
            @click="handleSaveChanges"
            :disabled="!isInfoChanged"
            class="mt-4"
        />
        <p v-if="isServerUpdated" class="text-green-500">Информация о сервере успешно обновлена!</p>
    </div>
    <ErrorMessage v-else :message="'Получение информации о сервере неудачно.'" />
</template>

<script setup>
import { getServerInfo } from '@/utils/getServerInfo'
import { modifyServerInfo } from '@/utils/modifyServerInfo'
const mainStore = useMainAdminStore()
const authorizationInfo = reactive({
    password: mainStore.user.password,
    nickname: mainStore.user.nickname
})
const isInfoChanged = ref(false)
const isServerUpdated = ref(false)
let serverInfo = await getServerInfo(authorizationInfo)
const modifiedServerInfo = reactive({})
modifiedServerInfo.value = JSON.parse(JSON.stringify(serverInfo))
const isInfoAvailable = computed(() => !!Object.keys(serverInfo).length)
function compareStates() {
    isInfoChanged.value = JSON.stringify(serverInfo) !== JSON.stringify(modifiedServerInfo.value)
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
    isServerUpdated.value = true
    serverInfo = await getServerInfo(authorizationInfo)
    modifiedServerInfo.value = JSON.parse(JSON.stringify(serverInfo))
    compareStates()
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