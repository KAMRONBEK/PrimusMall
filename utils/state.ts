export const SET = 'SET';
export const SET_MULTIPLE = 'SET_MULTIPLE';

export const reducer = (state, {type, ...payload}) => {
  switch (type) {
    case SET:
      let {name, value} = payload;
      return {...state, [name]: value};
    case SET_MULTIPLE:
      let temp = state;
      let {values, names} = payload;
      names.forEach((key, i) => {
        temp[key] = values[i];
      });
      return {...state, ...temp};
    default:
      return state;
  }
};

export let removeKeyFromObject = (obj, keyToFind) => {
  return Object.keys(obj).reduce((prev, current, index) => {
    if (keyToFind !== current) return {...prev, [current]: obj[current]};
    return prev;
  }, {});
};
