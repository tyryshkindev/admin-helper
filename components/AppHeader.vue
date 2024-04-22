<template>
    <header class="max-h-[6.5vh] bg-black">
        <nav class="container mx-auto p-3 flex justify-between">
            <NuxtLink to="/">
                <img src="../public/hassle__logo.svg" alt="Hassle Logotype">
            </NuxtLink>
            <div v-if="mainStore.isUserAuthorized" class="flex flex-wrap bg-gray-200 rounded-md p-1.5">
                <HeaderNavLinks :links="links"/>
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

const links = [{
    label: 'Профиль',
    icon: 'i-heroicons-home',
    to: '/profile',
    badge: `${mainStore.user.nickname}`
}, {
    label: 'Статистика',
    icon: 'i-heroicons-chart-bar',
    to: '/statistics'
}, {
    label: 'Поиск игроков',
    icon: 'i-heroicons-magnifying-glass',
    to: '/players'
}] 
</script>