import axios from 'axios';

export const url = 'https://pmall.uz/api';

export default {
  auth: {
    login: credentials =>
      axios.post(`${url}/auth/signin`, credentials).then(res => res),
    register: data => axios.post(`${url}/auth/signup`, data).then(res => res),
  },
  main: {
    getProducts: () => axios.get(`${url}/products`).then(res => res),
    getCategories: () => axios.get(`${url}/categories`).then(res => res),
    getCategoryChilds: id =>
      axios.get(`${url}/category/${id}/children`).then(res => res),
    getCategory: id => axios.get(`${url}/category/${id}`).then(res => res),
    getStores: () => axios.get(`${url}/stores`).then(res => res),
    getStore: id => axios.get(`${url}/store/${id}`).then(res => res),
    getStoreProducts: id => axios.get(`${url}/store/${id}/products`).then(res => res),
    getProduct: id => axios.get(`${url}/product/${id}`).then(res => res),
  },
};
