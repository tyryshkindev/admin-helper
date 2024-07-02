<template>
    <div class="container mx-auto text-white py-4 px-8">
        <div>
            <SearchForm 
                :role="role" 
                @targetSearch="saveSearchQuery" 
            />
            <SearchLast 
                v-show="isLogAvailable" 
                :lastSearchedTargets="lastSearchedStore.lastSearchedTargets.admin" 
                :role="role"
                class="pt-4" 
            />
        </div>
        <div>
            <ChartsMain :targetsInfo="adminsInfo" />
        </div>
    </div>
</template>
<script setup>
useHead({
    title: 'Мониторинг администрации'
})
const mainStore = useMainAdminStore()
const lastSearchedStore = useLastSearchedStore()
const role = ref('admin')
const isGettingInfoInProgress = ref(false)
const isGettingInfoFailed = ref(false)
const authorizationInfo = reactive({
    password: mainStore.user.password,
    nickname: mainStore.user.nickname
})
const adminsInfo = reactive([])

onMounted(() => {
    getAdminsInfo()
})

async function getAdminsInfo() {
    isGettingInfoInProgress.value = true
    const response = await getAllAdminsInfo(mainStore.user.serverID, authorizationInfo)
    response && typeof response !== 'number' 
    ? adminsInfo.push(response)
    : isGettingInfoFailed.value = true
    isGettingInfoInProgress.value = false
}
function saveSearchQuery(nickname) {
    lastSearchedStore.updateLastSearchedTargets(role.value, nickname)
}
const isLogAvailable = computed(() => {
    return !!lastSearchedStore.lastSearchedTargets[role.value].size
})
</script>