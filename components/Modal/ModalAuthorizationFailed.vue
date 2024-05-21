<template>
    <div>
        <ModalWindow :isOpened="isModalOpened" @closeModal="closeModal">
            <template #header>
                <p class="text-lg font-bold">Ошибка при авторизации</p>
            </template>
            <template #body>
                <p>Невозможно авторизоваться, возникла ошибка сервера</p>
            </template>
        </ModalWindow>
    </div>
</template>
<script setup>
const props = defineProps({
    isModalOpened: {
        type: Boolean
    }
})
const {isModalOpened} = toRefs(props)
const emit = defineEmits({
    'closeModal': null
})
function closeModal() {
    emit('closeModal')
}
</script>
