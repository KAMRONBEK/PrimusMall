import { SET_CATEGORY, CATEGORIES_LOADED } from "../types"

export const setCategory = (payload) => ({
    type: SET_CATEGORY,
    payload
})

export const categoriesLoaded = (payload) => ({
    type: CATEGORIES_LOADED,
    payload
})

