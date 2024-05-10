<template>
    <input 
        type="checkbox" 
        :checked="isCheckboxActive"
        @change="toggleCheckbox"
    >
</template>

<script setup>
const props = defineProps({
    isCheckboxActive: {
        type: Boolean
    },
    assignedValue: {
        type: String
    }
})
const {isCheckboxActive, assignedValue} = toRefs(props)
watch(isCheckboxActive, newValue => console.log(newValue))
const emit = defineEmits({
    'checkboxToggle': null
})
function toggleCheckbox(event) {
    emit('checkboxToggle', {newValue: event.target.checked,  permissionName: assignedValue.value})
}
</script>