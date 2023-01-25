<template>
  <v-container>
    <div style="display: flex">
      <!-- partie gauche -->
      <div style="text-align: left; width: 30%">
        <h1>Les villes</h1>
        <!--        <select v-model="currentTown" class="townselect" @change="setCurrentTown(currentTown)">-->
        <!--        <select v-model="currentTown" class="townselect" @change="$router.push({name: 'streets', params:{ idtown: currentTown }})">-->
        <select v-model="currentTown" class="townselect" @change="townSelected(currentTown)">
          <option hidden value=null>Sélectionner une ville</option>
          <option :value="ville" v-for="(ville, index) in villes" :key="index">{{ville.nom}}</option>
        </select>
        <router-view name="streets"></router-view>

        <!--        <label for="filteractive">filtrage possible : </label>-->
        <!--        <input type="checkbox" v-model="filterActive" id="filteractive">-->
        <!--        <div v-if="filterActive">-->
        <!--          <label for="filtertown">filtre : </label>-->
        <!--          <input class="townselect" :value="filter" @input="townSelected($event.target.value)" id="filtertown">-->
        <!--        </div>-->
        <!--        <ul v-for="(ville, index) in villesFiltre" :key="index">-->
        <!--&lt;!&ndash;          <li v-for="(ville, index) in villesFiltre" :key="index">&ndash;&gt;-->
        <!--            <label>-->
        <!--              <input type="radio" v-model="selectedTownIndex" :value="index" @change="setCurrentTown(index)"> {{ville.nom}}-->
        <!--            </label>-->
        <!--&lt;!&ndash;          </li>&ndash;&gt;-->
        <!--        </ul>-->
      </div>
      <!-- partie droite -->
      <!--      <div v-if="currentTown" style="text-align: left; width: 80%">-->
      <!--        <h1>{{currentTown.nom}}</h1>-->
      <!--        <table>-->
      <!--          <tr>-->
      <!--          <th>rues: {{currentTown.rues.length}}</th>-->
      <!--          <th>boutiques</th>-->
      <!--          </tr>-->
      <!--          <tr v-for="(street, index) in currentTown.rues" :key="index">-->
      <!--            <td>-->
      <!--              {{street.nom}} : {{ street.boutiques.length }} boutiques-->
      <!--            </td>-->
      <!--            <td>-->
      <!--              <CheckedList-->
      <!--                  :data="street.boutiques"-->
      <!--                  :fields="['nom']"-->
      <!--                  :item-button="{show: true, text: 'select'}"-->
      <!--                  @item-button-clicked="shopSelected(index, $event)"-->
      <!--              >-->
      <!--              </CheckedList>-->
      <!--            </td>-->
      <!--          </tr>-->
      <!--        </table>-->
      <!--        <ShopDetails :shop="currentShop"></ShopDetails>-->
      <!--      </div>-->
      <ShopDetails :shop="currentShop"></ShopDetails>
      <!--      <Shop v-if="currentShop !== null"></Shop>-->
    </div>

  </v-container>
</template>

<script>
// import CheckedList from "@/components/CheckedList";
import ShopDetails from "@/components/ShopDetails";
import {mapState} from 'vuex'
export default {
  name: 'TownsView',
  components: {ShopDetails},
  data: () => ({
    // filter: '',
    // filterActive: false,
    currentTown: null
  }),
  computed: {
    ...mapState(['villes']),
    currentShop() {
      return this.$store.state.currentShop
    },
    // villesFiltre() {
    //   if (this.filterActive) {
    //     return this.villes.filter(v => v.nom.includes(this.filter))
    //   }
    //   else {
    //     return this.villes
    //   }
    // },
    // currentTown() {
    //   if (this.villesFiltre.length === 1) {
    //     return this.villesFiltre[0]
    //   }
    //   else {
    //     return null
    //   }
    // }
  },
  methods: {
    townSelected(currentTown) {
      // this.filter = currentTown
      this.$router.push({name: 'streets', params:{idtown: currentTown._id}})
      this.$store.commit("setCurrentShop", null) // pour enlever la boutique courante affichée si on change de ville
      console.log(currentTown)
    },
    shopSelected(streetIndex, shopIndex) {
      this.currentShop = this.currentTown.rues[streetIndex].boutiques[shopIndex]
      this.$store.commit("setCurrentShop", this.currentShop)
    },
    setCurrentTown(index) {
      this.$store.commit("setCurrentTown", this.villes[index._id])
      console.log(index)
      console.log(this.villes[index._id])
      console.log(this.villes)
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