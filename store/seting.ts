import { GetterTree, ActionTree, MutationTree } from 'vuex'
import IPPhone from "~/model/ipphone";


export const state = () => ({
  IPphoneItems: [],
// @ts-ignore
  ipphone:new IPPhone(),
  name: 'Me',
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  name: state => state.name,
  IPphoneItems:state => state.IPphoneItems
}

// @ts-ignore
export const mutations: MutationTree<RootState> = {
  CHANGE_NAME: (state, newName: string) => (state.name = newName),
  // @ts-ignore
  setIPphoneItems: (state, value: Array<ipphone>) => (state.IPphoneItems = value),
  insertIPphoneItem: (state) => (
    // @ts-ignore
    state.IPphoneItems.push( new IPPhone('','', true))
  )
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchThings({ commit }) {
    const things = await this.$axios.$get('/things')
    console.log(things)
    commit('CHANGE_NAME', 'New name')
  },
}
