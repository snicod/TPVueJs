<template>
  <v-container>
    <div style="display: flex">
      <!-- partie gauche -->
      <div style="text-align: left; width: 30%">
        <h1>Les personnages</h1>
        <select v-model="selected" class="persoselect" @change="setCurrentPerso(selected)">
          <option disabled value="">Sélectionner un personnage</option>
          <option v-for="(perso, index) in persos" :key="index" :value="perso">{{perso.nom}}</option>
        </select>
      </div>
      <!-- partie droite -->
      <div v-if="selected" style="text-align: left; width: 80%">
        <h1>{{selected.nom}}</h1>
        <table>
          <tr>
            <th>Attributs</th>
            <th>Emplacements</th>
          </tr>
          <tr>
            <td>
              <ul>
                <li>niveau : {{ selected.niveau}}</li>
                <li>vie : {{ selected.attributs.vie}}</li>
                <li>vitalité : {{ selected.attributs.vitalite}}</li>
                <li>force : {{ selected.attributs.force}}</li>
                <li>armure : {{ selected.attributs.protection}}</li>
              </ul>
            </td>
            <td>
              <ul>
                <li v-for="(slot, index) in slots" :key="index">
                  {{ slot.label }} <span v-if="slot.items.length >0">[{{slot.items.length}}]</span> :
                  <span v-for="(item, index) in slot.items" :key="index">{{item.nom}}, </span>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <td> or : {{selected.or}}</td>
            <td>
              <CheckedList
                  :data="selected.itemsAchetes"
                  :fields="['nom','type']"
                  :checked="checkedBoughtItems"
                  item-check
                  :item-button="{show: true, text: 'price'}"
                  :list-button="{show: true, text: 'Infos'}"
                  @checked-changed="toggleItem"
                  @item-button-clicked="showItemPrice"
                  @list-button-clicked="showItemsInfo"
              >
              </CheckedList>
            </td>
          </tr>
        </table>
        <br>
        <select v-model="itemSell" class="persoselect">
          <option disabled value="">Sélectionner un item à revendre</option>
          <option v-for="(itemAchete, index) in currentPerso.itemsAchetes" :key="index" :value="itemAchete">{{itemAchete.nom}}</option>
        </select>
        <button @click="sellItem(itemSell)"> Vendre </button>
      </div>
    </div>
  </v-container>

</template>

<script>

import {mapState} from 'vuex'
import CheckedList from "@/components/CheckedList";


export default {
  name: 'PersosView',
  components: {CheckedList},
  data: () => ({
    selected: null,
    itemSell: null,
    idSelectedBoughtItems: [], // ce tableau ne contient que les ids des items achetés sélectionnés.
  }),
  computed: {
    ...mapState(['persos', 'currentPerso']),
    checkedBoughtItems() {
      if (this.selected === null) return []
      // construit un tableau contenant autant de cases qu'il y a d'items achetés
      // chaque case contient true/false en fonction du fait que l'item est sélectionné ou non
      let tab = []
      for(let i=0;i<this.selected.itemsAchetes.length;i++) {
        if (this.idSelectedBoughtItems.includes(i)) tab.push(true)
        else tab.push(false)
      }
      return tab
    },
    // récupère la liste des emplacements du personnage courant afin de
    // les classer dans l'ordre qu'il convient pour l'affichage, avec le nom en français.
    slots() {
      if (this.selected) {
        let tab = [];
        let slot = this.selected.emplacements.find(s => s.nom === 'head')
        slot.label = 'tête'
        tab.push(slot)
        slot = this.selected.emplacements.find(s => s.nom === 'body')
        slot.label = 'corps'
        tab.push(slot)
        slot = this.selected.emplacements.find(s => s.nom === 'hands')
        slot.label = 'mains'
        tab.push(slot)
        slot = this.selected.emplacements.find(s => s.nom === 'belt')
        slot.label = 'ceinture'
        tab.push(slot)
        slot = this.selected.emplacements.find(s => s.nom === 'bag')
        slot.label = 'sac à dos'
        tab.push(slot)
        return tab
      }
      return []
    }
  },
  methods: {
    showItemPrice(index) {
      alert(this.selected.itemsAchetes[index].nom+' : '+ this.selected.itemsAchetes[index].prix)
    },
    showItemsInfo() {
      let items = ""
      this.idSelectedBoughtItems.forEach(e => items += ' '+this.selected.itemsAchetes[e].nom)
      alert(items)
    },
    toggleItem(index) {
      let id = this.idSelectedBoughtItems.indexOf(index)
      if (id === -1) {
        // ajoute index
        this.idSelectedBoughtItems.push(index)
      }
      else {
        // enleve index
        this.idSelectedBoughtItems.splice(id,1)
      }
    },
    setCurrentPerso(index) {
      console.log(this.$store.state.currentPerso)
      this.$store.commit('setCurrentPerso', index)
      console.log(this.$store.state.currentPerso.nom)
    },
    sellItem(index) {
      console.log(index)
      let random = (Math.random() * (0.9 - 0.4) + 0.4).toFixed(1);
      let newPrice = index.prix * random;
      let test = confirm("Vous allez vendre cet item à : "+newPrice+" golds, voulez vous continuer ?")
      if (test) {
        this.$store.commit('resell', {item: index, gold: newPrice })
      }
    }
  },
}
</script>

<style>
.persoselect {
  background-color: lightgray;
}
button {
  border: 1px solid #000;
  background-color: #000;
  color: #fff;
  border-radius: 10px;
  margin-left: 10px;
}

</style>