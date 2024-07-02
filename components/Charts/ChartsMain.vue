<template>
    <div class="text-black">
        <ClientOnly>
            <VueApexCharts width="700" type="bar" :options="chartOptions" :series="chartSeries"/>
        </ClientOnly>
    </div>
</template>

<script setup>
import VueApexCharts from "vue3-apexcharts";
const props = defineProps({
    targetsInfo: {
        type: Array,
        default: () => []
    }
})
const {targetsInfo} = toRefs(props)

const adminsLeaderboard = computed(() =>
    targetsInfo.value
        .map(admin => countAdminRatio(admin.rate))
        .sort((a,b) => a - b))

const chartOptions = reactive({
    chartOptions: {
        chart: {
            type: 'bar',
            height: 1200
        },
    },
    plotOptions: {
        bar: {
            borderRadius: 4,
            borderRadiusApplication: 'end',
            horizontal: true,
        }
    },
    xaxis: {
        categories: []
    }
})
const chartSeries = reactive([{
    data: adminsLeaderboard
}])

function countAdminRatio(rate) {
    let resultRatio = 0
    for (day in rate) {
        resultRatio += day.pm
        resultRatio += (day.jail * 3)
        resultRatio += day.time
        resultRatio += (day.warn * 3)
        resultRatio += (day.ban * 3)
    }
    return resultRatio
}

</script>