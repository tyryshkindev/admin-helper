<template>
    <button class="rounded-lg text-lg" type="button">
        <NuxtLink to="/authorization" class="p-4">
            <Icon name="i-heroicons-arrow-left-end-on-rectangle" />{{ $t('authorization__auth-btn') }}
        </NuxtLink>
    </button>
</template>
