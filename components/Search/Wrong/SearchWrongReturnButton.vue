<template>
     <button class="bg-green-500 rounded-lg hover:bg-green-300">
        <NuxtLink :to="redirectRoute"><p class="text-black text-lg p-2">{{ $t('monitoring__search-wrong__return-btn') }}</p></NuxtLink>
    </button>
</template>

<script setup>
const props = defineProps({
    redirectRoute: {
        type: String,
        required: true
    }
})
const {redirectRoute} = toRefs(props)
</script>