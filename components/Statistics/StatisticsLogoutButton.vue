<template>
    <button type="button" @click="mainStore.logoutFromProfile">
        <div class="bg-red-700 hover:bg-red-500 p-2 rounded-lg">
            <Icon name="i-heroicons-arrow-left-on-rectangle" />{{ $t('statistics__logout-btn') }}
        </div>
    </button>
</template>
<script setup>
const mainStore = useMainAdminStore()
</script>
