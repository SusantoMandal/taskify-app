const pageLoader = {
  namespaced: true,
  state: {
    show: true
  },
  actions: {
    show({ commit }) {
      commit('showLoader', true);
    },
    hide({ commit }) {
      commit('showLoader', false);
    }
  },
  mutations: {
    showLoader: (state, loaderState) => {
      state.show = loaderState;
    }
  },
  getters: {
    isLoaderShown(state) {
      return state.show;
    }
  }
};

export default pageLoader;
