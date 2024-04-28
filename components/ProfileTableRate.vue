<template>
    <div class="text-white">
        <div class="flex items-center">
            <p class="text-xl font-bold">Статистика за месяц</p>
            <Icon name="i-heroicons-chart-bar" size="2em" class="ml-1 w-5 h-5 align-middle"/>
        </div>
        <table class="overflow-scroll">
            <tbody>
                <tr>
                    <template v-for="(isRateAllowedToDisplay, rateName) in allowedRate" :key="rateName">
                        <th v-if="isRateAllowedToDisplay" class="pr-3">{{ rateName }}</th>
                    </template>
                </tr>
                <tr v-for="day in rateInfo" :key="day.id">
                    <td v-for="(isRateAllowedToDisplay, rateName) in allowedRate" :key="rateName" class="p3-2">
                        <template v-if="isRateAllowedToDisplay">
                        {{ day[rateName] }}
                        </template>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script setup>
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
const serverInfo = toRefs(props)
let minimumDailyRate
let allowedRate
if (typeof serverInfo === 'object') {
    minimumDailyRate = serverInfo.minimumDailyRate
    allowedRate = serverInfo.allowedRate
} 
</script>