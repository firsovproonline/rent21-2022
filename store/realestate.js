import axios from "axios";

export const state = () => ({
  items: [{name: 33333},{name: 44444},{name: 555555}],
  spr: {}
})

export const getters = {
  items: (state) => { return state.items },
  spr: (state) => { return state.spr }
}

export const mutations = {
  setItems (state, items) {
    state.items = items
  },
  setSpr (state, spr) {
    state.spr = spr
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
  setItems ({ commit }, items) {
    commit('setItems', items)
  },
  setSpr ({ commit }, spr) {
    commit('setSpr', spr)
  }

}
