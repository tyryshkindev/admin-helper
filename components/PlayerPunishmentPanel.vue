<template>
    <div class="pt-4">
        <p class="text-lg pb-2">Панель управления</p>
        <div class="flex justify-start">
            <template v-for="punishment in punishmentTypes" :key="punishment.id">
                <PlayerPunishmentButton 
                    :buttonText="punishment" 
                    class="mr-3" 
                    :class="{'!bg-red-300': isPunishmentActive(punishment)}"
                    @click="handlePunishmentChoice(punishment)" 
                />
            </template>
        </div>
        <PlayerPunishmentInput 
            v-if="isAllowedToEnterReason" 
            :punishmentType="punishmentType" 
            @update:punishmentReason="setPunishmentReason"
            @update:punishmentDuration="setPunishmentDuration"
        />
        <PunishPlayerButton 
            v-if="isAllowedToPunishPlayer" 
            @click="handleClickPunishment"
            class="mt-2"
        />
    </div>
</template>

<script setup>
import {punishmentTypes} from '@/constants/index'
import {punishPlayer} from '@/utils/punishPlayer'
const props = defineProps({
    playerID: {
        type: Number,
        required: true
    },
    playerNickname: {
        type: String,
        required: true
    }
})
const {playerID, playerNickname} = toRefs(props)
const punishmentType = ref('')
const punishmentReason = ref('')
const punishmentDuration = ref('')
const isAllowedToEnterReason = ref(false)
const isAllowedToPunishPlayer = ref(false)
function getPunishmentType(type) {
    return Object.keys(punishmentTypes).find(key => punishmentTypes[key] === type)
    
}
function isPunishmentActive(type) {
    console.log(punishmentType.value === getPunishmentType(type))
    return punishmentType.value === getPunishmentType(type)
}
function handlePunishmentChoice(type) {
    // punishmentType.value = punishmentType.value === getPunishmentType(type) ? '' : getPunishmentType(type)
    if (punishmentType.value === getPunishmentType(type)) {
        punishmentType.value = ''
        isAllowedToEnterReason.value = false
    } else {
        punishmentType.value = getPunishmentType(type)
        isAllowedToEnterReason.value = true
    }
    setPunishmentReason('')
    setPunishmentDuration('')
    isAllowedToPunishPlayer.value = false
}
function setPunishmentReason(newValue) {
    punishmentReason.value = newValue
    if (punishmentType.value === 'warn' && newValue.length >= 3) {
        isAllowedToPunishPlayer.value = true
    }
    if (newValue.length < 3) {
        isAllowedToPunishPlayer.value = false
    }
}
function setPunishmentDuration(newValue) {
    punishmentDuration.value = newValue
    isAllowedToPunishPlayer.value = !!newValue
}
function handleClickPunishment() {
    punishPlayer({ID: playerID.value, nickname: playerNickname.value}, {
    "type": "rmute",
    "time": "1714976802014",
    "adminNick": "Valeriy_Tyryshkin",
    "duration": "360",
    "reason": "Оскорбление администрации"
    })
}
</script>

  