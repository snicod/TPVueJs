import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import TownService from '../services/towns.service'
import CharacService from '../services/persos.service'

export default new Vuex.Store({
  // state = les données centralisées
  state: () => ({
    villes: [],
    persos: [],
    currentPerso: null,
    currentShop: null
  }),
  getters: {
    getCurrentGold(state) {
      if (state.currentPerso !== null) {
        return state.currentPerso.or;
      }
      return 0;
    }
  },
  // mutations = fonctions synchrones pour mettre à jour le state (!!! interdit de modifier directement le state)
  mutations: {
    updateVilles(state, villes) {
      state.villes = villes
    },
    updatePersos(state, persos) {
      state.persos = persos
    },
    setCurrentPerso(state, perso) {
      state.currentPerso = perso
    },
    setCurrentShop(state, shop) {
      state.currentShop = shop
    },
    sell(state, item) {
      if (state.currentPerso !== null) {
        state.currentPerso.itemsAchetes.push(item)
        let ind = state.currentShop.itemStock.indexOf(item)
        state.currentShop.itemStock.splice(ind, 1)
        state.currentPerso.or -= item.prix
        console.log(state.currentPerso.or+" or restant")
      }

    }
  },
  // actions = fonctions asynchrone pour mettre à jour le state, en faisant appel aux mutations, via la fonction commit()
  actions: {
    async getAllTowns({commit}) {
      console.log('récupération des villes');
      let response = await TownService.getAllTowns()
      if (response.error === 0) {
        commit('updateVilles', response.data)
      }
      else {
        console.log(response.data)
      }
    },
    async getAllCharacs({commit}) {
      console.log('récupération des personnages');
      let response = await CharacService.getAllCharacs()
      if (response.error === 0) {
        commit('updatePersos', response.data)
      }
      else {
        console.log(response.data)
      }
    }
  }
})
