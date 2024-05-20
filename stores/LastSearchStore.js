export const useLastSearchedStore = defineStore('lastSearchStore', () => {
    const lastSearchedTargets = reactive({
        'admin': [],
        'player': []
    })
    function updateLastSearchedTargets(role, nickname) {
        lastSearchedTargets[role].push(nickname)
    }
    return { lastSearchedTargets, updateLastSearchedTargets }
})