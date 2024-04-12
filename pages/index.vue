<template>
    <div class="main__page">
        <UnauthorizedHeader />
        <div class="container mx-auto p-4">
                <h2 class="main__page-title font-bold text-2xl py-10">Помощник администрации HASSLE ONLINE</h2>
                <div>
                    <div>
                        <ul>
                            <li>
                                <h3>Как пользоваться помощником:</h3>
                                <ul>
                                    <li>
                                        Войдите в личный кабинет администратора
                                    </li>
                                    <li>
                                        Получите мгновенный доступ ко всем возможностям
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <UButton to="/authorization" class="text-black">Войти</UButton>
                </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'empty'
})
</script>

<style lang="scss" scoped>
.main__page{
    background-image: url('../public/bg__man.jpeg') ;
    background-size:cover;
    background-repeat: no-repeat;
    min-height: 100vh;
}
</style>