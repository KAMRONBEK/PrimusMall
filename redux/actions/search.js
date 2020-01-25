import { SET_TEXT, SET_EXPANDED } from "../types";

export const setText = (payload) => ({
    type: SET_TEXT,
    payload
})

export const setExpanded = (payload) => ({
    type: SET_EXPANDED,
    payload
})
