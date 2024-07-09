<template>
    <header class="max-h-[60px] fixed w-full bg-black">
        <nav class="container mx-auto p-3 flex justify-between">
            <div class="hover:cursor-pointer" @click="countHomeRoute">
                <img src="../../public/hassle__logo.svg" alt="Hassle Logotype">
            </div>
            <template v-if="mainStore.isUserAuthorized">
                <HeaderBurger :links="links.value || []" />
                <div class="flex">
                    <div class="hidden lg:flex flex-wrap flex-end bg-gray-200 rounded-md px-1.5 py-1">
                        <HeaderNavigationLinks :links="links.value || []"/>
                    </div>
                    <LanguageSwitcher class="pt-2 pl-3" />
                </div>
            </template>
            <slot v-else>
                <div class="flex">
                    <AuthorizationButton class="bg-gray-200 hover:bg-gray-300" />
                    <LanguageSwitcher class="pt-0.5 pl-4"/>
                </div>
            </slot>
        </nav>
    </header>
</template>
<script setup>
const {locale} = useI18n()
const mainStore = useMainAdminStore()
const links = reactive([])
const linkParts = reactive({ 
    statistics: {
        label: locale.value === 'ru' ? 'Статистика' : 'Statistics',
        icon: 'i-heroicons-chart-bar',
        to: '/statistics',
        badge: `${mainStore.user.nickname}`
    }, search: {
        label: locale.value === 'ru' ? 'Поиск игроков' : 'Players search',
        icon: 'i-heroicons-magnifying-glass',
        to: '/players'
    }, managment: {
        label: locale.value === 'ru' ? 'Управление сервером' : 'Server managment',
        icon: 'i-heroicons-adjustments-vertical',
        to: '/managment'
    }, monitoring: {
        label: locale.value === 'ru' ? 'Мониторинг администрации' : 'Administration monitoring',
        icon: 'i-heroicons-identification',
        to: '/monitoring'
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
        links.value = [{...linkParts.monitoring}, {...linkParts.search}]
        break
    case '6':
        links.value = [{...linkParts.managment},{...linkParts.monitoring},{...linkParts.search}]
        break
}
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
function countHomeRoute() {
    if (mainStore.isUserAuthorized) {
        redirectHome()
    } else {
        return navigateTo('/')
    }
}
</script>