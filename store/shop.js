import axios from 'axios'

export const state = () => ({
  catalog: []
})

export const actions = {
  async load (state) {
    try {
      const res = await axios.get("http://firsovpro.online/api/shop/catalog")
      state.commit('setCatalog', res.data)
    } catch (err) {

    }
  },
  setCatalog ({ commit }, catalog) {
    commit('setCatalog', catalog)
  }
}

export const mutations = {
  setCatalog (state, catalog) {
    state.catalog = catalog
  }
}

export const getters = {
  catalog: (state) => {
    return state.catalog
  }
}
