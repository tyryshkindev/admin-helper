<template>
    <UnauthorizedHeader/>
    <div class="page__content bg-cover bg-no-repeat min-h-[93.5vh] flex align-middle" >
        <div class="container mx-auto p-4 flex flex-col justify-center items-center text-center text-white">
            <h2 class="font-bold text-2xl pb-10">Помощник администрации HASSLE ONLINE</h2>
            <div>
                <ul class="pb-4">
                    <li>
                        <h3 class="font-bold text-xl p-4">Как пользоваться помощником:</h3>
                        <ul class="text-lg">
                            <li>
                                Войдите в личный кабинет администратора
                            </li>
                            <li>
                                Получите мгновенный доступ ко всем возможностям
                            </li>
                        </ul>
                    </li>
                </ul>
                <UIAuthButton class="bg-cyan-400 hover:bg-cyan-600 p-2" />
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
.page__content{
    background-image: url('../public/bg.png') ;
}
</style>