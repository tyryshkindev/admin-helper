<template>
    <header class="max-h-[60px] fixed w-full bg-black">
        <nav class="container mx-auto p-3 flex justify-between">
            <div class="hover:cursor-pointer" @click="countHomeRoute">
                <img src="../../public/hassle__logo.svg" alt="Hassle Logotype">
            </div>
            <template v-if="mainStore.isUserAuthorized">
                <HeaderBurger :links="links" />
                <div class="hidden lg:flex">
                    <div class="hidden lg:flex flex-wrap flex-end bg-gray-200 rounded-md px-1.5 py-1">
                        <HeaderNavigationLinks :links="links"/>
                    </div>
                    <LanguageSwitcher class="hidden lg:block pt-2 pl-3" />
                </div>
            </template>
            <slot v-else>
                <div class="flex">
                    <LanguageSwitcher class="pt-1 pr-3"/>
                    <AuthorizationButton class="bg-gray-200 hover:bg-gray-300" />
                </div>
            </slot>
        </nav>
    </header>
</template>
<script setup>
const {locale} = useI18n()
const mainStore = useMainAdminStore()
const linkParts = computed(() => {
    return {
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
    }
})

const links = computed(() => {
    switch (mainStore.user.adminLvl) {
        case '1':
            return [{ ...linkParts.value.statistics }]
        case '2':
        case '3':
        case '4':
            return [{ ...linkParts.value.statistics }, { ...linkParts.value.search }]
        case '5':
            return [{ ...linkParts.value.monitoring }, { ...linkParts.value.search }]
        case '6':
            return [{ ...linkParts.value.managment }, { ...linkParts.value.monitoring }, { ...linkParts.value.search }]
        default:
            return []
    }
}); 

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