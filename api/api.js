import axios from 'axios';

export const url = 'https://pmall.uz/api';

export const configureAxios = (store) => {
  axios.interceptors.response.use((res) => res, error => {
    if (!error || !error.response || error.response.status !== 401) {
      return Promise.reject(error);
    }
    axios.interceptors.response.eject(interceptor);
    return requests.auth
      .refreshToken(store.getState().user.token)
      .then(res => {
        error.response.config.headers = {
          Authorization: `Bearer ${res.data.data}`,
        };
        AsyncStorage.setItem('@token', res.data.data);
        store.dispatch(bootstrap({ token: res.data.data }));
        return axios(error.response.config);
      })
      .catch(response => {
        return Promise.reject(response);
      })
      .finally(() => configureAxios(store));
  })
}

let requests = {
  auth: {
    login: credentials =>
      axios.post(`${url}/auth/signin`, credentials).then(res => res),
    register: data => axios.post(`${url}/auth/signup`, data).then(res => res),
    refreshToken: token => axios.post(`${url}/auth/refresh-token?token=${token}`)
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
  user: {
    getUser: token => axios.get(`${url}/user/get?token=${token}`)
  }
};


export default requests;