<template>
    <button type="button" @click="redirectUser">
        <div class="bg-green-500 hover:bg-green-600 p-2 rounded-lg">
            {{ targetNickname }}
        </div>
    </button>
</template>

<script setup>
const props = defineProps({
    targetNickname: {
        type: String,
        default: ''
    },
    requesterRole: {
        type: String,
        default: ''
    }
})
const {targetNickname, requesterRole} = toRefs(props)
const formattedRole = computed(() => {
    const roles = {
        'admin': 'monitoring',
        'player': 'players'
    }
    return roles[requesterRole.value]
})
function redirectUser() {
    return navigateTo(`/${formattedRole.value}/${targetNickname.value}`)
}
</script>