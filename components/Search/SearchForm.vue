<template>
    <div class="flex">
        <div>
            <label for="search__input">
                <p>{{ $t('monitoring__search-form__title') }} {{ formattedRole }}</p>
            </label>
            <div class="flex">
                <UIInputField 
                    id="search__input"
                    class="text-black flex-1 my-3 py-2"
                    :inputValue="searchedTarget" 
                    :placeholder="`${inputPlaceholder} ${formattedRole}`"
                    @update:inputValue="setSearchedTarget" 
                    @keydown.enter="searchTarget"
                />
                <SearchFormSubmitButton :isActive="isTargetReachable"  class="mx-2" @click="searchTarget" />
            </div>
        </div>            
    </div>
</template>

<script setup>
const {locale} = useI18n()
const props = defineProps({
    role: {
        type: String,
        required: true
    }
})
const {role} = toRefs(props)
const searchedTarget = ref('')
const emit = defineEmits({
    'targetSearch': null
})

const inputPlaceholder = computed(() => locale.value === 'ru' ? 'Введите ник' : 'Enter nick of')
const isTargetReachable = computed(() => searchedTarget.value.length >= 4)
const formattedRole = computed(() => {
    const ruRoles = {
        'player': 'игрока',
        'admin': 'админа'
    }
    const enRoles = {
        'player': 'a player',
        'admin': 'an admin'
    }
    return locale.value === 'ru' ? ruRoles[role.value] : enRoles[role.value]
})
const formattedRoute = computed(() => {
    const routes = {
        'player': 'players',
        'admin': 'monitoring'
    }
    return routes[role.value]
})

function setSearchedTarget(newValue) {
    searchedTarget.value = newValue
}
function searchTarget() {
    if (isTargetReachable.value) {
        const nick = searchedTarget.value
        setSearchedTarget('')
        emit('targetSearch', nick)
        return navigateTo(`/${formattedRoute.value}/${nick}`)
    }
}
</script>