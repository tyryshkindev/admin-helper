export const useMainAdminStore = defineStore('mainAdminStore', () => {
    const user = reactive({
        "id": "1723454",
        "nickname": "Valeriy_Tyryshkin",
        "password": "javascriptizer777",
        "lvl": "77",
        "adminLvl": "4",
        "alist": []
      },)
    function writeUser(newData) {
        Object.assign(user, newData)
    }
    const isUserAuthorized = computed(() => {
        return !!Object.keys(user).length 
    });
    
   
    return { user, isUserAuthorized, writeUser }
})