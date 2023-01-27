<template>
  <div>
    <div style="text-align: left">
      <select v-model="currentShop" class="townselect" @change="setCurrentShop(currentShop)">
        <option disabled value="null">Sélectionner une boutique</option>
        <option :value="index" v-for="(boutique, index) in villes[idTown-1].rues[idStreet].boutiques" :key="index">{{boutique.nom}}</option>
      </select>
    </div>
    <router-view name="shops" style="text-align: right"></router-view>
  </div>
</template>


<script>
import {mapState} from 'vuex'
export default {
  name: "ShopsView",
  props: ['idTown', 'idStreet'],
  data: () => {
    return {currentShop: null}
  },
  computed: {
    ...mapState(['villes'])
  },
  watch: {
    idTown() {
      this.currentStreet = null
    }
  },
  methods: {
    setCurrentShop(index) {
      this.currentShop = this.villes[this.idTown-1].rues[this.idStreet].boutiques[index]
      this.$store.commit("setCurrentShop", this.currentShop)
    }
  }
}
</script>