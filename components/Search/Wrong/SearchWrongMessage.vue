<template>
    <div class="container mx-auto p-4">
        <p class="text-red-500 font-bold text-xl pb-4">{{ $t('monitoring__search-wrong__msg-part1') }} {{ formattedRole }} {{ $t('monitoring__search-wrong__msg-part2') }}</p>
        <p class="text-white text-lg pb-4">{{ $t('monitoring__search-redirect__msg-part1') }} {{ remainingTime }} {{ $t('monitoring__search-redirect__msg-part2') }}</p>
        <SearchWrongReturnButton :redirectRoute="redirectRoute" />
    </div>
</template>
<script setup>
const {locale} = useI18n()
const props = defineProps({
    role: {
        type: String,
        default: ''
    }
})
const {role} = toRefs(props)
const remainingTime = ref(10)

const formattedRole = computed(() => {
    const ruRoles = {
        'player': 'игрок',
        'admin': 'админ'
    }
    const enRoles = {
        'player': 'player',
        'admin': 'admin'
    }
    return locale.value === 'ru' ? ruRoles[role.value] : enRoles[role.value]
})
const redirectRoute = computed(() => {
    const routes = {
        'admin': '/monitoring',
        'player': '/players'
    }
    return routes[role.value]
})

const redirect = setTimeout(() => navigateTo(`${redirectRoute.value}`), 10000)

onMounted(() => {
    countdown()
})
onBeforeUnmount(() => {
    clearTimeout(redirect)
})

function countdown() {
    setInterval(() => {
        remainingTime.value--
    }, 1000)
}

</script>