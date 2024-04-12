<template>
    <div>
    <header class="shadow-sm bg-black">
        <nav class="container mx-auto p-2 flex justify-between">
            <NuxtLink to="/" class="hassle__logo flex align-center"><img src="../public/hassle__logo.svg" alt="Hassle Logotype"></NuxtLink>
            <UHorizontalNavigation class="justify-end" :links="links"/>
        </nav>
    </header>
        <div>
            <slot />
        </div>
        <footer>
            
        </footer>
    </div>
</template>

<script setup>
const mainStore = useMainAdminStore()
const links = [ {
        label: 'Профиль',
        icon: 'i-heroicons-home',
        to: '/',
        badge: `${mainStore.nickName}`
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

<style lang="scss" scoped>
</style>