<template>
    <div class="container mx-auto text-white py-4 px-8">
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
</template>
<script setup>
useHead({
    title: 'Мониторинг администрации'
})
const lastSearchedStore = useLastSearchedStore()
const role = ref('admin')
function saveSearchQuery(nickname) {
    lastSearchedStore.updateLastSearchedTargets(role.value, nickname)
}
const isLogAvailable = computed(() => {
    return !!lastSearchedStore.lastSearchedTargets[role.value].size
})
</script>