export const useLastSearchedStore = defineStore('lastSearchStore', () => {
    const lastSearchedTargets = reactive({
        'admin': new Set(),
        'player': new Set()
    })
    function updateLastSearchedTargets(role, nickname) {
        const newSet = new Set([nickname])
        lastSearchedTargets[role] = newSet.union(lastSearchedTargets[role])
        // используем метод Set.union чтобы добавлять новый элемент в начало Set'a
    }
    return { lastSearchedTargets, updateLastSearchedTargets }
})