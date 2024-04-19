export default defineNuxtRouteMiddleware(async (to, from) => {
    const mainStore = await useMainAdminStore()
    const authorized = mainStore.isUserAuthorized
    
    if ((to.path === '/' || to.path === '/authorization') && authorized) {
        return navigateTo('/profile')
    } else if (to.path !== '/' && to.path !== '/authorization' && !authorized) {
        return navigateTo('/authorization')
    }
})
