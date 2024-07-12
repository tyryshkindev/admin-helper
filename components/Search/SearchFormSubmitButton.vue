<template>
    <button type="button" :disabled="!isActive">
        <div class="bg-cyan-500 hover:bg-cyan-600 p-2 rounded-lg" :class="{'bg-cyan-700 hover:bg-cyan-700': !isActive}">
            <Icon name="i-heroicons-magnifying-glass-20-solid" class="mr-1"/>{{ $t('monitoring__search-form__submit-btn') }}
        </div>
    </button>
</template>
<script setup>
const props = defineProps({
    isActive: {
        type: Boolean
    }
})
const {isActive} = toRefs(props)
</script>
