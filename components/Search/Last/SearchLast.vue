<template>
    <div>
        <h2 class="font-bold text-lg">{{ $t('monitoring__last__viewed-title') }}:</h2>
        <div v-for="targetNickname in lastSearched" :key="targetNickname.id">
            <SearchLastItem :targetNickname = "targetNickname" :requesterRole="role" class="pt-4" />
        </div>
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
</script>