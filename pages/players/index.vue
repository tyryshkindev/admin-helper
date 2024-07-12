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
const {locale} = useI18n()
useHead({
    title: locale.value === 'ru' ? 'Поиск игроков' : 'Players search'
})
const lastSearchedStore = useLastSearchedStore()
const role = ref('player')
function saveSearchQuery(nickname) {
    lastSearchedStore.updateLastSearchedTargets(role.value, nickname)
}
const isLogAvailable = computed(() => {
    return !!lastSearchedStore.lastSearchedTargets[role.value].size
})
</script>