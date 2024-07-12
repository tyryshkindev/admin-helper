<template>
    <div>
        <p class="text-lg">{{ $t('managment__minimum-title') }}:</p>
        <ManagmentDailyRate 
            :role="'helper'"
            :minimumRate="minimumRate.helper"
            @changeMinimumAmount="changeRating"

        />
        <ManagmentDailyRate 
            :role="'admin'"
            :minimumRate="minimumRate.admin"
            @changeMinimumAmount="changeRating"
        />
    </div>
</template>

<script setup>

const props = defineProps({
    minimumRate: {
        type: Object,
        required: true
    }
})
const {minimumRate} = toRefs(props)
const emit = defineEmits({
    'changeRate': null
})
const modifiedRate = reactive({
    value: JSON.parse(JSON.stringify(minimumRate.value))
})
function changeRating(updatedInfo) {
    const {newValue, rateName, role} = updatedInfo
    modifiedRate.value[role][rateName] = newValue
    emit('changeRate', modifiedRate.value)
}
</script>