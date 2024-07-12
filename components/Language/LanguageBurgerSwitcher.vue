<template>
    <ul class="text-white">
        <li
            v-for="language in locales"
            :key="language.iso"
            :data-value="language.code"
            class="bg-black rounded-md cursor-pointer flex pt-1"
            @click="switchLanguage"
        >   
        <Icon name="i-heroicons-globe-europe-africa" class="h-6 w-6 pr-1"/>
        {{ language.name }}
        <Icon v-show="language.code === locale" name="i-heroicons-check-solid" class="h-4 w-4 pl-1" />
        </li>
    </ul>
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
