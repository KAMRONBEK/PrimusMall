import { USER_LOADED, USER_LOGGED_IN } from '../types';
import AsyncStorage from '@react-native-community/async-storage'

const initialState = { token: '', data: {} };

export default user = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LOADED:
      return { ...state, payload };
    case USER_LOGGED_IN:
      AsyncStorage.setItem('@token', payload.token);
      return payload
    default:
      return state;
  }
};
