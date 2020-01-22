import { ADD_TO_CART, REMOVE_FROM_CART, EMPTY_CART, INCEREMENT_COUNT, DECREMENT_COUNT, CART_LOADED } from "../types";
import AsyncStorage from "@react-native-community/async-storage";

const initialState = {
    items: []
}

export default (state = initialState, { type, payload }) => {
    let newState = state;
    switch (type) {
        case ADD_TO_CART:
            let newState = { ...state, items: [...state.items, { ...payload, count: 1 }] }
            AsyncStorage.setItem("@cart", JSON.stringify(newState))
            return newState
        case REMOVE_FROM_CART:
            let items = [...state.items];
            items = items.filter((value, index) => value.id !== payload)
            newState = { ...state, items };
            AsyncStorage.setItem("@cart", JSON.stringify(newState))
            return newState;
        case EMPTY_CART:
            newState = initialState
            AsyncStorage.setItem("@cart", JSON.stringify(newState))
            return newState
        case INCEREMENT_COUNT:
            items = [...state.items]
            items[payload].count++
            newState = { ...state, items }
            AsyncStorage.setItem("@cart", JSON.stringify(newState))
            return newState
        case DECREMENT_COUNT:
            items = [...state.items]
            items[payload].count--
            newState = { ...state, items }
            AsyncStorage.setItem("@cart", JSON.stringify(newState))
            return newState
        case CART_LOADED:
            console.warn(payload);
            return payload
        default:
            return state
    }
}
