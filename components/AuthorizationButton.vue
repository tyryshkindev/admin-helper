<template>
    <button class="rounded-lg" :type="props.type">
        <NuxtLink to="/authorization" class="p-4 ">
            <Icon name="i-heroicons-arrow-left-end-on-rectangle" />Войти
        </NuxtLink>
    </button>
</template>
<script setup>
const props = defineProps({
    type: {
        type: String,
        default: 'button'
    },
})
</script>
