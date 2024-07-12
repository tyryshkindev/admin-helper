export const setPunishment = async (targetID, existingAlist, punishmentInfo) => {
    try {
        const response = await $fetch(`http://localhost:4000/players/${targetID}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                alist: [
                    punishmentInfo,
                    ...existingAlist
                ]
             })
        })
        return response
    } catch (error) {
        console.error(error)
        return 503
    }
}
