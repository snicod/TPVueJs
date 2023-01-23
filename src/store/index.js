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
    },
    stock (state, item) {
      state.currentShop.itemStock.push(item)
    },
    resell (state, data) {
      let ind = state.currentPerso.itemsAchetes.indexOf(data.item)
      state.currentPerso.itemsAchetes.splice(ind, 1)
      if (state.currentShop) {
        state.currentShop.itemStock.push(data.item)

      }
      state.currentPerso.or += data.gold
    },
    equip(state, item) {
      console.log(item.type)
      if (item.type === 'helmet' || item.type === 'crown') {
        if (state.currentPerso.emplacements[0].items.length === 0) {
          let ind = state.currentPerso.itemsAchetes.indexOf(item);
          state.currentPerso.itemsAchetes.splice(ind, 1)
          state.currentPerso.emplacements[0].items.push(item)
        }
        else
        {
          alert("limite d'équipement dépassée")
        }
      }
      if (item.type === 'armor'|| item.type === 'clothes') {
        if (state.currentPerso.emplacements[1].items.length === 0) {
          let ind = state.currentPerso.itemsAchetes.indexOf(item);
          state.currentPerso.itemsAchetes.splice(ind, 1)
          state.currentPerso.emplacements[1].items.push(item)
        }
        else
        {
          alert("limite d'équipement dépassée")
        }

      }
      if (item.type === 'weapon' || item.type === 'lighter') {
        if (state.currentPerso.emplacements[2].items.length < 2) {
          let ind = state.currentPerso.itemsAchetes.indexOf(item);
          state.currentPerso.itemsAchetes.splice(ind, 1)
          state.currentPerso.emplacements[2].items.push(item)
        }
        else
        {
          alert("limite d'équipement dépassée")
        }

      }
      if (item.type === 'weapon' || item.type === 'purse') {
        if (state.currentPerso.emplacements[3].items.length < 3) {
          let ind = state.currentPerso.itemsAchetes.indexOf(item);
          state.currentPerso.itemsAchetes.splice(ind, 1)
          state.currentPerso.emplacements[3].items.push(item)
        }
        else
        {
          alert("limite d'équipement dépassée")
        }

      }
      if (item.type === 'helmet' || item.type === 'crown' || item.type === 'clothes' || item.type === 'lighter' || item.type === 'potion' || item.type === 'spell' || item.type === 'food' || item.type === 'purse') {
        if (state.currentPerso.emplacements[4].items.length < 10) {
          let ind = state.currentPerso.itemsAchetes.indexOf(item);
          state.currentPerso.itemsAchetes.splice(ind, 1)
          state.currentPerso.emplacements[4].items.push(item)
        }
        else
        {
          alert("limite d'équipement dépassée")
        }
      }
    },
    enlever(state, data) {
      let ind = state.currentPerso.emplacements[data.index].items.indexOf(data.item);
      state.currentPerso.emplacements[data.index].items.splice(ind, 1)
      state.currentPerso.itemsAchetes.push(data.item)
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
    },
    async order(context, data) {
      setTimeout(() => {
        context.commit('stock', data.item);
      }, data.time);

    }
  }
})
