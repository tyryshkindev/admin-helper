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
const redirectHome = () =>  {
    const juniorAdmins = ['1','2','3', '4']
    const adminLvl = mainStore.user.adminLvl
    const checkAdminLvl = lvl => lvl === adminLvl
    if (juniorAdmins.some(checkAdminLvl)) {
        return navigateTo('/statistics')
    } else if (adminLvl === '5') {
        return navigateTo('/monitoring')
    } else {
        return navigateTo('/managment')
    }
}
function authorizeUser(userInfo) {
    if (userInfo) {
        mainStore.writeUser(userInfo)
        redirectHome()
    }
}
</script>