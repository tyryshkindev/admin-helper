<template>
    <div class="container mx-auto p-4 text-white">
        <div v-if="isInfoAvailable">
            <AppServerNumber />
            <h2 class="text-2xl font-bold pt-4">{{ $t('managment__title') }}</h2>
            <ManagmentServerPermissions 
                :serverPermissions="serverInfo.allowedRate"
                @changePermissions="changePermissions"
            />
            <ManagmentMinimumRate 
                :minimumRate="serverInfo.minimumDailyRate"
                @changeRate="changeRate"
            />
            <ManagmentSaveButton 
                class="mt-4"
                :disabled="!isInfoChanged"
                @click="saveChanges"
            />
            <p v-if="isServerUpdated" class="text-green-500">{{ $t('managment__update-success') }}</p>
        </div>
        <div v-else>
            <AppErrorMessage v-show="!isGettingInfoInProgress" :message="'Getting server info failed.'" />
        </div>
        <UILoadingSpinner v-show="isGettingInfoInProgress" />
        <ModalWindow :isOpened="isGettingInfoFailed" @closeModal="isGettingInfoFailed = false">
            <template #header>
                <p class="text-lg font-bold">{{ $t('managment__getting__info-failed') }}</p>
            </template>
            <template #body>
                <p>{{ $t('managment__modal__fetch-err') }}</p>
            </template>
        </ModalWindow>
    </div>
    
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
const serverInfo = reactive({})
const modifiedServerInfo = reactive({})
const isInfoAvailable = computed(() => !!Object.keys(serverInfo).length)
const isGettingInfoInProgress = ref(false)
const isGettingInfoFailed = ref(false)

onMounted(() => {
    getInfo()
})

async function getInfo() {
    toggleGettingInfo(true)
    const response = await getServerInfo(authorizationInfo)
    if (response && typeof response !== 'number') {
        Object.assign(serverInfo, response)
        Object.assign(modifiedServerInfo, JSON.parse(JSON.stringify(response)))
    } else {
        isGettingInfoFailed.value = true
    }
    toggleGettingInfo()
}

function toggleGettingInfo(newValue = false) {
    isGettingInfoInProgress.value = newValue
}

function compareStates() {
    isInfoChanged.value = JSON.stringify(serverInfo) !== JSON.stringify(modifiedServerInfo)
}
function changePermissions(newPermissions) {
    modifiedServerInfo.allowedRate = newPermissions
    compareStates()
}
function changeRate(newRate) {
    modifiedServerInfo.minimumDailyRate = newRate
    compareStates()
}
async function saveChanges() {
    compareStates()
    if (isInfoChanged.value) {
        const serverData = {
            serverID: mainStore.user.serverID,
            updatedInfo: modifiedServerInfo
        }
        const serverResponse = await modifyServerInfo(authorizationInfo, serverData)
        if (serverResponse) {
            Object.assign(serverInfo, JSON.parse(JSON.stringify(serverResponse)))
            Object.assign(modifiedServerInfo, JSON.parse(JSON.stringify(serverResponse)))
            compareStates()
            isServerUpdated.value = true
            await new Promise(resolve => setTimeout(resolve, 5000))
            isServerUpdated.value = false
        } else {
            isGettingInfoFailed.value = true
        }
    }
}
</script>