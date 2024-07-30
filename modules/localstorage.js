export const setItem = (key, item) => {
    localStorage.setItem(key, JSON.stringify(item))
}

export const getItem = key => {
    return JSON.parse(localStorage.getItem(key))
}