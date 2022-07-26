import { GetterTree, ActionTree, MutationTree } from 'vuex'
import IPPhone from "~/model/ipphone";
import {request} from "express";


export const state = () => ({
  IPphoneItems: [],
  cianItems: [],
  avitoItems: [],
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  IPphoneItems:state => state.IPphoneItems,
  cianItems:state => state.cianItems,
  avitoItems:state => state.avitoItems,
}

export const mutations: MutationTree<RootState> = {
  // @ts-ignore
  setIPphoneItems: (state, value: Array<ipphone>) => (state.IPphoneItems = value),
  setCianItems: (state, value) => (state.cianItems = value),
  setAvitoItems: (state, value) => (state.avitoItems = value),
  insertIPphoneItem: (state) => (
    // @ts-ignore
    state.IPphoneItems.push( new IPPhone('','', true))
  ),
  insertCianItem: (state) => (
    // @ts-ignore
    state.cianItems.push( new IPPhone('','', true))
  ),
  insertAvitoItem: (state) => (
    // @ts-ignore
    state.avitoItems.push( new IPPhone('','', true))
  ),
  saveSeting:( state ) => (
    console.log(this)
  )
}

export const actions:
  ActionTree<RootState, RootState> = {
    async fetchThings({ commit }) {
      const things = await this.$axios.$get('/things')
      console.log(things)
  },
  insertCianItem({ commit }){
    commit('insertCianItem');
    this.commit('main/setglobalevent',null)
    this.commit('main/setglobalevent','insertCian')
  },
  insertAvitoItem({ commit }){
    commit('insertAvitoItem');
    this.commit('main/setglobalevent',null)
    this.commit('main/setglobalevent','insertAvito')
  },
  insertIPphoneItem({ commit }){
    commit('insertIPphoneItem');
    this.commit('main/setglobalevent',null)
    this.commit('main/setglobalevent','insertIPphone')
  },
  saveIPphoneItems({ commit }){
    this.commit('main/setglobalevent',null)
    this.commit('main/setglobalevent','saveIPphone')
    // @ts-ignore
    this.$api.post('/api/setings',{
      ipphones: this.getters['seting/IPphoneItems'],
      cianexport: this.getters['seting/cianItems'],
      avitoexport: this.getters['seting/avitoItems'],
    }).then((items:object) => {
      commit('setIPphoneItems', Object(items).data[0].ipphones);
      commit('setAvitoItems', Object(items).data[0].avitoexport);
      commit('setCianItems', Object(items).data[0].cianexport);
    })
  },
  saveCianItems({ commit }){
    this.commit('main/setglobalevent',null)
    this.commit('main/setglobalevent','saveCian')
    // @ts-ignore
    this.$api.post('/api/setings',{
      ipphones: this.getters['seting/IPphoneItems'],
      cianexport: this.getters['seting/cianItems'],
      avitoexport: this.getters['seting/avitoItems'],
    }).then((items:object) => {
      commit('setIPphoneItems', Object(items).data[0].ipphones);
      commit('setAvitoItems', Object(items).data[0].avitoexport);
      commit('setCianItems', Object(items).data[0].cianexport);
    })
  },
  saveAvitoItems({ commit }){
    this.commit('main/setglobalevent',null)
    this.commit('main/setglobalevent','saveAvito')
    // @ts-ignore
    this.$api.post('/api/setings',{
      ipphones: this.getters['seting/IPphoneItems'],
      cianexport: this.getters['seting/cianItems'],
      avitoexport: this.getters['seting/avitoItems'],
    }).then((items:object) => {
      commit('setIPphoneItems', Object(items).data[0].ipphones);
      commit('setAvitoItems', Object(items).data[0].avitoexport);
      commit('setCianItems', Object(items).data[0].cianexport);
    })
  }


}
