<template>
    <AppHeader>&nbsp;</AppHeader>
    <BackgroundImage class="flex align-middle">
        <div class="container mx-auto p-4 flex justify-center items-center text-center">
            <AuthorizationForm @authorization="authorizeUser" />
        </div>
    </BackgroundImage>
</template>

<script setup>
definePageMeta({
    layout: 'empty'
})
useHead({
    title: 'Авторизация | admins.hassle.online'
})
const mainStore = useMainAdminStore()
function authorizeUser(userInfo) {
    if (userInfo) {
        mainStore.writeUser(userInfo)
        return navigateTo('/profile')
    }
}
</script>