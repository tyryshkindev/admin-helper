<template>
    <button type="button" class="text-white bg-cyan-400 hover:bg-cyan-300 border border-solid border-cyan-400 rounded p-2" @click="closeModal">
        Закрыть
    </button>
</template>

<script setup>
const emit = defineEmits({
    'closeModal': null
})
function closeModal() {
    emit('closeModal')
}
</script>