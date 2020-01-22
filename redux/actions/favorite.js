import { TOGGLE_ITEM, FAVORITES_LOADED } from "../types";

export const toggleFavorite = (payload) => ({ type: TOGGLE_ITEM, payload });

export const favoritesLoaded = (payload) => ({
    type: FAVORITES_LOADED,
    payload
})
