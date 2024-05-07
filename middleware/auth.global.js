const authorizedRoutes = [
    '/profile',
    '/statistics'
]
const unauthorizedRoutes = [
    '/',
    '/authorization'
]

const isPathRight = (path, routes) => routes.some(route => path === route)

export default defineNuxtRouteMiddleware(async (to, from) => {
    const mainStore = await useMainAdminStore()
    const authorized = mainStore.isUserAuthorized
    
    if (authorized) {
        if (isPathRight(to.path, unauthorizedRoutes)) {
            return navigateTo('/profile')
        }
    } else {
        if (!isPathRight(to.path, unauthorizedRoutes) && !isPathRight(to.path, authorizedRoutes)) {
            return navigateTo('/authorization')
        }
    }
})
