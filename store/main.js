import axios from 'axios'

export const state = () => ({
  vcomponent: null,
  vleftMenu: null,
  globalevent: null,
  multiItems: [],
  globalMessage: '11111',
  setings:{},
  combospr: '',
  combofield: '',
  combovalue: '',
  disableds: []
})

export const actions = {
  async fetchNavItems (state) {
    try {
      let res = await axios.get("/api/test/all")
      state.commit('setglobamessage', res.data)
    } catch (err) {

    }
  },
  setmultiItems ({ commit }, comp) {
    commit('setmultiItems', comp)
  },
  setdisableds ({ commit }, comp) {
    commit('setdisableds', comp)
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
  setdisableds (state, vcomponent) {
    state.disableds = vcomponent
  },
  setmultiItems (state, vcomponent) {
    state.multiItems = vcomponent
  },
  setSetings (state, vcomponent) {
    state.setings = vcomponent
  },
  setVcomponent (state, vcomponent) {
    state.vcomponent = vcomponent.comp
    state.combospr = vcomponent.spr
    state.combofield = vcomponent.field
    state.combovalue = vcomponent.value
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
  disableds:  (state) => { return state.disableds },
  vcomponent: (state) => { return state.vcomponent },
  globalevent: (state) => { return state.globalevent },
  globalMessage: (state) => { return state.globalMessage },
  setings: (state) => { return state.setings },
  multiItems: (state) => { return state.multiItems },
  combospr: (state) => { return state.combospr },
  combofield: (state) => { return state.combofield },
  combovalue: (state) => { return state.combovalue },
}
