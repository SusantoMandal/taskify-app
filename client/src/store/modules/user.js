import axios from 'axios';
import LocalStorage from '../../utils/storage/local-storage';

const baseURL = window.location.origin;

const user = {
  namespaced: true,
  state: {
    accessToken: null
  },
  actions: {
    loginUser({ commit }, userData) {
      return axios.post(`${baseURL}/signin`, userData)
        .then((response) => {
          commit('setAccessToken', response.data.accessToken);
        })
        .catch((error) => {
          console.log(error);
          // throw new Error(error);
          // if (error.response.status === 401) {
          //   this.$router.push({
          //     name: 'LoginPage'
          //   });
          // }
        });
    },
    registerUser({ commit }, userData) {
      return axios.post(`${baseURL}/signup`, userData)
        .then((response) => {
          commit('setAccessToken', response.data.accessToken);
        })
        .catch((error) => { console.error(error); });
    },
    verifyAuth({ rootGetters }) {
      const config = {
        method: 'get',
        url: `${baseURL}/authenticate`,
        headers: {
          'Access-Control-Allow-Origin': '*',
          authorization: `Bearer ${rootGetters['user/getAccessToken']}`
        }
      };
      const request = axios(config);
      return request
        .catch((error) => error);
    }
  },
  mutations: {
    setAccessToken: (state, token) => {
      LocalStorage.setItem('Auth', token);
      state.accessToken = token;
    },
    removeAccessToken: (state) => {
      LocalStorage.removeItem('Auth');
      state.accessToken = null;
    }
  },
  getters: {
    getAccessToken: (state) => state.accessToken || LocalStorage.getItem('Auth')
    // getAccessToken: (state) => {
    //   const localToken = LocalStorage.getItem('Auth');
    //   return state.accessToken || localToken;
    // }
  }
};

export default user;
