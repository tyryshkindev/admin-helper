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
    title: 'Поиск игроков'
})
const lastSearchedStore = useLastSearchedStore()
const role = ref('player')
function saveSearchQuery(nickname) {
    lastSearchedStore.updateLastSearchedTargets(role.value, nickname)
}
const isLogAvailable = computed(() => {
    return !!Object.keys(lastSearchedStore.lastSearchedTargets[role.value]).length
})
</script>