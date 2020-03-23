import { SET_ORDER, SET_CART, SET_SHIPPING_ADDRESS } from "../types";

export const setOrderCart = (payload) => ({
    type: SET_CART,
    payload
})

export const setOrder = (payload) => ({
    type: SET_ORDER,
    payload
})

export const setShippingAddress = (payload) => ({
    type: SET_SHIPPING_ADDRESS,
    payload
})
