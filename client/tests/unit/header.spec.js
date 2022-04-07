import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router'
import Header from '@/components/header/header.vue';

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(VueRouter)

const header = {
  namespaced: true,
  state: {
    showSignButtons: true
  },
  mutations: {
    changeSignButton: (state, value) => {
      console.log('before',state.showSignButtons)
      state.showSignButtons = value
      console.log('after',state.showSignButtons)
    }
  }
}

const store = new Vuex.Store({
  modules: {
    header
  }
})


describe('Header.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Header, { 
      stubs: ['router-link'],
      store, 
      localVue
    })
  });

  it('renders Home', () => {
    const data = wrapper.get('[data-test = "Home"]').text();
    expect(data).toBe('Home');
  });

  it('check for signin button existence', async () => {
    const data = wrapper.get('[data-test = "Sign-in"]');
    expect(data.exists()).toBe(true);
  });

  it('check for signin button', async () => {
    // await store.commit('header/changeSignButton',false)
    const data = wrapper.get('[data-test = "Sign-in"]').text();
    expect(data).toBe('Sign in');
  });

  it('check for sign up button existence', async () => {
    const data = wrapper.get('[data-test = "Sign-up"]');
    expect(data.exists()).toBe(true);
  });

  it('check for sign up button', async () => {
    // await store.commit('header/changeSignButton',false)
    const data = wrapper.get('[data-test = "Sign-up"]').text();
    expect(data).toBe('Sign up');
  });
});
