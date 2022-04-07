import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '../views/home-page/home-page.vue';
import RegisterPage from '../views/register-page/register-page.vue';
import LoginPage from '../views/login-page/login-page.vue';
import TaskPage from '../views/task-page/task-page.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/task',
    name: 'TaskPage',
    component: TaskPage
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});

export default router;
