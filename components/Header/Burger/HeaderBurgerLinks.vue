<template>
    <div v-for="(link, index) in links" :key="index" class="flex flex-col items-center mt-8 text-white">
        <HeaderNavigationLink :link="link" class="bg-white text-black" @click="handleLinkClick" />
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
const emit = defineEmits({
    'clickLink': null
})
function handleLinkClick() {
    emit('clickLink')
}
</script>