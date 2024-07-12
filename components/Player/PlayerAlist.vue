<template>
    <div v-if="alist && !!Object.keys(alist).length" class="max-h-60 lg:max-h-96 overflow-auto xl:overflow-hidden hover:overflow-auto">
        <p class="pb-3">{{ $t('player__alist-title') }}:</p>
        <div v-for="punishment in alist" :key="punishment.id" class="pb-3">
            <p>{{ $t('player__alist-punishment') }}: {{ getPunishmentType(punishment.type) }}</p>
            <p>{{ $t('player__alist-time') }}: {{ formattedPunishmentTime(punishment.time) }}</p>
            <p>{{ $t('player__alist-admin') }}: {{ punishment.adminNick }}</p>
            <p>{{ $t('player__alist-reason') }}: {{ punishment.reason }}</p>
            <p v-if="punishment.type !== 'warn'">{{ $t('player__alist-duration') }}: {{ punishment.duration }}</p>
        </div>
    </div>
    <p v-else>{{ $t('player__alist-empty') }}.</p>
</template>

<script setup>
import {ruPunishmentTypes, enPunishmentTypes} from '@/constants/index'
const {locale} = useI18n()
const props = defineProps({
    alist: {
        type: Object, 
        required: true
    }
})
const {alist} = toRefs(props)

function getPunishmentType(punishment) {
    return locale.value === 'ru' ? ruPunishmentTypes[punishment] : enPunishmentTypes[punishment]
}
function getTextMonth(id) {
    const ruMonths = [
        'Января',
        'Февраля',
        'Марта',
        'Апреля',
        'Мая',
        'Июня',
        'Июля',
        'Августа',
        'Сентября',
        'Ноября',
        'Декабря',
    ]
    const enMonths = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]
    return locale.value === 'ru' ? ruMonths[id] : enMonths[id]
}
function formattedPunishmentTime(timestamp) {
    const date = new Date(Number(timestamp))
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    return `${day} ${getTextMonth(month)} ${year} ${hours}:${minutes}:${seconds}`
}
</script>