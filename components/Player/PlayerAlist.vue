<template>
    <div v-if="alist && !!Object.keys(alist).length" class="max-h-96 overflow-hidden hover:overflow-auto">
        <p class="pb-3">Последние наказания игрока:</p>
        <div v-for="punishment in alist" :key="punishment.id" class="pb-3">
            <p>Наказание: {{ getPunishmentType(punishment.type) }}</p>
            <p>Время наказания: {{ formattedPunishmentTime(punishment.time) }}</p>
            <p>Администратор: {{ punishment.adminNick }}</p>
            <p>Причина: {{ punishment.reason }}</p>
            <p v-if="punishment.type !== 'warn'">Длительность наказания: {{ punishment.duration }}</p>
        </div>
    </div>
    <p v-else>Список наказаний игрока пуст.</p>
</template>

<script setup>
import {punishmentTypes} from '@/constants/index'
const props = defineProps({
    alist: {
        type: Object, 
        required: true
    }
})
const {alist} = toRefs(props)
function getPunishmentType(punishment) {
    return punishmentTypes[punishment]
}
function getTextMonth(id) {
    const months = [
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
    return months[id]
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