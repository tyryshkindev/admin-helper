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
                id="search__input"
                class="text-black flex-1 my-3 py-2"
                />
                <SearchButton @searchPlayer="searchPlayer" class="mx-2"/>
            </div>
        </div>            
    </div>
</template>

<script setup>
import { getPlayerInfo } from '@/utils/getPlayerInfo'
const searchedPlayer = ref('')
function setSearchedPlayer(newValue) {
    searchedPlayer.value = newValue
}
function searchPlayer() {
    const playerInfo = getPlayerInfo(searchedPlayer)
}
</script>