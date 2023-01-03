<template>
  <v-container>
    <div style="display: flex">
      <!-- partie gauche -->
      <div style="text-align: left; width: 30%">
        <h1>Les personnages</h1>
        <select v-model="selected" class="persoselect">
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
    idSelectedBoughtItems: [], // ce tableau ne contient que les ids des items achetés sélectionnés.
  }),
  computed: {
    ...mapState(['persos']),
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
    }
  },
}
</script>

<style>
.persoselect {
  background-color: lightgray;
}
</style>