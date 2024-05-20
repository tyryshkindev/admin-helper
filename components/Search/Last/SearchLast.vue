<template>
    <div>
        <h2 class="font-bold text-lg">Последние просмотренные:</h2>
        <template v-for="targetNickname in lastSearched" :key="targetNickname.id">
            <SearchLastItem :targetNickname = "targetNickname" :requesterRole="role" />
        </template>
    </div>
</template>

<script setup>
const props = defineProps({
    role: {
        type: String,
        required: true
    }
})
const {role} = toRefs(props)
const lastSearchedStore = useLastSearchedStore()
const lastSearched = computed(() => {
    return lastSearchedStore.lastSearchedTargets[role.value]
})
console.log(lastSearchedStore.lastSearchedTargets)
</script>