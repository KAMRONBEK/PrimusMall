export const SET = 'SET';

export const reducer = (state, {type, name, value}) => {
  switch (type) {
    case SET:
      return {...state, [name]: value};
    default:
      return state;
  }
};
