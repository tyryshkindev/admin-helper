<template>
    <input
        type="number"
        :value="inputValue"
        @input="handleInput"
        class="text-black max-w-16 rounded pl-1 mt-1 bg-slate-300"
        min="0"
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
    }
})
const {inputValue, assignedValue} = toRefs(props)
const emit = defineEmits({
    'inputChange': null
})
function handleInput(event) {
    Number(event.target.value)
    ? emit('inputChange', {newValue: Number(event.target.value), rateName: assignedValue.value})
    : null
}
</script>