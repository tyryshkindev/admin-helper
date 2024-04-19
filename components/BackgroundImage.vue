<template>
    <div class="page__content bg-cover bg-no-repeat min-h-[93.5vh] h-[1px]" >
        <slot />
    </div>
</template>

<style scoped>
.page__content{
    background-image: url('../public/bg.png') ;
}
</style>