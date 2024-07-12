<template>
    <div class="!z-50">
        <div class="lg:hidden mt-2 w-10 h-7 relative" @click="openMenu">
            <span class="w-full h-0.5 bg-white absolute left-0 top-2" />
            <span class="w-full h-0.5 bg-white absolute left-0 top-50% transform -translate-y-1/2"/>
            <span class="w-full h-0.5 bg-white absolute left-0 bottom-2"/>
        </div>
        <transition name="burger">
            <div v-if="isBurgerOpen" class="fixed top-0 left-0 bottom-0 w-full max-w-screen-lg bg-black p-5 overflow-y-auto z-50" @click.self="closeMenu">
                <div class="w-10 h-10 absolute top-5 right-5 z-50" @click="closeMenu">
                    <span class="w-full h-[2px] bg-white absolute top-1/2 rotate-45 -translate-y-1/2"/>
                    <span class="w-full h-[2px] bg-white absolute top-1/2 -rotate-45 -translate-y-1/2"/>
                </div>
                <HeaderBurgerLinks :links="links" @clickLink="closeMenu" />
                <div class="flex flex-col items-center mt-8">
                    <LanguageBurgerSwitcher />
                </div>
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