<template>
    <div class="lg:flex container mx-auto text-white py-4 px-8">
        <div>
            <SearchForm 
                :role="role" 
                @targetSearch="saveSearchQuery" 
            />
            <SearchLast 
                v-show="isLogAvailable" 
                :lastSearchedTargets="lastSearchedStore.lastSearchedTargets.admin" 
                :role="role"
                class="pt-4 md:max-h-36 lg:max-h-96" 
            />
        </div>
        <div v-if="isAdminsInfoLoaded">
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
const isLogAvailable = computed(() => !!lastSearchedStore.lastSearchedTargets[role.value].size)
const isGettingInfoInProgress = ref(false)
const isGettingInfoFailed = ref(false)
const authorizationInfo = reactive({
    password: mainStore.user.password,
    nickname: mainStore.user.nickname
})
const adminsInfo = reactive([])
const isAdminsInfoLoaded = computed(() => !!adminsInfo.length)

onMounted(() => {
    getAdminsInfo()
})

async function getAdminsInfo() {
    isGettingInfoInProgress.value = true
    const response = await getAllAdminsInfo(mainStore.user.serverID, authorizationInfo)
    response && typeof response !== 'number' 
    ? adminsInfo.push(...response)
    : isGettingInfoFailed.value = true
    isGettingInfoInProgress.value = false
}
function saveSearchQuery(nickname) {
    lastSearchedStore.updateLastSearchedTargets(role.value, nickname)
}

</script>