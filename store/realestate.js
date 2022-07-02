import axios from "axios";

export const state = () => ({
  items: [{name: 33333},{name: 44444},{name: 555555}],
  total: 0,
  spr: {},
  importItems: {}
})

export const getters = {
  importItems: (state) => { return state.importItems },
  items: (state) => { return state.items },
  total: (state) => { return state.total },
  spr: (state) => { return state.spr }
}

export const mutations = {
  setimportItems (state, importItems) {
    state.importItems = importItems
  },
  setItems (state, items) {
    state.items = items
  },
  setSpr (state, spr) {
    state.spr = spr
  },
  setTotal (state, total) {
    state.total = total
  }

}

export const actions = {
  async load (state) {
    try {
      const res = await axios.get("http://localhost:3021/api/realestate/address")
      state.commit('setItems', res.data)
      const spr = await axios.get("http://localhost:3021/api/realestate/spr")
      state.commit('setSpr', spr.data)
    } catch (err) {

    }
  },
  setimportItems ({ commit }, importItems) {
    commit('setimportItems', importItems)
  },
  setItems ({ commit }, items) {
    commit('setItems', items)
  },
  setSpr ({ commit }, spr) {
    commit('setSpr', spr)
  }

}
