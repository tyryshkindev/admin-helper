<template>
    <VueApexCharts width="700" type="bar" :options="chartOptions" :series="chartSeries" class="text-black" />
</template>

<script setup>
import VueApexCharts from 'vue3-apexcharts';

const {locale} = useI18n()
const props = defineProps({
    ratingSelector: {
        type: String,
        default: 'full'
    },
    targetsInfo: {
        type: Array,
        default: () => []
    }
})
const {ratingSelector, targetsInfo} = toRefs(props)

const calculateRatio = (rate, adminLvl) => { // расчёт коэфициентов
    let result = 0
    const lvl = Number(adminLvl) // в БД уровни хранятся как строки, преобразуем в число
    rate.forEach(day => {
        if (ratingSelector.value === 'full') { // если выбран общий рейтинг
            if (lvl >= 3) { // коэффициенты для 3+ адм
                result += day.pm
                result += (day.jail * 3)
                result += day.time
                result += (day.warn * 3)
                result += (day.ban * 3)
            } else if (lvl === 2) { // коэффициенты для 2 лвл адм
                result += day.pm
                result += (day.jail * 3)
                result += day.time
            } else { // коэффициенты для хелперов
                result += (day.pm * 2)
                result += (day.z * 3)
                result += (day.time * 1.5)
            }
        } else {
            result += day[ratingSelector.value] || 0 // суммируем все значения если выбран конкретный пункт сортировки
        }
    })
    return result
}

const adminsList = computed(() => {
    return targetsInfo.value
        .map(admin => ({
            nickname: admin.nickname, // создание объекта типа nickname - ratio
            ratio: calculateRatio(admin.rate, admin.adminLvl) // подсчёт коэфициента
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

const chartOptions = reactive({
    chartOptions: {
        chart: {
            type: 'bar',
            height: 1200,
        },
    },
    responsive: [
        {
            breakpoint: 640,
            options: {
                chart: {
                    height: 560,
                    width: 390,
                }
            }
        },
        {
            breakpoint: 1024,
            options: {
                chart: {
                    height: 780,
                    width: 720,
                }
            }
        }
    ],
    plotOptions: {
        bar: {
            borderRadius: 4,
            borderRadiusApplication: 'end',
            horizontal: true,
        }
    },
    xaxis: {
        categories: [],
        title: {
            text: locale.value === 'ru' ? 'Коэффициент' : 'Ratio',
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
        text: locale.value === 'ru' ? 'ТОП администрации за текущий месяц' : 'Admins TOP for current month',
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
    name: locale.value === 'ru' ? 'Рейтинг администратора' : 'Admins rating',
    data: []
}])

const updateChart = () => {
  chartOptions.xaxis.title.text = locale.value === 'ru' ? 'Коэффициент' : 'Ratio';
  chartOptions.title.text = locale.value === 'ru' ? 'ТОП администрации за текущий месяц' : 'Admins TOP for current month'
  chartSeries[0].name = locale.value === 'ru' ? 'Рейтинг администратора' : 'Admins rating'
  chartOptions.xaxis.categories = [...sortedAdminsList.value]
  chartSeries[0].data = [...sortedRatingsList.value]
};

watch([locale, ratingSelector, adminsList], updateChart) // в случае смены языка, переключателя рейтинга или списка админов выполняем пересчёт

onMounted(() => {
    updateChart() // инициализация с начальными значениями
})

</script>
<style scoped>
.apexcharts-toolbar, .apexcharts-tooltip, .apexcharts-xaxistooltip, .apexcharts-yaxistooltip{
    z-index: 0 !important;
}
</style>