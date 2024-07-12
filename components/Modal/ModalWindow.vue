<template>
    <transition name="modal-fade">
        <div v-show="isOpened" class="fixed top-0 bottom-0 right-0 left-0 backdrop-blur-sm flex justify-center items-center" @click.self="closeModal" @keyup.esc="closeModal">
            <div class="text-white flex flex-col justify-between bg-slate-700 overflow-x-auto px-4 py-6 rounded-lg">
                <header class="p-4 flex">
                    <slot name="header">
                        {{ $t('modal__header') }}
                    </slot>
                </header>

                <section class="relative py-5 px-2.5 border-t border-solid">
                    <slot name="body">
                        {{ $t('modal__body') }}
                    </slot>
                </section>

                <footer class="text-right border-t border-solid">
                    <slot name="footer">
                    <ModalCloseButton class="mt-4" @click="closeModal" />
                    </slot>
                </footer>
            </div>
        </div>
    </transition>
</template>

<script setup>
const props = defineProps({
    isOpened: {
        type: Boolean
    }
})
const {isOpened} = toRefs(props)
const emit = defineEmits({
    'closeModal': null
})

onMounted(() => {
    if (import.meta.client) {
        document.addEventListener('keydown', handleKeydown)
    }
})
onBeforeUnmount(() => {
    if (import.meta.client) {
        document.removeEventListener('keydown', handleKeydown)
    }
})

function closeModal() {
    emit('closeModal')
}
function handleKeydown(event) {
    if (isOpened.value && event.key === 'Escape') {
        closeModal()
    }
}
</script>
  
<style>
.modal-fade-enter,
.modal-fade-leave-to {
    opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity .5s ease;
}
</style>