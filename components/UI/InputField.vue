<template>
    <input 
        class="mt-3 w-full border border-solid border-teal-700 py-3 px-4 rounded"
        type="text"
        :value="inputValue"
        :placeholder="placeholder"
        @input="handleInput"
    >
</template>

<script setup>
const props = defineProps({
    inputValue: {
        type: String,
        required: true
    },
    placeholder: {
        type: String,
        default: ''
    }
})
const {inputValue, placeholder} = toRefs(props)

const emit = defineEmits({
    'update:inputValue': null
})

function handleInput(event) {
    emit('update:inputValue', event.target.value);
}
</script>
