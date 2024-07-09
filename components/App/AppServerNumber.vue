<template>
    <h2 class="font-bold text-4xl">{{ $t('server__number') }}: {{ mainStore.user.serverID }}</h2>
</template>

<script setup>
const mainStore = useMainAdminStore()
</script>