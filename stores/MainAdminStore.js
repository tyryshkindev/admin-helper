export const useMainAdminStore = defineStore('mainAdminStore', () => {
    const user = reactive({})
    function writeUser(newData) {
        Object.assign(user, newData)
    }
    const isUserAuthorized = computed(() => {
        return Object.keys(user).length 
    });
    
   
    return { user, isUserAuthorized, writeUser }
})