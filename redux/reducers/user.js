import {USER_LOADED} from '../types';

const initialState = {};

export const user = (state = initialState, {type, payload}) => {
  switch (type) {
    case USER_LOADED:
      return payload;
    default:
      return state;
  }
};
