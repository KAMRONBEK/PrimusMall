import { CATEGORIES_LOADED, SET_CATEGORY } from "../types"

const initialState = {
    selected: 0,
    items: []
}

export default (state = initialState, { type, payload }) => {
    console.warn({ type, payload });

    switch (type) {

        case CATEGORIES_LOADED:
            return { ...state, items: payload }

        case SET_CATEGORY:
            return { ...state, selected: payload }


        default:
            return state
    }
}
