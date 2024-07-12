<template>
    <div class="pt-2">
        <p class="text-lg pb-2">{{ $t('player__punishment__panel-title') }}</p>
        <div class="grid grid-cols-3 gap-2 lg:flex lg:justify-start">
            <template v-for="punishment in formattedTypes" :key="punishment.id">
                <PlayerPunishmentButton 
                    :buttonText="punishment" 
                    class="mr-3 truncate" 
                    :class="{'!bg-red-300': isPunishmentActive(punishment)}"
                    @click="handlePunishmentChoice(punishment)" 
                />
            </template>
        </div>
        <PlayerPunishmentInput 
            v-if="isAllowedToEnterReason" 
            :punishmentType="punishmentType" 
            :parentReason="punishmentReason"
            :parentDuration="punishmentDuration"
            @update:punishmentReason="setPunishmentReason"
            @update:punishmentDuration="setPunishmentDuration"
            @punishPlayer="handlePunishPlayer"
        />
        <PlayerPunishButton 
            v-if="isAllowedToPunishPlayer" 
            class="mt-2"
            @click="handlePunishPlayer"
        />
        <ModalWindow :isOpened="isPunishmentFailed" @closeModal="isPunishmentFailed = false">
            <template #header>
                <p class="text-lg font-bold">{{ $t('player__punishment__panel-modal-title') }}</p>
            </template>
            <template #body>
                <p>{{ $t('player__punishment__panel-modal-body') }}</p>
            </template>
        </ModalWindow>
    </div>
</template>

<script setup>
import {ruPunishmentTypes, enPunishmentTypes} from '@/constants/index'
const {locale} = useI18n()
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
const emit = defineEmits({
    'alistUpdated': null
})
const mainStore = useMainAdminStore()
const punishmentType = ref('')
const punishmentReason = ref('')
const punishmentDuration = ref(0)
const isAllowedToEnterReason = ref(false)
const isAllowedToPunishPlayer = ref(false)
const isPunishmentFailed = ref(false)

const formattedTypes = computed(() => {
    const ru2lvlTypes = {
        'rmute': 'Блокировка репорта',
        'mute': 'Блокировка чата',
        'fmute': 'Полная блокировка чатов'
    }
    const en2lvlTypes = {
        'rmute': 'Block report',
        'mute': 'Block chat',
        'fmute': 'Block all chats'
    }
    const allowedTyperFor2Lvl = locale.value === 'ru' ? ru2lvlTypes : en2lvlTypes
    const punishmentTypes = locale.value === 'ru' ? ruPunishmentTypes : enPunishmentTypes
    return mainStore.user.adminLvl === '2'
    ? allowedTyperFor2Lvl
    : punishmentTypes
})

function getPunishmentType(type) {
    const punishmentTypes = locale.value === 'ru' ? ruPunishmentTypes : enPunishmentTypes
    return Object.keys(punishmentTypes).find(key => punishmentTypes[key] === type)
}
function isPunishmentActive(type) {
    return punishmentType.value === getPunishmentType(type)
}
function handlePunishmentChoice(type) {
    if (punishmentType.value === getPunishmentType(type)) {
        punishmentType.value = ''
        togglePermisionToEnterReason(false)
    } else {
        punishmentType.value = getPunishmentType(type)
        togglePermisionToEnterReason(true)
    }
    setPunishmentReason('')
    setPunishmentDuration(0)
    togglePermisionToPunishPlayer(false)
}
function togglePermisionToPunishPlayer(newValue) {
    isAllowedToPunishPlayer.value = newValue
}
function togglePermisionToEnterReason(newValue) {
    isAllowedToEnterReason.value = newValue
}
function setPunishmentReason(newValue) {
    punishmentReason.value = newValue.trim()
    if (punishmentType.value === 'warn' && newValue.length >= 3) {
        togglePermisionToPunishPlayer(true)
    }
    if (newValue.length < 3) {
        togglePermisionToPunishPlayer(false)
    }
}
function setPunishmentDuration(newValue) {
    punishmentDuration.value = newValue
    togglePermisionToPunishPlayer(!!newValue)
}
async function handlePunishPlayer() {
    const target = {
        ID: playerID.value, 
        nickname: playerNickname.value
    }
    const punishmentInfo = {
        "type": punishmentType.value,
        "time": `${Date.now()}`,
        "adminNick": mainStore.user.nickname,
        "reason": punishmentReason.value 
    }
    if (punishmentType.value !== 'warn') {
        punishmentInfo.duration = punishmentDuration.value
    }
    const response = await punishPlayer(target, punishmentInfo)
    if (response) {
        emit('alistUpdated')
        handlePunishmentChoice('')
        togglePermisionToEnterReason(false)
        setPunishmentReason('')
        setPunishmentDuration(0)
    } else {
        isPunishmentFailed.value = true
    }
}
</script>

  