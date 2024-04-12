<template>
    <div>
    <header class=" bg-transparent">
        <nav class="container mx-auto p-3 flex justify-between">
            <NuxtLink to="/" class="hassle__logo flex align-center"><img src="../public/hassle__logo.svg" alt="Hassle Logotype"></NuxtLink>
            <UHorizontalNavigation class="justify-end " :links="links"/>
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
const links = [{
    label: 'Войти',
    icon: 'i-heroicons-arrow-left-end-on-rectangle',
    to: '/authorization',
    labelClass: 'horizontal__nav'
}] 

</script>

<style lang="scss" scoped>
.horizontal__nav{
    background-color: rgba(251,213,224,255);
}
</style>