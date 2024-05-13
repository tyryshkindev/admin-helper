<template>
    <div class="container mx-auto py-4">
        <p class="text-red-500 font-bold text-xl pb-4">Запрашиваемый {{ formattedRole }} не зарегистрирован на сервере</p>
        <p class="text-white text-lg pb-4">Вы будете автоматически перенаправлены на страницу поиска через {{ remainingTime }} секунд</p>
        <button class="bg-green-500 rounded-lg hover:bg-green-300">
            <NuxtLink to="/players"><p class="text-black text-lg p-2">Вернутся на страницу поиска</p></NuxtLink>
        </button>
    </div>
</template>
<script setup>
const props = defineProps({
    role: {
        type: String
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