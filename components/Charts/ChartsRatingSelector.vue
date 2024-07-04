<template>
    <div class="flex justify-end start">
        <label for="rating-selector" class="p-1">Сортировать по:</label>
        <select id="rating-selector" v-model="rateName" name="rating" class="text-black rounded-md" @change="emitUpdate">
            <template v-for="(rateValue, rateKey) in rateOptions" :key="rateKey.id">
                <option :value="rateKey">{{ rateValue }}</option>
            </template>    
        </select>
    </div>
</template>

<script setup>
const props = defineProps({
    ratingSelector: {
        type: String,
        default: ''
    }
})
const { ratingSelector } = toRefs(props)

const emit = defineEmits({
    rateNameUpdate: null
})
const rateName = ref('full')
const rateOptions = computed(() => {
    return {
        full: 'Общему рейтингу',
        pm: 'Ответам',
        jail: 'Деморганам',
        z: 'Запросам',
        ban: 'Блокировкам',
        warn: 'Предупреждениям'
    }
})

const emitUpdate = () => {
    emit('rateNameUpdate', rateName.value)
}

watch(ratingSelector, (newValue) => {
    rateName.value = newValue
})
</script>