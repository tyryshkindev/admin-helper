<template>
    <div>
        <div @click="openMenu" class="lg:hidden mt-2 w-10 h-7 relative">
            <span class="w-full h-0.5 bg-white absolute left-0 top-2"></span>
            <span class="w-full h-0.5 bg-white absolute left-0 top-50% transform -translate-y-1/2"></span>
            <span class="w-full h-0.5 bg-white absolute left-0 bottom-2"></span>
        </div>
        <transition name="burger">
            <div v-if="isBurgerOpen"
                class="fixed top-0 left-0 bottom-0 w-full max-w-screen-lg bg-black p-5 z-10 overflow-y-auto">
                <div @click="closeMenu" class="w-10 h-10 absolute top-5 right-5 z-[11]">
                    <span class="w-full h-[2px] bg-white absolute top-1/2 rotate-45 -translate-y-1/2"></span>
                    <span class="w-full h-[2px] bg-white absolute top-1/2 -rotate-45 -translate-y-1/2"></span>
                </div>
                <AppHeaderBurgerLinks :links="links" @clickLink="closeMenu" />
            </div>
        </transition>

    </div>
</template>
  
<script setup>
const props = defineProps({
    links: {
        type: Array,
        required: true
    }
})
const {links} = toRefs(props)
const isBurgerOpen = ref(false)

function openMenu() {
    isBurgerOpen.value = true
}

function closeMenu() {
    isBurgerOpen.value = false
}

</script>
<style scoped>
  .burger-enter-active, .burger-leave-active {
    transition: opacity 0.3s ease, max-height 0.3s ease;
  }

  .burger-enter, .burger-enter-from, .burger-leave-to {
    opacity: 0;
  }
</style>