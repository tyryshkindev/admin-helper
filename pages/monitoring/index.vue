
import AdminsSearchForm from '~/components/AdminsSearchForm.vue';
<template>
    <div class="container mx-auto text-white">
        <SearchForm :role="'admin'" />
    </div>
</template>
<script setup>
useHead({
    title: 'Мониторинг администрации'
})
</script>