<template>
    <!-- <div>
        <ClientOnly>
            <VueApexCharts width="700" type="bar" :options="chartOptions" :series="chartSeries" class="text-black"/>
        </ClientOnly>
        <div class="flex justify-end start">
            <label for="rating-selector" class="p-1">Сортировать по:</label>
            <select id="rating-selector" v-model="ratingSelector" name="rating" class="text-black rounded-md">
                <option value="full">Общему рейтингу</option>
                <option value="pm">Ответам</option>
                <option value="jail">Деморганам</option>
                <option value="z">Запросам</option>
                <option value="ban">Блокировкам</option>
                <option value="warn">Предупреждениям</option>
            </select>
        </div>
    </div> -->
    <div>
        <ClientOnly>
            <ChartsByRate :targetsInfo="targetsInfo" :ratingSelector="ratingSelector" />
        </ClientOnly>
        <ChartsRatingSelector :ratingSelector="ratingSelector" @rateNameUpdate="updateRatingSelector" />
    </div>
</template>

<script setup>
const props = defineProps({
    targetsInfo: {
        type: Array,
        default: () => []
    } 
})
const { targetsInfo } = toRefs(props)
const ratingSelector = ref('full')

const updateRatingSelector = (value) => {
  ratingSelector.value = value;
}
</script>
