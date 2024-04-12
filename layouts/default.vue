<template>
    <div>
        <AuthorizedHeader v-if="mainStore.isUserAuthorized"/>
        <UnauthorizedHeader v-else/>
        <div>
            <slot />
        </div>
        <footer>
            
        </footer>
    </div>
</template>

<script setup>
const mainStore = useMainAdminStore()
</script>

<style lang="scss" scoped>
</style>