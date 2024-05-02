<template>
    <input 
        :type="type"
        class="mt-3 w-full border border-solid border-teal-700 py-3 px-4 rounded"
        @input="handleInput"
        :value="inputValue"
        :placeholder="placeholder"
    >
</template>

<script setup>
const props = defineProps({
    inputValue: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'text'
    },
    placeholder: {
        type: String,
        default: ''
    }
})
const {inputValue, type, placeholder} = toRefs(props)

const emit = defineEmits({
    'update:inputValue': null
})

function handleInput(event) {
    emit('update:inputValue', event.target.value);
}
</script>
