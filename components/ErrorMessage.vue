<template>
    <p class="text-red-700">{{ message }}</p>
</template>
<script setup>
const props = defineProps({
    message: {
        type: String,
        default: ''
    }
})
const {message} = toRefs(props)
</script>