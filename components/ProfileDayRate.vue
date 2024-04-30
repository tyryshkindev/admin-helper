<template>
    <div class="text-white">
        <div class="flex items-center">
            <p class="text-xl font-bold">Статистика за сегодня</p>
            <Icon name="i-heroicons-chart-bar" size="2em" class="ml-1 w-5 h-5align-middle"/>
        </div>
        <template v-if="(typeof rateInfo === 'object' && typeof serverLimits.value === 'object')">
            <template v-for="(rate, key) in rateInfo" :key="key">
                <p v-if="serverLimits.value[key] && key !== 'time'">{{ getLabel(key) }}: {{ rate }}</p>
            </template>
            <p v-if="serverLimits.value.time">Отыграно времени: {{ formatDate(rateInfo.time) }}</p>
        </template>
        <ErrorMessage v-else :message="'Не удалось получить информацию о норме'"/>
    </div>
</template>

<script setup>
import {formatDate} from '@/utils/formatDate'
const props = defineProps({
    rateInfo: {
        type: Object,
        required: true,
    },
    serverInfo: {
        type: [Object, null],
        required: true
    }
})
const {rateInfo, serverInfo} = toRefs(props)
const serverLimits = reactive({})
if (serverInfo.value) {
    serverLimits.value = serverInfo.value.allowedRate
}
const getLabel = (key) => {
  const labels = {
    pm: 'Ответов по репорту',
    z: 'Закрытых запросов',
    jail: 'Деморганов',
    mute: 'Мутов',
    warn: 'Варнов',
    ban: 'Блокировок',
  }
    return labels[key]
    
}
</script>