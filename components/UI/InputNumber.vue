<template>
    <input
        type="number"
        class="text-black max-w-16 rounded pl-1 mt-1 bg-slate-300"
        min="0"
        :value="inputValue"
        :placeholder="placeholder"
        @input="handleInput"
    >
</template>

<script setup>
const props = defineProps({
    inputValue: {
        type: Number,
        required: true
    }, 
    assignedValue: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: ''
    }
})
const {inputValue, assignedValue, placeholder} = toRefs(props)
const emit = defineEmits({
    'inputChange': null
})
function handleInput(event) {
    const newInputValue = Number(event.target.value)
    newInputValue || newInputValue === 0
    ? emit('inputChange', {newValue: newInputValue, rateName: assignedValue.value})
    : null
}
</script>