import { ADD_TO_CART, REMOVE_FROM_CART, EMPTY_CART, INCEREMENT_COUNT, DECREMENT_COUNT } from "../types";

const initialState = {
    items: []
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_TO_CART:
            return { ...state, items: [...state.items, { ...payload, count: 1 }] }
        case REMOVE_FROM_CART:
            let items = [...state.items];
            items = items.filter((value, index) => value.id !== payload)
            return { ...state, items }
        case EMPTY_CART:
            return initialState
        case INCEREMENT_COUNT:
            items = [...state.items]
            items[payload].count++
            return { ...state, items }
        case DECREMENT_COUNT:
            items = [...state.items]
            items[payload].count--
            return { ...state, items }
        default:
            return state
    }
}
