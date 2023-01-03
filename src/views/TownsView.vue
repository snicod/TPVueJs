<template>
  <v-container>
    <div style="display: flex">
      <!-- partie gauche -->
      <div style="text-align: left; width: 30%">
        <h1>Les villes</h1>
        <label for="filteractive">filtrage possible : </label><input type="checkbox" v-model="filterActive" id="filteractive">
        <div v-if="filterActive">
          <label for="filtertown">filtre : </label><input class="townselect" :value="filter" @input="townSelected($event.target.value)" id="filtertown">
        </div>
        <ul>
          <li v-for="(ville, index) in villesFiltre" :key="index">{{ville.nom}}</li>
        </ul>
      </div>
      <!-- partie droite -->
      <div v-if="currentTown" style="text-align: left; width: 80%">
        <h1>{{currentTown.nom}}</h1>
        <table>
          <tr>
          <th>rues: {{currentTown.rues.length}}</th>
          <th>boutiques</th>
          </tr>
          <tr v-for="(street, index) in currentTown.rues" :key="index">
            <td>
              {{street.nom}} : {{ street.boutiques.length }} boutiques
            </td>
            <td>
              <CheckedList
                  :data="street.boutiques"
                  :fields="['nom']"
                  :item-button="{show: true, text: 'select'}"
                  @item-button-clicked="shopSelected(index, $event)"
              >
              </CheckedList>
            </td>
          </tr>
        </table>
        <ShopDetails :shop="currentShop"></ShopDetails>
      </div>
    </div>
  </v-container>
</template>

<script>
import CheckedList from "@/components/CheckedList";
import ShopDetails from "@/components/ShopDetails";
import {mapState} from 'vuex'
export default {
  name: 'TownsView',
  components: {CheckedList, ShopDetails},
  data: () => ({
    filter: '',
    filterActive: false,
    currentShop: null,
  }),
  computed: {
    ...mapState(['villes']),
    villesFiltre() {
      if (this.filterActive) {
        return this.villes.filter(v => v.nom.includes(this.filter))
      }
      else {
        return this.villes
      }
    },
    currentTown() {
      if (this.villesFiltre.length === 1) {
        return this.villesFiltre[0]
      }
      else {
        return null
      }
    }
  },
  methods: {
    townSelected(evt) {
      this.filter = evt
      this.currentShop = null // pour enlever la boutique courante affichée si on change de ville
    },
    shopSelected(streetIndex, shopIndex) {
      this.currentShop = this.currentTown.rues[streetIndex].boutiques[shopIndex]
    }
  },
}
</script>

<style>
table, th, td {
  border: 1px solid;
}
 .townselect {
   background-color: lightgray;
 }
</style>
