<template>
    <div v-for="(link, index) in links" :key="index" :class="{ 'border-b-2 border-sky-600': isLinkActive(link) }">
        <HeaderNavLink :link="link" class="hover:bg-white" />
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
const route = useRoute()
function isLinkActive(link) {
    return route.path === link.to
}
</script>