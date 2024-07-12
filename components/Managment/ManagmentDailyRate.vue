<template>
    <div>
        <p>{{ $t('managment__minimum-daily__title') }} {{ formattedRole }}</p>
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
const {locale} = useI18n()
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
    const ruRoles = {
        'helper': 'Помощника',
        'admin': 'Администратора'
    }
    const enRoles = {
        'helper': 'Helper',
        'admin': 'Admin'
    }
    return locale.value === 'ru' ? ruRoles[role.value] : enRoles[role.value]
})
function setNewAmount(newInfo) {
    emit('changeMinimumAmount', {...newInfo, role: role.value})    
}
</script>