<template>
    <button @click="clickSearch" type="button" :disabled="isDisabled">
        <div class="bg-cyan-500 hover:bg-cyan-600 p-2 rounded-lg" :class="{'bg-cyan-700 hover:bg-cyan-700': isDisabled}">
            <Icon name="i-heroicons-magnifying-glass-20-solid" class="mr-1"/>Поиск
        </div>
    </button>
</template>
<script setup>
const props = defineProps({
    isDisabled: {
        type: Boolean
    }
})
const emit = defineEmits({
    'searchPlayer': null
})
function clickSearch() {
    emit('searchPlayer')
}
</script>
