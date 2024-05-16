<template>
    <div>
        <p>Минимальный рейтинг для {{ formattedRole }}а</p>
        <div v-for="(amount, rateName) in minimumRate" :key="amount + rateName" class="flex">
            <p class="pr-2">{{ rateName }}: </p>
            <UIInputNumber 
                :inputValue="amount"
                :assignedValue="rateName"
                @inputChange="setNewAmount"
            />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    role: {
        type: String,
        default: 'admin'
    },
    minimumRate: {
        type: Object,
        default: () => {}
    }
})
const {role, minimumRate} = toRefs(props)
const emit = defineEmits({
    'changeMinimumAmount': null
})
const formattedRole = computed(() => {
    const roles = {
        'helper': 'Помощник',
        'admin': 'Администратор'
    }
    return roles[role.value]
})
function setNewAmount(newInfo) {
    emit('changeMinimumAmount', {...newInfo, role: role.value})    
}
</script>