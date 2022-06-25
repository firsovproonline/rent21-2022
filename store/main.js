import axios from 'axios'

export const state = () => ({
  vcomponent: null,
  globalevent: null,
  globalMessage: '11111'
})

export const actions = {
  async fetchNavItems (state) {
    try {
      let res = await axios.get("/api/test/all")
      state.commit('setglobamessage', res.data)
    } catch (err) {

    }
  },
  setVcomponent ({ commit }, comp) {
    commit('setVcomponent', comp)
  },
  setglobamessage ({ commit }, comp) {
    commit('setglobamessage', comp)
  },
  setglobalevent ({ commit }, val) {
    commit('setglobalevent', val)
  }
}

export const mutations = {
  setVcomponent (state, vcomponent) {
    state.vcomponent = vcomponent
  },
  setglobamessage (state, globalMessage) {
    state.globalMessage = globalMessage
  },
  setglobalevent (state, val) {
    state.globalevent = {}
    state.globalevent = val
  }
}

export const getters = {
  vcomponent: (state) => { return state.vcomponent },
  globalevent: (state) => { return state.globalevent },
  globalMessage: (state) => { return state.globalMessage }
}
