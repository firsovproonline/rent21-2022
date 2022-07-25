import axios from 'axios'

export const state = () => ({
  vcomponent: null,
  vleftMenu: null,
  globalevent: null,
  globalMessage: '11111',
  setings:{}
})

export const actions = {
  async fetchNavItems (state) {
    try {
      let res = await axios.get("/api/test/all")
      state.commit('setglobamessage', res.data)
    } catch (err) {

    }
  },
  setSetings ({ commit }, comp) {
    commit('setSetings', comp)
  },
  setleftMenu ({ commit }, comp) {
    commit('setleftMenu', comp)
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
  setleftMenu (state, vcomponent) {
    console.log('1111111111111111111111')
    state.vleftMenu = vcomponent
  },
  setSetings (state, vcomponent) {
    state.setings = vcomponent
  },
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
  leftMenu:  (state) => { return state.vleftMenu },
  vcomponent: (state) => { return state.vcomponent },
  globalevent: (state) => { return state.globalevent },
  globalMessage: (state) => { return state.globalMessage },
  setings: (state) => { return state.setings },
}
