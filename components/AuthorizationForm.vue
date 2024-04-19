<template>
    <div>
        <form @submit.prevent class="py-8 px-5 bg-slate-700 rounded-lg">
            <h2 class="text-white">Введите никнейм и пароль, как в игре</h2>
            <UIInputField :inputValue="nickName" @update:inputValue="setNickName" :placeholder="'Nick_Name'" />
            <UIInputField :inputValue="password" @update:inputValue="setPassword" :type="'password'" :placeholder="'Пароль'" />
            <p v-show="isAuthDataWrong" class="text-red-700 ">Неверные данные для авторизации! Проверьте ник и пароль</p>
            <footer class="text-right mt-4">
                <AuthButton @click="handleAuthorize" class="bg-cyan-400 hover:bg-cyan-600 p-2" />
            </footer>
        </form>
    </div>
</template>

<script setup>
const emit = defineEmits({
    authorization: null
})
import {authorizeUser} from '@/api/authorization'
const nickName = ref('')
function setNickName(newValue) {
    nickName.value = newValue
    toggleWrongAuthData()
}
const password = ref('')
function setPassword(newValue) {
    password.value = newValue
    toggleWrongAuthData()
}
const isAuthDataWrong = ref(false)
function toggleWrongAuthData(newValue = false) {
    isAuthDataWrong.value = newValue
}
async function handleAuthorize() {
    if (nickName.value.length >= 4 && password.value.length >= 6) {
        const userInfo = await authorizeUser({nickname: nickName.value, password: password.value})
        if (Object.keys(userInfo[0]).length) {
            setNickName('')
            setPassword('')
            emit('authorization', userInfo[0])
        } else {
            toggleWrongAuthData(true)
        }
    } else {
        toggleWrongAuthData(true)
    }
}
</script>