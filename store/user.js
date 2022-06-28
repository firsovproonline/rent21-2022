export const state = () => ({
  currentUser: null
})

export const getters = {
  user: (state) => { return state.currentUser },
}

export const actions = {
  setUser ({ commit }) {
    this.$api.get("/api/user").then(response => {
      commit('setUser', response.data)
    });
  },
}

export const mutations = {
  setUser (state, items) {
    state.currentUser = items
  },
}

