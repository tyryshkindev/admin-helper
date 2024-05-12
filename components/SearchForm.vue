<template>
    <div class="py-4 flex">
        <div class="px-8">
            <label for="search__input">
                <p>Введите ник-нейм чтобы найти {{ formattedRole }}</p>
            </label>
            <div class="flex">
                <UIInputField 
                :inputValue="searchedTarget" 
                @update:inputValue="setSearchedTarget" 
                @keydown.enter="searchTarget"
                :placeholder="`Введите ник ${formattedRole}`"
                id="search__input"
                class="text-black flex-1 my-3 py-2"
                />
                <SearchFormSubmitButton :isActive="isTargetReachable" @click="searchTarget" class="mx-2" />
            </div>
        </div>            
    </div>
</template>

<script setup>
const props = defineProps({
    role: {
        type: String,
        required: true
    }
})
const {role} = toRefs(props)
const formattedRole = computed(() => {
    const roles = {
        'player': 'игрока',
        'admin': 'админа'
    }
    return roles[role.value]
})
const formattedRoute = computed(() => {
    const routes = {
        'player': 'players',
        'admin': 'monitoting'
    }
    return routes[role.value]
})
const searchedTarget = ref('')
function setSearchedTarget(newValue) {
    searchedTarget.value = newValue
}
function searchTarget () {
    if (isTargetReachable.value) {
        const nick = searchedTarget.value
        setSearchedTarget('')
        return navigateTo(`/${formattedRoute.value}/${nick}`)
    }
}
const isTargetReachable = computed(() => {
    return searchedTarget.value.length >= 4
})
</script>