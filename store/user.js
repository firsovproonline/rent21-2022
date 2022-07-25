export const state = () => ({
  currentUser: null,
  users: []
})

export const getters = {
  user: (state) => { return state.currentUser },
  users: (state) => { return state.users },
}

export const actions = {
  setUser ({ commit }) {
    this.$api.get("/api/user").then(response => {
      commit('setUser', response.data)
    });
  },
  setUsers ({ commit }, items) {
    commit('setUsers', items)
  }
}

export const mutations = {
  setUser (state, items) {
    state.currentUser = items
  },
  setUsers (state, items) {
    state.users = items
  },
}

