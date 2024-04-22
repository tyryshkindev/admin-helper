<template>
    <input 
        :type="props.type"
        class="mt-3 w-full border border-solid border-teal-700 py-3 px-4 rounded"
        @input="handleInput"
        :value="props.inputValue"
        :placeholder="props.placeholder"
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

const emit = defineEmits({
    'update:inputValue': null
})

function handleInput(event) {
    emit('update:inputValue', event.target.value);
}
</script>
