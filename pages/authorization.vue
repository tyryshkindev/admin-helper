<template>
    <AppHeader>&nbsp;</AppHeader>
    <BackgroundImage class="flex align-middle">
        <div class="container mx-auto p-4 flex justify-center items-center text-center">
            <form @submit.prevent class="py-8 px-5 bg-slate-700 rounded-lg">
                <h2 class="text-white">Введите никнейм и пароль, как в игре</h2>
                <UIInputField :inputValue="nickName" @update:inputValue="nickNameChange" :placeholder="'Nick_Name'"/>
                <UIInputField :inputValue="password" @update:inputValue="passwordChange" :type="'password'" :placeholder="'Пароль'"/>
                <p v-show="isAuthDataWrong" class="text-red-700 ">Неверные данные для авторизации! Проверьте ник и пароль</p>
                <footer class="text-right mt-4"><AuthButton @click="handleAuthorize" class="bg-cyan-400 hover:bg-cyan-600 p-2"/></footer>
            </form>
        </div>
    </BackgroundImage>
</template>

<script setup>
import {authorizeUser} from '@/api/authorization'
definePageMeta({
    layout: 'empty'
})
useHead({
    title: 'Авторизация | admins.hassle.online'
})
let nickName = ref('')
function nickNameChange(newValue) {
    nickName.value = newValue
    toggleWrongAuthData()
}
let password = ref('')
function passwordChange(newValue) {
    password.value = newValue
    toggleWrongAuthData()
}
let isAuthDataWrong = ref(false)
function toggleWrongAuthData(newValue = false) {
    isAuthDataWrong.value = newValue
}
const mainStore = useMainAdminStore()
async function handleAuthorize() {
    if (nickName.value.length >= 4 && password.value.length >= 6) {
        const newData = await authorizeUser({nickname: nickName.value, password: password.value})
        if (Object.keys(newData[0]).length) {
            mainStore.writeUser(newData[0])
            nickNameChange('')
            passwordChange('')
            await navigateTo('/profile')
        } else {
            toggleWrongAuthData(true)
        }
    } else {
        toggleWrongAuthData(true)
    }
    
}
</script>