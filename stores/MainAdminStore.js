export const useMainAdminStore = defineStore('mainAdminStore', () => {
    const user = reactive({
        
    })
    function writeUser(newData) {
        Object.assign(user, newData)
    }
    function logoutFromProfile() {
        for (const property in user) {
            delete user[property]
        }
        return navigateTo('/authorization')
    }
    const isUserAuthorized = computed(() => {
        return !!Object.keys(user).length 
    });
    
   
    return { user, isUserAuthorized, writeUser, logoutFromProfile }
})