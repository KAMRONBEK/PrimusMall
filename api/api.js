import axios from 'axios';
import {userLoaded} from '../redux/actions';
import AsyncStorage from '@react-native-community/async-storage';

export const url = 'https://pmall.uz/api';

export const configureAxios = store => {
  let interceptor = axios.interceptors.response.use(
    res => res,
    error => {
      if (!error || !error.response || error.response.status !== 401) {
        return Promise.reject(error);
      }
      axios.interceptors.response.eject(interceptor);
      console.warn(store.getState());

      return requests.auth
        .refreshToken(store.getState().user.token)
        .then(res => {
          error.response.config.headers = {
            Authorization: `Bearer ${res.data.data}`,
          };
          AsyncStorage.setItem('@token', res.data.data);
          store.dispatch(userLoaded({token: res.data.data}));
          return axios(error.response.config);
        })
        .catch(response => {
          return Promise.reject(response);
        })
        .finally(() => configureAxios(store));
    },
  );
};

let formData = rawData => {
  let form = new FormData();
  Object.keys(rawData).forEach(key => {
    form.append(key, rawData[key]);
  });
  return form;
};

let requests = {
  auth: {
    login: credentials =>
      axios.post(`${url}/auth/signin`, credentials).then(res => res),
    register: data => axios.post(`${url}/auth/signup`, data).then(res => res),
    refreshToken: token =>
      axios.post(`${url}/auth/refresh-token?token=${token}`),
    social: (type, token) =>
      axios.get(`${url}/sociallogin/${type}/auth?access_token=${token}`),
  },
  main: {
    getProducts: () => axios.get(`${url}/products`).then(res => res),
    filterProducts: filters =>
      axios.get(`${url}/products${filters}`).then(res => res),
    getCategories: () => axios.get(`${url}/categories`).then(res => res),
    getCategoryChilds: id =>
      axios.get(`${url}/category/${id}/children`).then(res => res),
    getCategory: id => axios.get(`${url}/category/${id}`).then(res => res),
    getStores: () => axios.get(`${url}/stores`).then(res => res),
    getStore: id => axios.get(`${url}/store/${id}`).then(res => res),
    getStoreProducts: id =>
      axios.get(`${url}/store/${id}/products`).then(res => res),
    getProduct: id => axios.get(`${url}/product/${id}`).then(res => res),
    getBanner: () => axios.get(`${url}/banners/main`),
    getShippingTypes: () => axios.get(`${url}/shippingtypelist`),
    getPaymentMethods: () => axios.get(`${url}/paymentmethodlist`),
    filterStores: filters =>
      axios.get(`${url}/stores${filters}`).then(res => res),
  },
  user: {
    getUser: token =>
      axios.get(`${url}/user/get`, {
        headers: {Authorization: `Bearer ${token}`},
      }),
    updateUser: (credentials, token) =>
      axios.post(`${url}/user/update`, formData(credentials), {
        headers: {Authorization: `Bearer ${token}`},
      }),
    createOrder: (data, token) =>
      axios.post(`${url}/user/orders/create`, data, {
        headers: {Authorization: `Bearer ${token}`},
      }),
    getOrders: token =>
      axios.get(`${url}/user/orders`, {
        headers: {Authorization: `Bearer ${token}`},
      }),
  },
};

export default requests;
