<template>
    <div>
        <LoadingSpinner v-show="isAuthorizationInProgress" />
        <form v-show="!isAuthorizationInProgress" @submit.prevent class="py-8 px-5 bg-slate-700 rounded-lg">
            <h2 class="text-white">Введите никнейм и пароль, как в игре</h2>
            <UIInputField 
            :inputValue="nickName" 
            @update:inputValue="setNickName" 
            :placeholder="'Nick_Name'" 
            />
            <UIInputField 
            :inputValue="password" 
            @update:inputValue="setPassword" 
            :type="'password'" 
            :placeholder="'Пароль'" 
            />
            <ErrorMessage v-show="isAuthDataWrong" :message="wrongDataMessage" />
            <!-- <p v-show="isAuthDataWrong" class="text-red-700 "></p> -->
            <footer class="text-right mt-4">
                <AuthorizationButton @click="handleAuthorize" class="bg-cyan-400 hover:bg-cyan-600 p-2" />
            </footer>
        </form>
    </div>
</template>

<script setup>
import {authenticateUser} from '@/utils/authenticateUser'
const emit = defineEmits({
    authorization: null
})
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
const wrongDataMessage = ref('')
function setWrongDataMessage(newValue) {
    wrongDataMessage.value = newValue
}
const isAuthorizationInProgress = ref(false)
function toggleAuthorizationSpinner(newValue = false) {
    isAuthorizationInProgress.value = newValue
}
async function handleAuthorize() {
    toggleAuthorizationSpinner(true)
    const newUserInfo = await authenticateUser({nickname: nickName.value, password: password.value})
    if (typeof newUserInfo === 'object') {
        setNickName('')
        setPassword('')
        emit('authorization', newUserInfo)
        toggleAuthorizationSpinner()
    } else if (newUserInfo === 404){
        console.log(404)
        toggleWrongAuthData(true)
        setWrongDataMessage('Ошибка при попытке авторизации. Попробуйте позже')
        toggleAuthorizationSpinner()
    } else {
        toggleWrongAuthData(true)
        setWrongDataMessage('Неверные данные для авторизации! Проверьте ник и пароль')
        toggleAuthorizationSpinner()
    }
}
</script>