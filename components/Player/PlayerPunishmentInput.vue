<template>
    <div class="text-black">
        <UIInputField 
            :placeholder="reasonPlaceholder" 
            :inputValue="punishmentReason || ''"
            class="md:max-w-[30%]"
            @update:inputValue="setPunishmentReason"
            @keydown.enter="handleReasonEnter"
        />
        <br>
        <UIInputNumber 
            v-if="punishmentReason.length >= 3 && punishmentType !== 'warn'"
            id="duration__input"
            :inputValue="punishmentDuration"
            :placeholder="durationPlaceholder"
            class="!max-w-96 !bg-white p-2"
            @inputChange="setPunishmentDuration"
            @keydown.enter="handleDurationEnter"
        />
    </div>
</template>

<script setup>
const {locale} = useI18n()
const props = defineProps({
    punishmentType: {
        type: String,
        default: ''
    },
    parentReason: {
        type: String,
        required: true
    },
    parentDuration: {
        type: Number,
        required: true
    }
})
const {punishmentType, parentReason, parentDuration} = toRefs(props)
const emit = defineEmits({
    'update:punishmentReason': null,
    'update:punishmentDuration': null,
    'update:wrongDuration': null,
    'punishPlayer': null
})
const punishmentReason = ref('')
const punishmentDuration = ref(0)

const reasonPlaceholder = computed(() => {
    return locale.value === 'ru' ? 'Введите причину наказания' : 'Enter punishment reason'
})

const durationPlaceholder = computed(() => {
    return locale.value === 'ru' ? 'Введите длительность наказания' : 'Enter punishment duration'
})

watch(parentReason, newValue => {
    punishmentReason.value = newValue
})
watch(parentDuration, newValue => {
    punishmentDuration.value = newValue
})

function handlePlayerPunishment() {
    emit('punishPlayer')
}
function handleReasonEnter() {
    if (punishmentType.value !== 'warn') {
        const durationInput = document.getElementById('duration__input')
        if (durationInput) {
            durationInput.focus()
        }
    } else if (punishmentReason.value?.length >= 3) {
        handlePlayerPunishment()
    }
}
function handleDurationEnter() {
    if (punishmentDuration.value) {
        handlePlayerPunishment()
    }
}
function setPunishmentReason(newValue) {
    punishmentReason.value = newValue
    emit('update:punishmentReason', newValue)
}
function setPunishmentDuration(newInfo) {
    const {newValue} = newInfo
    punishmentDuration.value = newValue
    emit('update:punishmentDuration', punishmentDuration.value)
}
</script>