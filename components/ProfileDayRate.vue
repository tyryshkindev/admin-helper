<template>
    <div class="text-white">
        <div class="inline-flex items-center">
            <p class="text-xl">Статистика за сегодня</p>
            <Icon name="i-heroicons-chart-bar" size="2em" class="ml-1 w-5 h-5align-middle"/>
        </div>
        <template v-if="(typeof rateInfo === 'object')">
            <template v-for="(rate, key) in rateInfo" :key="key">
                <p v-if="serverLimits[key] && key !== 'time'">{{ getLabel(key) }}: {{ rate }}</p>
            </template>
            <p v-if="serverLimits.time">Отыграно времени: {{ playedTime }}</p>
        </template>
    </div>
</template>

<script setup>
const props = defineProps({
    rateInfo: {
        type: Object,
        required: true,
    },
    serverLimits: {
        type: Object,
        required: true
    }
})
const {rateInfo, serverLimits} = toRefs(props)
const playedTime = computed(() => {
    const hours = parseInt(rateInfo.value.time / 60) 
    const minutes = rateInfo.value.time - (hours * 60)
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
    return `${hours}:${formattedMinutes}`
})
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

<style lang="scss" scoped>

</style>
