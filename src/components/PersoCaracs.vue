<template>
  <div v-if="currentPerso" style="text-align: left; width: 80%">
    <h1>{{currentPerso.nom}}</h1>
    <table>
      <tr>
        <th>Attributs</th>
        <th>Emplacements</th>
      </tr>
      <tr>
        <td>
          <ul>
            <li>niveau : {{ currentPerso.niveau}}</li>
            <li>vie : {{ currentPerso.attributs.vie}}</li>
            <li>vitalité : {{ currentPerso.attributs.vitalite}}</li>
            <li>force : {{ currentPerso.attributs.force}}</li>
            <li>armure : {{ currentPerso.attributs.protection}}</li>
          </ul>
        </td>
        <td>
          <ul>
            <li v-for="(slot, index) in slots" :key="index">
              <button @click="popSlot(slot.label)"> {{slot.label}}</button>
            </li>
          </ul>
        </td>
      </tr>
      <tr>
        <td> or : {{currentPerso.or}}</td>
        <td>
          <CheckedList
              :data="currentPerso.itemsAchetes"
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
    <button @click="equiperItem(itemSell)"> Équiper </button>

    <router-view name="slot" style="text-align: right"></router-view>
  </div>
</template>

<script>
import CheckedList from "./CheckedList.vue";
import {mapState} from "vuex";
export default {
  name: "PersoCaracs",
  components: {CheckedList},
  data() {
    return {
      idSelectedBoughtItems: [],
      itemSell: null,
    }
  },
  computed: {
    ...mapState(['currentPerso']),
    checkedBoughtItems() {
      if (this.currentPerso === null) return []
      // construit un tableau contenant autant de cases qu'il y a d'items achetés
      // chaque case contient true/false en fonction du fait que l'item est sélectionné ou non
      let tab = []
      for (let i = 0; i < this.currentPerso.itemsAchetes.length; i++) {
        if (this.idSelectedBoughtItems.includes(i)) tab.push(true)
        else tab.push(false)
      }
      return tab
    },
    slots() {
      if (this.currentPerso) {
        let tab = [];
        let slot = this.currentPerso.emplacements.find(s => s.nom === 'head')
        slot.label = 'tête'
        tab.push(slot)
        slot = this.currentPerso.emplacements.find(s => s.nom === 'body')
        slot.label = 'corps'
        tab.push(slot)
        slot = this.currentPerso.emplacements.find(s => s.nom === 'hands')
        slot.label = 'mains'
        tab.push(slot)
        slot = this.currentPerso.emplacements.find(s => s.nom === 'belt')
        slot.label = 'ceinture'
        tab.push(slot)
        slot = this.currentPerso.emplacements.find(s => s.nom === 'bag')
        slot.label = 'sac à dos'
        tab.push(slot)
        return tab
      }
      return []
    },
  },
  methods: {
    showItemPrice(index) {
      alert(this.currentPerso.itemsAchetes[index].nom + ' : ' + this.currentPerso.itemsAchetes[index].prix)
    },
    showItemsInfo() {
      let items = ""
      this.idSelectedBoughtItems.forEach(e => items += ' ' + this.currentPerso.itemsAchetes[e].nom)
      alert(items)
    },
    toggleItem(index) {
      let id = this.idSelectedBoughtItems.indexOf(index)
      if (id === -1) {
        // ajoute index
        this.idSelectedBoughtItems.push(index)
      } else {
        // enleve index
        this.idSelectedBoughtItems.splice(id, 1)
      }
    },
    sellItem(index) {
      console.log(index)
      let random = (Math.random() * (0.9 - 0.4) + 0.4).toFixed(1);
      let newPrice = index.prix * random;
      let test = confirm("Vous allez vendre cet item à : " + newPrice + " golds, voulez vous continuer ?")
      if (test) {
        this.$store.commit('resell', {item: index, gold: newPrice})
      }
    },
    equiperItem(index) {
      console.log(index)
      if (index !== null) {
        let test = confirm("Vous allez équiper cet item, voulez vous continuer ?")
        if (test) {
          this.$store.commit('equip', index)
        }
      } else {
        alert("Pas d'item sélectionné")
      }
    },
    enlever(slot, index) {
      switch (slot.label) {
        case 'tête':
          this.$store.commit('enlever', {item: index, index: 0});
          break
        case 'corps':
          this.$store.commit('enlever', {item: index, index: 1});
          break
        case 'mains':
          this.$store.commit('enlever', {item: index, index: 2});
          break
        case 'ceinture':
          this.$store.commit('enlever', {item: index, index: 3});
          break
        case 'sac à dos':
          this.$store.commit('enlever', {item: index, index: 4});
          break
      }
      this.$store.commit('enlever', index)
    },
    popSlot(name) {
      console.log(name)
      this.$router.push({name: 'slot', params: {name: name}})
    }
  }
}
</script>

<style scoped>

</style>