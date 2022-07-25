import { GetterTree, ActionTree, MutationTree } from 'vuex'
import IPPhone from "~/model/ipphone";


export const state = () => ({
  items: [{name:'ss',key:'ffff'},{name:'ss',key:'ffff'}],
// @ts-ignore
  ipphone:new IPPhone(),
  name: 'Me',
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  name: state => state.name,
  items:state => state.items
}

// @ts-ignore
export const mutations: MutationTree<RootState> = {
  CHANGE_NAME: (state, newName: string) => (state.name = newName),
  // @ts-ignore
  setItems: (state, value: Array<ipphone>) => (state.items = value)
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchThings({ commit }) {
    const things = await this.$axios.$get('/things')
    console.log(things)
    commit('CHANGE_NAME', 'New name')
  },
}
