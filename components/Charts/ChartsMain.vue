<template>
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
