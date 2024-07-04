<template>
    <div class="text-black">
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

const adminsList = computed(() => {
    return targetsInfo.value
        .map(admin => ({
            nickname: admin.nickname, // создание объекта типа nickname - ratio
            ratio: countAdminRatio(admin.rate, admin.adminLvl) // подсчёт коэфициента
        }))
        .sort((a,b) => b.ratio - a.ratio) // сортировка по коэффициенту
})

const adminsLeaderboard = computed(() => {
  return adminsList.value.reduce((acc, admin) => { 
    acc[admin.nickname] = admin.ratio
    return acc // присвоение значения никнейм - кэффициент
  }, {})
})

const sortedRatingsList = computed(() => {
    return Object.values(adminsLeaderboard.value).sort((a,b) => b.ratio - a.ratio) // сортировка рейтинга по убыванию
})

const sortedAdminsList = computed(() => {
    const acc = new Set() // используем Set чтобы иметь только уникальные значения ников (т.к. рейтинги могут быть одинаковыми)
    sortedRatingsList.value.forEach(number => {
        Object
            .keys(adminsLeaderboard.value)
            .filter(ratio => adminsLeaderboard.value[ratio] === number) // поиск ника в объекте по значению коэфициента
            .forEach(key => acc.add(key)) // добавление ника в Set (для подписи графика по никам)
    })
    return Array.from(acc) // преобразовуем Set в массив, т.к. библиотека работает с массивами
})


function countAdminRatio(rate, adminLvl) { // расчёт коэфициентов
    let result = 0
    const lvl = Number(adminLvl) // в БД уровни хранятся как строки, преобразуем в число
    if (lvl >= 3) {
        rate.forEach(day => { // коэффициенты для 3+ адм
            result += day.pm
            result += (day.jail * 3)
            result += day.time
            result += (day.warn * 3)
            result += (day.ban * 3)
        })
    } else if (lvl === 2) { // коэффициенты для 2 лвл адм
        rate.forEach(day => {
            result += day.pm
            result += (day.jail * 3)
            result += day.time
        })
    } else { // коэффициенты для хелперов
        rate.forEach(day => {
            result += (day.pm * 2)  
            result += (day.z * 3)
            result += (day.time * 1.5)
        })
    }
    return result
}

const chartOptions = reactive({
    chartOptions: {
        chart: {
            type: 'bar',
            height: 1200,
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
        categories: [...sortedAdminsList.value],
        title: {
            text: 'Коэффициент',
            align: 'middle',
            style: {
                color: '#e0dede'
            }
        },
        labels: {
            style: {
                colors: ['#acd6e3']
            }
        } 
        
    },
    yaxis: {
        labels: {
            style: {
                colors: ['#acd6e3'],
                fontSize: '14px'
            }
        }
    },
    title: {
        text: 'ТОП администрации за текущий месяц',
        align: 'middle',
        style: {
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#ffffff'
        }
    },
    dataLabels: {
        enabled: true,
        style: {
            color: '#ffffff'
        }
    }
})
const chartSeries = reactive([{
    name: 'Рейтинг администратора',
    data: [...sortedRatingsList.value]
}])
</script>