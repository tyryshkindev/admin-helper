const helperAllowedRoutes = [
    '/statistics'
]
const adminAllowedRoutes = [
    '/statistics',
    '/players'
]
const deputyAllowedRoutes = [
    '/monitoring',
    '/players'
]
const headAllowedRoutes = [
    '/managment',
    '/monitoring',
    '/players'
]
const unauthorizedRoutes = [
    '/',
    '/authorization'
]
const checkPath = (path, routes) => routes.some(route => path === route)
const checkSearchedPath = path => path.includes('/players') || path.includes('/monitoring')

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
                if (!checkPath(to.path, adminAllowedRoutes) && !checkSearchedPath(to.path)) {
                    return navigateTo('/statistics')
                }
                break
            case '5':
                if (!checkPath(to.path, deputyAllowedRoutes) && !checkSearchedPath(to.path)) {
                    return navigateTo('/monitoring')
                }
            case '6': 
                if (!checkPath(to.path, headAllowedRoutes) && !checkSearchedPath(to.path)) {
                    return navigateTo('/managment')
                }
                break
        }
    } else {
        if (!checkPath(to.path, unauthorizedRoutes)) {
            return navigateTo('/authorization')
        }
    }
})