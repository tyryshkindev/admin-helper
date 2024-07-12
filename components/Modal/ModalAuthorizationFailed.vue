<template>
    <div>
        <ModalWindow :isOpened="isModalOpened" @closeModal="closeModal">
            <template #header>
                <p class="text-lg font-bold">{{ $t('modal__auth-title') }}</p>
            </template>
            <template #body>
                <p>{{ $t('modal__auth-body') }}</p>
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
