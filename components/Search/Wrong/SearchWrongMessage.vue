<template>
    <div class="container mx-auto p-4">
        <p class="text-red-500 font-bold text-xl pb-4">Запрашиваемый {{ formattedRole }} не зарегистрирован на сервере</p>
        <p class="text-white text-lg pb-4">Вы будете автоматически перенаправлены на страницу поиска через {{ remainingTime }} секунд</p>
        <SearchWrongReturnButton :redirectRoute="redirectRoute" />
    </div>
</template>
<script setup>
const props = defineProps({
    role: {
        type: String,
        default: ''
    }
})
const {role} = toRefs(props)
const remainingTime = ref(10)
const formattedRole = computed(() => {
    const roles = {
        'admin': 'администратор',
        'player': 'игрок'
    }
    return roles[role.value]
})
const redirectRoute = computed(() => {
    const routes = {
        'admin': '/monitoring',
        'player': '/players'
    }
    return routes[role.value]
})
function countdown() {
    setInterval(() => {
        remainingTime.value--
    }, 1000)
}
const redirect = setTimeout(() => navigateTo(`${redirectRoute.value}`), 10000)
onMounted(() => {
    countdown()
})
onBeforeUnmount(() => {
    clearTimeout(redirect)
})
</script>