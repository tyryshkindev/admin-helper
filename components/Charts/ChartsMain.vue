<template>
    <div v-show="isContentLoaded" class="text-black">
        <ClientOnly>
            <VueApexCharts width="700" type="bar" :options="chartOptions" :series="chartSeries"/>
        </ClientOnly>
    </div>
</template>

<script setup>
import VueApexCharts from "vue3-apexcharts"
const props = defineProps({
    targetsInfo: {
        type: Array,
        default: () => []
    }
})
const {targetsInfo} = toRefs(props)

const isContentLoaded = computed(() => !!targetsInfo.value.length)

const adminsList = computed(() => {
    return targetsInfo.value
        .map(admin => ({
            nickname: admin.nickname,
            ratio: countAdminRatio(admin.rate, admin.adminLvl)
        }))
        .sort((a,b) => b.ratio - a.ratio)
})

const adminsLeaderboard = computed(() => {
  return adminsList.value.reduce((acc, admin) => {
    acc[admin.nickname] = admin.ratio
    return acc
  }, {})
})

console.log(adminsLeaderboard.value)

const sortedRatingsList = computed(() => {
    return Object.values(adminsLeaderboard.value).sort((a,b) => b.ratio - a.ratio)
})

// console.log(sortedRatingsList.value)

const sortedAdminsList = computed(() => {
    const acc = []
    sortedRatingsList.value.forEach(number => {
        const key = Object
            .keys(adminsLeaderboard.value)
            .find(ratio => adminsLeaderboard.value[ratio] === number)
        acc.push(key)
    })
    return acc
})

console.log(sortedAdminsList.value)

function countAdminRatio(rate, adminLvl) {
    let result = 0
    const lvl = Number(adminLvl)
    console.log(lvl) 
    if (lvl >= 3) {
        rate.forEach(day => {
            result += day.pm
            result += (day.jail * 3)
            result += day.time
            result += (day.warn * 3)
            result += (day.ban * 3)
        })
    } else if (lvl === 2) {
        rate.forEach(day => {
            result += day.pm
            result += (day.jail * 3)
            result += day.time
        })
    } else {
        rate.forEach(day => {
            result += (day.pm * 2)  
            result += (day.z * 3)
            result += day.time
        })
    }
    return result
}
 
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
        categories: sortedAdminsList.value
    }
})
const chartSeries = reactive([{
    data: sortedRatingsList.value
}])
</script>