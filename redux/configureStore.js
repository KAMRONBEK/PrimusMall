import {combineReducers, createStore} from 'redux';
import {user} from './reducers/user';

export const configureStore = () => {
  return createStore(
    combineReducers({
      user,
    }),
  );
};
