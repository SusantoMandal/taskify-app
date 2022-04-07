const header = {
  namespaced: true,
  state: {
    showSignButtons: Boolean
  },
  mutations: {
    setShowSignButtons: (state, value) => {
      state.showSignButtons = value;
    }
  }
};

export default header;
