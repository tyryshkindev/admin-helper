<template>
    <header class="max-h-[6.5vh] bg-black">
        <nav class="container mx-auto p-3 flex justify-between">
            <div @click="countHomeRoute" class="hover:cursor-pointer">
                <img src="../public/hassle__logo.svg" alt="Hassle Logotype">
            </div>
            <div v-if="mainStore.isUserAuthorized" class="flex flex-wrap bg-gray-200 rounded-md p-1.5">
                <HeaderNavLinks :links="links.value || []"/>
            </div>
            <slot v-else>
                <div class="flex">
                    <AuthorizationButton class="bg-gray-200 hover:bg-gray-300" />
                </div>
            </slot>
        </nav>
    </header>
</template>
<script setup>
const mainStore = useMainAdminStore()
const links = reactive([])
const linkParts = reactive({
    profile: {
        label: 'Профиль',
        icon: 'i-heroicons-home',
        to: '/profile',
        badge: `${mainStore.user.nickname}`
    }, 
    statistics: {
        label: 'Статистика',
        icon: 'i-heroicons-chart-bar',
        to: '/statistics',
        badge: `${mainStore.user.nickname}`
    }, search: {
        label: 'Поиск игроков',
        icon: 'i-heroicons-magnifying-glass',
        to: '/players'
    }
})
switch (mainStore.user.adminLvl) {
    case '1': 
        links.value = [{...linkParts.statistics}]
        break
    case '2': 
    case '3':
    case '4':
        links.value = [{...linkParts.statistics}, {...linkParts.search}]
        break
    case '5':
    case '6':
        links.value = [{...linkParts.profile},{...linkParts.statistics}]
        break
    
}
function countHomeRoute() {
    if (mainStore.isUserAuthorized) {
        return mainStore.user.adminLvl >= 5 ? navigateTo('/profile') : navigateTo('/statistics')
    } return navigateTo('/')
}
</script>