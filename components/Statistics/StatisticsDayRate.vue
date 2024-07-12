<template>
    <div class="text-white">
        <div class="flex items-center">
            <p class="text-xl font-bold">{{ $t('statistics__day-title') }}</p>
            <Icon name="i-heroicons-chart-bar" size="2em" class="ml-1 w-5 h-5 align-middle"/>
        </div>
        <template v-if="isInfoAvailable">
            <template v-for="(rate, key) in rateInfo" :key="key">
                <div v-if="isRateAllowedToDisplay(key) && key !== 'time'" class="flex">
                    <p class="pr-2">{{ getLabel(key) }}: {{ rate }}</p>
                    <Icon v-if="isRateCompleted(key)" name="i-heroicons-check-20-solid" />
                </div>
            </template>
            <div v-if="isRateAllowedToDisplay('time')" class="flex">
                <p class="pr-2">{{ $t('statistics__day-time') }} : {{ formattedTime }}</p>
                <Icon v-if="isRateCompleted('time')" name="i-heroicons-check-20-solid" />
            </div>
        </template>
        <AppErrorMessage v-else :message="'No rate data available'"/>
    </div>
</template>

<script setup>
const {locale} = useI18n()
const props = defineProps({
    rateInfo: {
        type: Object,
        required: true,
        default: () => {}
    },
    serverInfo: {
        type: Object,
        required: true,
        default: () => {}
    }
})
const {rateInfo, serverInfo} = toRefs(props)

const minimumDailyRate = computed(() => {
    return Object.keys(serverInfo.value).length
    ? serverInfo.value.minimumDailyRate
    : {}
})
const serverLimits = computed(() => {
    return Object.keys(serverInfo.value).length
    ? serverInfo.value.allowedRate
    : {}
})
const isInfoAvailable = computed(() => {
    return !!Object.keys(rateInfo.value).length && !!Object.keys(serverLimits.value).length 
})
const formattedTime = computed(() => formatDate(rateInfo.value.time))

function getLabel (key) {
  const ruLabels = {
    pm: 'Ответов по репорту',
    z: 'Закрытых запросов',
    jail: 'Деморганов',
    mute: 'Мутов',
    warn: 'Варнов',
    ban: 'Блокировок',
  }
  const enLabels = {
    pm: 'Report answers',
    z: 'Closed requests',
    jail: 'Jails',
    mute: 'Mutes',
    warn: 'Warns',
    ban: 'Bans',
  }
    return locale.value === 'ru' ? ruLabels[key] : enLabels[key]  
}
function isRateAllowedToDisplay(key) {
    return serverLimits.value && serverLimits.value[key]
}
function isMinimumValueSpecified(rateName) {
    return !!minimumDailyRate.value[rateName]
}
function isRateCompleted(rateName) {
    return isMinimumValueSpecified(rateName) ? rateInfo.value[rateName] >= minimumDailyRate.value[rateName] : false
}
</script>