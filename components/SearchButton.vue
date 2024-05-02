<template>
    <button @click="clickSearch" type="button">
        <div class="bg-cyan-500 hover:bg-cyan-600 p-2 rounded-lg">
            <Icon name="i-heroicons-magnifying-glass-20-solid" class="mr-1"/>Поиск
        </div>
    </button>
</template>
<script setup>
const emit = defineEmits({
    'searchPlayer': null
})
function clickSearch() {
    emit('searchPlayer')
}
</script>
