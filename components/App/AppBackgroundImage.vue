<template>
    <div class="page__content bg-cover bg-no-repeat h-screen w-auto" >
        <slot />
    </div>
</template>

<style scoped>
.page__content{
    background-image: url('../../public/bg.png')
}
</style>