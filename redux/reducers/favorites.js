import { TOGGLE_ITEM } from "../types"
import { removeKeyFromObject } from "../../utils/state"

const initialState = {}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case TOGGLE_ITEM:
            let item = state[payload.id]
            if (item) {
                let items = removeKeyFromObject(state, payload.id.toString());
                return items
            } else {
                return { ...state, [payload.id]: payload }
            }
        default:
            return state
    }
}
