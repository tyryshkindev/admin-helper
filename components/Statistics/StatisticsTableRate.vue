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
        <AppErrorMessage v-else :message="'Данные о норме отсутствуют'" />
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
// console.log(serverInfo.value, rateInfo.value)
const minimumDailyRate = reactive({})
const allowedRate = reactive({})
watch(serverInfo, newValue => {
    console.log('info come!')
    Object.assign(minimumDailyRate, newValue.minimumDailyRate)
    Object.assign(allowedRate, newValue.allowedRate)
}, {deep: true})

const isRateAvailable = computed(() => {
    const ratesToCheck = [minimumDailyRate, allowedRate]
    return ratesToCheck.every(obj => !!Object.keys(obj).length) && !!rateInfo.value.length
})
// показать все значения, которые разрешены для отображения
const displayedRates = computed(() => {
    return Object.keys(allowedRate).filter(rateName => allowedRate[rateName])
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
    return rateName === 'time' ? formatDate(day[rateName]) : day[rateName]
}
// если все необходимые значение из объекта day больше или равно minimumDailyRate - применять зеленый бекграунд
function paintBackgroundFromRateValue(day) {
    const relevantRates = Object.keys(day).filter(rateName => Object.hasOwn(minimumDailyRate, rateName))
    return relevantRates.every(rateName => day[rateName] >= minimumDailyRate[rateName]) ? 'bg-green-400' : 'bg-red-300'
}
</script>