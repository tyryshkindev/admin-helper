<template>
    <button @click="mainStore.logoutFromProfile" class="rounded-lg" :type="type">
        <NuxtLink class="bg-red-700 hover:bg-red-500 p-2 rounded-lg">
            <Icon name="i-heroicons-arrow-left-on-rectangle" />Выйти из аккаунта
        </NuxtLink>
    </button>
</template>
<script setup>
const props = defineProps({
    type: {
        type: String,
        default: 'button'
    },
})
const {type} = toRefs(props)
const mainStore = useMainAdminStore()
</script>
