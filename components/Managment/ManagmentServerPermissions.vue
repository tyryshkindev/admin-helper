<template>
    <div>
        <p class="text-lg">{{ $t('managment__permissions-title') }}</p>
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
const {locale} = useI18n()
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
    const ruPunishments = {
        'z': 'Закрытые запросы',
        'pm': 'Ответы на репорт',
        'mute': 'Блокировки чата',
        'jail': 'Деморганы',
        'warn': 'Предупреждения',
        'ban': 'Блокировки',
        'time': 'Отыгранное время'
    }
    const enPunishments = {
        "z": "Closed requests",
        "pm": "Report answers",
        "mute": "Chat blocks",
        "jail": "Jails",
        "warn": "Warns",
        "ban": "Bans",
        "time": "Played time"
    }
    return locale.value === 'ru' ? ruPunishments[type] : enPunishments[type]
}
function toggleCheckbox(updatedInfo) {
    const {newValue, permissionName} = updatedInfo
    modifiedPermissions[permissionName] = newValue
    emit('changePermissions', modifiedPermissions)
}
</script>