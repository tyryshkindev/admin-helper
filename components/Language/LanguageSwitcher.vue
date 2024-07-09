<template>
        <div class="text-white" @mouseover="toggleSwitcher(true)" @mouseleave="toggleSwitcher(false)">
            <button type="button" class="relative">
                <Icon name="i-heroicons-language" class="h-6 w-6" />
            </button>
            <Transition name="switcher">
                <ul v-show="isSwitcherDisplayed" class="absolute -translate-x-3/4 top-[60px]">
                    <li
                        v-for="language in locales"
                        :key="language.iso"
                        :data-value="language.code"
                        class="bg-black rounded-md cursor-pointer p-1 flex"
                        @click="switchLanguage"
                    >   
                    <Icon name="i-heroicons-globe-europe-africa" class="h-6 w-6 pr-1"/>
                    {{ language.name }}
                    <Icon v-show="language.code === locale" name="i-heroicons-check-solid" class="h-6 w-6 pl-1" />
                    </li>
                </ul>
            </Transition>
        </div>
</template>

<script setup>
const {locales, locale, setLocale} = useI18n()
const isSwitcherDisplayed = ref(false)
function switchLanguage(event) {
    const newLang = event.target.getAttribute('data-value')
    if (newLang !== locale) {
        setLocale(newLang)
        toggleSwitcher(false)
    }
}
function toggleSwitcher(newValue) {
    isSwitcherDisplayed.value = newValue
}
</script>
<style scoped>
  .switcher-enter-active, .switcher-leave-active {
    transition: opacity 0.3s ease, max-height 0.3s ease;
  }

  .switcher-enter, .switcher-enter-from, .switcher-leave-to {
    opacity: 0;
  }
</style>
