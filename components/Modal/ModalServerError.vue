<template>
    <div>
        <ModalWindow :isOpened="isModalOpened" @closeModal="closeModal">
            <template #header>
                <p class="text-lg font-bold">{{ $t('modal__server__error-header') }}</p>
            </template>
            <template #body>
                <p>{{ $t('modal__server__error-body') }}</p>
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
