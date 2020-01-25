import { SET_ORDER, SET_CART, SET_SHIPPING_ADDRESS, SET_BILLING_ADDRESS } from "../types"

const initialState = {
    cart: [],
    order: {},
    shipping_address: {},
    billing_address: {}
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_ORDER:
            return { ...state, order: { ...state.order, ...payload } }
        case SET_CART:
            return { ...state, cart: [...state.cart, ...payload] }
        case SET_SHIPPING_ADDRESS:
            return { ...state, shipping_address: { ...state.shipping_address, ...payload } }
        case SET_BILLING_ADDRESS:
            return { ...state, billing_address: { ...state.billing_address, ...payload } }
        default:
            return state
    }
}
