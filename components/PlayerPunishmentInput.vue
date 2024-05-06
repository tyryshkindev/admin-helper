<template>
    <div class="text-black">
        <UIInputField 
            :placeholder="'Введите причину наказания'" 
            :inputValue="punishmentReason.value || ''"
            @update:inputValue="setPunishmentReason"
            class="max-w-[30%]"
        />
        <br>
        <UIInputField 
            v-if="punishmentReason.length >= 3 && punishmentType !== 'warn'"
            :inputValue="punishmentDuration.value || ''"
            :placeholder="'Введите длительность наказания'"
            @update:inputValue="setPunishmentDuration"
            class="max-w-[30%]"
        />
    </div>
</template>

<script setup>
const props = defineProps({
    punishmentType: {
        type: String
    }
})
const {punishmentType} = toRefs(props)
const emit = defineEmits({
    'update:punishmentReason': null,
    'update:punishmentDuration': null
})
const punishmentReason = ref('')
const punishmentDuration = ref('')
function setPunishmentReason(newValue) {
    punishmentReason.value = newValue
    emit('update:punishmentReason', newValue)
}
function setPunishmentDuration(newValue) {
    punishmentDuration.value = newValue
    emit('update:punishmentDuration', newValue)
}
</script>