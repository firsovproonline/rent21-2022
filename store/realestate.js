import axios from "axios";

export const state = () => ({
  items: [{name: 33333},{name: 44444},{name: 555555}],
  item: {},
  total: 0,
  spr: {},
  importItems: {}
})

export const getters = {
  importItems: (state) => { return state.importItems },
  items: (state) => { return state.items },
  item: (state) => { return state.item },
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
  setItem (state, item) {
    state.item = item
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
  async loadSpr (state) {
    try {
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
  setItem ({ commit }, item) {
    commit('setItem', item)
  },
  setSpr ({ commit }, spr) {
    commit('setSpr', spr)
  }

}
