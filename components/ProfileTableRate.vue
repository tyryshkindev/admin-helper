<template>
    <div class="text-white">
        <div class="flex items-center mb-2">
            <p class="text-xl font-bold">Статистика за месяц</p>
            <Icon name="i-heroicons-chart-bar" size="2em" class="ml-1 w-5 h-5 align-middle"/>
        </div>
        <table class="overflow-scroll w-1/2">
            <thead>
                <tr>
                    <th v-for="rateName in displayedRates" :key="rateName" class="pr-3 border">{{ rateName }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="day in filteredRateInfo" :key="day.id">
                    <td v-for="rateName in displayedRates" :key="rateName" class="pr-3 border">
                        {{ displayRate(day, rateName) }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script setup>
import { formatDate } from "@/utils/formatDate"
const props = defineProps({
    serverInfo: {
        type: [Object, null],
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
    minimumDailyRate.value = serverInfo.minimumDailyRate
    allowedRate.value = serverInfo.value.allowedRate

} 
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
</script>