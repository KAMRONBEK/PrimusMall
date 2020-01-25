import { SET_EXPANDED, SET_TEXT } from "../types"

const initialState = {
    isExpanded: false,
    text: ''
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_EXPANDED:
            return { ...state, expanded: payload }
        case SET_TEXT:
            return { ...state, text: payload }
        default:
            return state
    }
}
