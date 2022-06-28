export const state = () => ({
  user: {}
})

export const actions = {
  setUser ({ commit }, user) {
    commit('setUser', user)
  },
}

export const mutations = {
  setUser ({ commit }, user) {
    state.user = user
  },
}

export const getters = {
  user: (state) => { return state.user },
}
