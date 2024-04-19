export const authorizeUser = async (user) => {
    try {
        const response = await fetch(`http://localhost:4000/players?nickname=${user.nickname}&password=${user.password}&adminLvl_ne=0`)
        if (!response.ok) {
            throw new Error(`Server responded with ${response.code} status code`)
        } return await response.json()
    } catch (error) {
        alert('Возникла внутренняя ошибка сервера, попробуйте позже')
        console.error(error)
    }
    
}