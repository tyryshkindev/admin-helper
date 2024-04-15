
import AuthButton from './UI/AuthButton.vue';
<template>
    <div>
    <header class="max-h-[6.5vh] bg-black">
        <nav class="container mx-auto p-3 flex justify-between">
            <NuxtLink to="/"><img src="../public/hassle__logo.svg" alt="Hassle Logotype"></NuxtLink>
            <div class="flex">
                <UIAuthButton class="bg-white hover:bg-gray-300" />
            </div>
        </nav>
    </header>
    </div>
</template>