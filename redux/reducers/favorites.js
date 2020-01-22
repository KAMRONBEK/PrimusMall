import { TOGGLE_ITEM, FAVORITES_LOADED } from "../types"
import { removeKeyFromObject } from "../../utils/state"
import AsyncStorage from "@react-native-community/async-storage"

const initialState = {}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case TOGGLE_ITEM:
            let item = state[payload.id]
            if (item) {
                let items = removeKeyFromObject(state, payload.id.toString());
                AsyncStorage.setItem('@favorites', JSON.stringify(items))
                return items
            } else {
                let newState = { ...state, [payload.id]: payload }
                AsyncStorage.setItem('@favorites', JSON.stringify(newState))
                return newState;
            }
        case FAVORITES_LOADED:
            return payload
        default:
            return state
    }
}
