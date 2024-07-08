<template>
        <div class="group text-white">
            <button type="button" class="relative">
                <Icon name="i-heroicons-language" class="h-6 w-6" />
            </button>
            <ul class="absolute transform -translate-x-3/4 top-12 hidden group-hover:block">
                <li
                    v-for="language in locales"
                    :key="language.iso"
                    :data-value="language.code"
                    class="bg-black rounded-md cursor-pointer p-1 flex"
                    @click="switchLanguage"
                >   
                <Icon name="i-heroicons-globe-europe-africa" class="h-6 w-6 pr-1"/>
                {{ language.name }}
                </li>
            </ul>
        </div>
</template>

<script setup>
const {locales, locale, setLocale} = useI18n()
function switchLanguage(event) {
    const newLang = event.target.getAttribute('data-value')
    if (newLang !== locale) {
        setLocale(newLang)
    }
}
</script>
