import Vue from 'vue';
import Vuelidate from 'vuelidate';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';
import '@fortawesome/fontawesome-free/js/all';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Vuelidate);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const errResponse = error.response;
    if (errResponse.data.code === 'ERR_203') {
      store.commit('user/removeAccessToken');
      store.hotUpdate(store.state);
      if (router.currentRoute.path === '/task') {
        router.push({
          name: 'LoginPage'
        });
      }
    }
    return Promise.reject(error);
  }
);

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
