import axios from 'axios';
import TASKIFY_API_ENDPOINT from './api-endpoints';
import LocalStorage from '../../utils/storage/local-storage';

const user = {
  namespaced: true,
  state: {
    accessToken: null
  },
  actions: {
    loginUser({ commit }, userData) {
      console.log(process.env.NODE_ENV);
      return axios.post(TASKIFY_API_ENDPOINT.loginUser, userData)
        .then((response) => {
          commit('setAccessToken', response.data.accessToken);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    registerUser({ commit }, userData) {
      return axios.post(TASKIFY_API_ENDPOINT.registerUser, userData)
        .then((response) => {
          commit('setAccessToken', response.data.accessToken);
        })
        .catch((error) => { console.error(error); });
    },
    verifyAuth({ rootGetters }) {
      const config = {
        method: 'get',
        url: TASKIFY_API_ENDPOINT.authenticateUser,
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
  }
};

export default user;
