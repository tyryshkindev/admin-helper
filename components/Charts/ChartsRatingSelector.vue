<template>
    <div class="flex justify-end start">
        <label for="rating-selector" class="p-1">{{ $t('charts__sort-title') }}:</label>
        <select id="rating-selector" v-model="rateName" name="rating" class="text-black rounded-md" @change="emitUpdate">
            <template v-for="(rateValue, rateKey) in rateOptions" :key="rateKey.id">
                <option :value="rateKey">{{ rateValue }}</option>
            </template>    
        </select>
    </div>
</template>

<script setup>
const {locale} = useI18n()
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
    const ruOptions = {
        full: 'Общему рейтингу',
        pm: 'Ответам',
        jail: 'Деморганам',
        z: 'Запросам',
        ban: 'Блокировкам',
        warn: 'Предупреждениям'
    }
    const enOptions = {
        full: 'Full rate',
        pm: 'Answers',
        jail: 'Jails',
        z: 'Requests',
        ban: 'Bans',
        warn: 'Warns'
    }
    return locale.value === 'ru' ? ruOptions : enOptions
})

const emitUpdate = () => {
    emit('rateNameUpdate', rateName.value)
}

watch(ratingSelector, (newValue) => {
    rateName.value = newValue
})
</script>