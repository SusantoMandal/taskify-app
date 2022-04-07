import axios from 'axios';

const os = require('os');

const baseURL = os.hostname();

const task = {
  namespaced: true,
  state: {
    allTasks: []
  },
  actions: {
    getAllTasks({ commit, rootGetters }) {
      const config = {
        method: 'get',
        url: `${baseURL}/tasks`,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          authorization: `Bearer ${rootGetters['user/getAccessToken']}`
        }
      };
      const request = axios(config);
      return request
        .then((result) => {
          commit('setTasks', result.data);
        })
        .catch((error) => { console.error(error); throw error; });
    },
    updateTask({ rootGetters }, { taskId }) {
      const config = {
        method: 'put',
        url: `${baseURL}/tasks/${taskId}`,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          authorization: `Bearer ${rootGetters['user/getAccessToken']}`
        }
      };
      const request = axios(config);
      request.catch((error) => { console.error(error); throw error; });
    },
    addTask({ dispatch, rootGetters }, { description }) {
      const data = {
        description
      };
      const config = {
        method: 'post',
        url: `${baseURL}/tasks`,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          authorization: `Bearer ${rootGetters['user/getAccessToken']}`
        },
        data
      };
      const request = axios(config);
      return request
        .then(async () => {
          await dispatch('getAllTasks');
        })
        .catch((error) => { console.error(error); });
    },
    deleteTask({ dispatch, rootGetters }, { taskId }) {
      const config = {
        method: 'delete',
        url: `${baseURL}/tasks/${taskId}`,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          authorization: `Bearer ${rootGetters['user/getAccessToken']}`
        }
      };
      const request = axios(config);
      return request
        .then(async () => {
          await dispatch('getAllTasks');
        })
        .catch((error) => { console.error(error); throw error; });
    }
  },
  mutations: {
    setTasks: (state, data) => {
      state.allTasks = data;
    }
  }
};

export default task;
