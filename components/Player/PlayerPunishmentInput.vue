<template>
    <div class="text-black">
        <UIInputField 
            :placeholder="'Введите причину наказания'" 
            :inputValue="punishmentReason.value || ''"
            @update:inputValue="setPunishmentReason"
            class="max-w-[30%]"
            @keydown.enter="handleReasonEnter"
        />
        <br>
        <UIInputField 
            v-if="punishmentReason.length >= 3 && punishmentType !== 'warn'"
            :inputValue="punishmentDuration.value || ''"
            :placeholder="'Введите длительность наказания'"
            @update:inputValue="setPunishmentDuration"
            id="duration__input"
            class="max-w-[30%]"
            @keydown.enter="handleDurationEnter"
        />
        <ErrorMessage v-show="isPunishmentDurationWrong" :message="'Неверная длительность наказания. Поддерживаются только цифры'" />
    </div>
</template>

<script setup>
const props = defineProps({
    punishmentType: {
        type: String
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
const punishmentDuration = ref('')
const isPunishmentDurationWrong = ref(false)
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
function toggleWrongDuration(newValue) {
    isPunishmentDurationWrong.value = newValue
    emit('update:wrongDuration', newValue)
}
function setPunishmentDuration(newValue) {
    newValue ? punishmentDuration.value = Number(newValue) : toggleWrongDuration(false)
    if (punishmentDuration.value) {
        emit('update:punishmentDuration', punishmentDuration.value)
        toggleWrongDuration(false)
    } else if (newValue !== ''){
        toggleWrongDuration(true)
    } else {
        toggleWrongDuration(false)
    }

}
</script>