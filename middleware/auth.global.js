const helperAllowedRoutes = [
    '/statistics'
]
const adminAllowedRoutes = [
    '/statistics',
    '/players'
]
const headAllowedRoutes = [
    '/profile',
    '/players'
]
const unauthorizedRoutes = [
    '/',
    '/authorization'
]
const checkPath = (path, routes) => routes.some(route => path === route)
const checkPlayersPath = path => path.includes('/players')

export default defineNuxtRouteMiddleware(async (to, from) => {
    const mainStore = await useMainAdminStore()
    const authorized = mainStore.isUserAuthorized
    if (authorized) {
        switch (mainStore.user.adminLvl) {
            case '1': 
                if (!checkPath(to.path, helperAllowedRoutes)) {
                    return navigateTo('/statistics')
                }
                break
            case '2':
            case '3':
            case '4':
                if (!checkPath(to.path, adminAllowedRoutes) && !checkPlayersPath(to.path)) {
                    return navigateTo('/statistics')
                }
                break
            case '5':
            case '6': 
                if (!checkPath(to.path, headAllowedRoutes) && !checkPlayersPath(to.path)) {
                    return navigateTo('/profile')
                }
                break
        }
    } else {
        if (!checkPath(to.path, unauthorizedRoutes)) {
            return navigateTo('/authorization')
        }
    }
})