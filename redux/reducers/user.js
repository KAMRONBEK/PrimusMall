import { USER_LOADED, USER_LOGGED_IN, USER_LOGGED_OUT } from '../types';
import AsyncStorage from '@react-native-community/async-storage'

const initialState = { token: '', data: {}, orders: [] };

export default user = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LOADED:
      return { ...state, ...payload };
    case USER_LOGGED_IN:
      AsyncStorage.setItem('@token', payload.token);
      return payload
    case USER_LOGGED_OUT:
      AsyncStorage.setItem('@token', "");
      return initialState
    default:
      return state;
  }
};
