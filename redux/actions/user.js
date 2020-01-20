import {USER_LOADED} from '../types';

export const userLoaded = payload => ({
  type: USER_LOADED,
  payload,
});
