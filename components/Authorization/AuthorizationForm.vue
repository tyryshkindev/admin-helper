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
            <AppErrorMessage v-show="isAuthDataWrong" :message="'Неверные данные для авторизации! Проверьте ник и пароль'" />
            <ModalAuthorizationFailed :isModalOpened="isServerResponseFailed" @closeModal="toggleWrongServerResponse" />
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
const isAuthDataWrong = ref(false)
const isAuthorizationInProgress = ref(false)
const isServerResponseFailed = ref(false)

function setNickName(newValue) {
    nickName.value = newValue
    toggleWrongAuthData()
}
function setPassword(newValue) {
    password.value = newValue
    toggleWrongAuthData()
}
function toggleWrongAuthData(newValue = false) {
    isAuthDataWrong.value = newValue
}
function toggleWrongServerResponse(newValue = false) {
    isServerResponseFailed.value = newValue
}
function resetInputFields() {
    setNickName('')
    setPassword('')
}
async function handleAuthorize() {
    isAuthorizationInProgress.value = true
    const newUserInfo = await authenticateUser({nickname: nickName.value, password: password.value})
    if (typeof newUserInfo === 'object') {
        resetInputFields()
        emit('authorization', newUserInfo)
    } else if (newUserInfo === 503){
        toggleWrongServerResponse(true)
        resetInputFields()
    } else {
        toggleWrongAuthData(true)
    }
    isAuthorizationInProgress.value = false
}
</script>