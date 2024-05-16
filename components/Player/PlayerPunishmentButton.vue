<template>
    <button class="bg-red-500 md:hover:bg-red-400 rounded-lg"><p class="p-2 text-black">{{ buttonText }}</p></button>
</template>

<script setup>
const props = defineProps({
    buttonText: {
        type: String,
        required: true
    }
})
const {buttonText} = toRefs(props)
</script>