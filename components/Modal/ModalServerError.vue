<template>
    <div>
        <ModalWindow :isOpened="isModalOpened" @closeModal="closeModal">
            <template #header>
                <p class="text-lg font-bold">Ошибка при получении данных с сервера</p>
            </template>
            <template #body>
                <p>Возникла внутренняя ошибка сервера, получение данных невозможно.</p>
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
