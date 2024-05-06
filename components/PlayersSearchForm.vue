<template>
    <div class="py-4 flex">
        <div class="px-8">
            <label for="search__input">
                <p>Введите ник-нейм чтобы найти игрока</p>
            </label>
            <div class="flex">
                <UIInputField 
                :inputValue="searchedPlayer" 
                @update:inputValue="setSearchedPlayer" 
                @keydown.enter="searchPlayer"
                :placeholder="'Введите ник игрока'"
                id="search__input"
                class="text-black flex-1 my-3 py-2"
                />
                <SearchButton :isDisabled="isButtonDisabled" @searchPlayer="searchPlayer" class="mx-2"/>
            </div>
        </div>            
    </div>
</template>

<script setup>
const searchedPlayer = ref('')
function setSearchedPlayer(newValue) {
    searchedPlayer.value = newValue
}
function searchPlayer () {
    const nick = searchedPlayer.value
    setSearchedPlayer('')
    return navigateTo(`/players/${nick}`)
}
const isButtonDisabled = computed(() => {
    return searchedPlayer.value.length <= 4
})

</script>