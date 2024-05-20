<template>
    <transition name="modal-fade" v-show="isOpened">
        <div @click.self="closeModal" class="fixed top-0 bottom-0 right-0 left-0 backdrop-blur-sm flex justify-center items-center">
            <div class="text-white flex flex-col justify-between bg-slate-700 overflow-x-auto px-5 py-8 rounded-lg">
                <header class="p-4 flex">
                    <slot name="header">
                        Заголовок
                    </slot>
                </header>

                <section class="relative py-5 px-2.5 border-t border-solid">
                    <slot name="body">
                        Сообщение
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
function closeModal() {
    emit('closeModal')
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