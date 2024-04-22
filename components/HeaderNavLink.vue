<template>
    <NuxtLink :to="link.to" class="flex items-center py-1.5 px-2 hover:bg-white rounded-md">
        <Icon :name="link.icon" class="w-5 h-5 mr-2" />
        <div class="flex items-center">
            <p>{{ link.label }}</p>
            <p v-if="link.badge" class="mx-2 border-gray-200 text-xs font-medium px-1.5 py-0.5 rounded bg-gray-300">
                {{ link.badge }}
            </p>
        </div>
    </NuxtLink>
</template>

<script setup>
const props = defineProps({
    link: {
        type: Object,
        required: true
    }
})
const {link} = toRefs(props)
</script>