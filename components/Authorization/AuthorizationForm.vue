<template>
    <div>
        <UILoadingSpinner v-show="isAuthorizationInProgress" />
        <form v-show="!isAuthorizationInProgress" id="authorization" class="py-8 px-5 bg-slate-700 rounded-lg">
            <h2 class="text-white">Введите никнейм и пароль, как в игре</h2>
            <UIInputField 
                :inputValue="nickName" 
                :placeholder="'Nick_Name'" 
                @update:inputValue="setNickName" 
                @keydown.enter="handleAuthorize"
            />
            <UIInputField 
                :inputValue="password" 
                :type="'password'" 
                :placeholder="'Пароль'"
                @update:inputValue="setPassword" 
                @keydown.enter="handleAuthorize"
                 
            />
            <AppErrorMessage v-show="isAuthDataWrong" :message="wrongDataMessage" />
            <footer class="text-right mt-4">
                <AuthorizationButton class="bg-cyan-400 hover:bg-cyan-600 p-2" @click="handleAuthorize" />
            </footer>
        </form>
    </div>
</template>

<script setup>
const emit = defineEmits({
    authorization: null
})
const nickName = ref('')
const password = ref('')
const wrongDataMessage = ref('')
const isAuthDataWrong = ref(false)
const isAuthorizationInProgress = ref(false)

function changeVariableValue(target, newValue) {
    target.value = newValue
}
function setNickName(newValue) {
    changeVariableValue(nickName, newValue)
    toggleWrongAuthData()
}
function setPassword(newValue) {
    changeVariableValue(password, newValue)
    toggleWrongAuthData()
}
function toggleWrongAuthData(newValue = false) {
    changeVariableValue(isAuthDataWrong, newValue)
}
function setWrongDataMessage(newValue) {
    changeVariableValue(wrongDataMessage, newValue)
}
function toggleAuthorizationSpinner(newValue = false) {
    changeVariableValue(isAuthorizationInProgress, newValue)
}
async function handleAuthorize() {
    toggleAuthorizationSpinner(true)
    const newUserInfo = await authenticateUser({nickname: nickName.value, password: password.value})
    if (typeof newUserInfo === 'object') {
        setNickName('')
        setPassword('')
        emit('authorization', newUserInfo)
        toggleAuthorizationSpinner()
    } else if (newUserInfo === 503){
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