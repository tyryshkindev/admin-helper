<template>
    <div>
        <p class="text-lg">Разрешения на просмотр статистики:</p>
        <div v-for="(value, permissionName) in modifiedPermissions" :key="value + permissionName" class="flex">
            <label :for="permissionName">
                <p>{{ formatPunishmentType(permissionName) }}:</p>
            </label>
            <UICheckboxControl 
                :id="permissionName"
                class="ml-2"
                :isCheckboxActive="value" 
                :assignedValue="permissionName"
                @checkboxToggle="toggleCheckbox"
            />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    serverPermissions: {
        type: Object,
        required: true
    }
})
const {serverPermissions} = toRefs(props)
const emit = defineEmits({
    'changePermissions': null
})
const modifiedPermissions = reactive({...serverPermissions.value})

function formatPunishmentType(type) {
    const punishments = {
        'z': 'Закрытые запросы',
        'pm': 'Ответы на репорт',
        'mute': 'Блокировки чата',
        'jail': 'Деморганы',
        'warn': 'Предупреждения',
        'ban': 'Блокировки',
        'time': 'Отыгранное время'
    }
    return punishments[type]
}
function toggleCheckbox(updatedInfo) {
    const {newValue, permissionName} = updatedInfo
    modifiedPermissions[permissionName] = newValue
    emit('changePermissions', modifiedPermissions)
}
</script>