import { combineReducers, createStore } from 'redux';
import { user, cart, favorite } from './reducers';

export const configureStore = () => {
  return createStore(
    combineReducers({
      user,
      favorite,
      cart
    }),
  );
};
