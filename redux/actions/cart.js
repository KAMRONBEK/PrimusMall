import { ADD_TO_CART, REMOVE_FROM_CART, EMPTY_CART, INCEREMENT_COUNT, DECREMENT_COUNT } from "../types";

export const addToCart = (payload) => ({
    type: ADD_TO_CART,
    payload
})

export const removeFromCart = (payload) => ({
    type: REMOVE_FROM_CART,
    payload
})

export const emptyCart = (payload) => ({
    type: EMPTY_CART,
    payload
})

export const incrementCartItemCount = (payload) => ({
    type: INCEREMENT_COUNT,
    payload
})

export const decrementCartItemCount = (payload) => ({
    type: DECREMENT_COUNT,
    payload
})

