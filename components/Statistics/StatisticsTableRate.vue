<template>
    <div class="text-white max-h-96 overflow-auto xl:overflow-hidden hover:overflow-auto">
        <div class="flex items-center mb-2">
            <p class="text-xl font-bold">Статистика за месяц</p>
            <Icon name="i-heroicons-chart-bar" size="2em" class="ml-1 w-5 h-5 align-middle"/>
        </div>
        <table v-if="isRateAvailable">
            <thead>
                <tr>
                    <th 
                    v-for="rateName in displayedRates" 
                    :key="rateName" 
                    class="pr-3 border"
                    >
                    {{ rateName }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="day in filteredRateInfo" :key="day.id">
                    <td 
                    v-for="rateName in displayedRates" 
                    :key="rateName" 
                    class="pr-3 border" 
                    :class="paintBackgroundFromRateValue(day)"
                    >
                    {{ displayRate(day, rateName) }}
                    </td>
                </tr>
            </tbody>
        </table>
        <AppErrorMessage v-else :message="'Не удалось получить данные о норме'" />
    </div>
</template>


<script setup>
const props = defineProps({
    serverInfo: {
        type: Object,
        required: true
    },
    rateInfo: {
        type: Array,
        required: true
    },
})
const {serverInfo, rateInfo} = toRefs(props)
const minimumDailyRate = reactive({})
const allowedRate = reactive({})
if (serverInfo.value) {
    minimumDailyRate.value = serverInfo.value.minimumDailyRate
    allowedRate.value = serverInfo.value.allowedRate
} 
const isRateAvailable = computed(() => {
    return !!(minimumDailyRate.value && allowedRate.value && rateInfo.value)
})
// показать все значения, которые разрешены для отображения
const displayedRates = computed(() => {
    return Object.keys(allowedRate.value).filter(rateName => allowedRate.value[rateName])
})
// проверить разрешено ли отображать нужное значение
const filteredRateInfo = computed(() => {
    return rateInfo.value.map(day => {
        const filteredDay = {}
        displayedRates.value.forEach(rateName => {
            filteredDay[rateName] = day[rateName]
        })
        return filteredDay
    })
})
// если время - отформатировать
function displayRate(day, rateName){
    return rateName !== 'time' ? day[rateName] : formatDate(day[rateName])
}
// если все необходимые значение из объекта day больше или равно minimumDailyRate - применять зеленый бекграунд
function paintBackgroundFromRateValue(day) {
    const relevantRates = Object.keys(day).filter(rateName => minimumDailyRate.value.hasOwnProperty(rateName))
    return relevantRates.every(rateName => day[rateName] >= minimumDailyRate.value[rateName]) ? 'bg-green-400' : 'bg-red-300'
}
</script>