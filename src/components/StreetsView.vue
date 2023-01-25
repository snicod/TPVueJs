<template>
  <div>
    <div style="text-align: left">
      <select v-model="currentStreet" class="townselect" @change="$router.push({name: 'shops', params:{ idtown: idTown, idstreet: currentStreet}})">
        <option hidden value=null>Sélectionner une rue</option>
        <option :value="index" v-for="(rue, index) in villes[idTown].rues" :key="index">{{rue.nom}}</option>
      </select>
    </div>
    <router-view name="shops" style="text-align: right"></router-view>
  </div>
</template>


<script>
import {mapState} from 'vuex'
export default {
  name: "StreetsView",
  props: ['idTown'],
  data: () => {
    return {currentStreet: null}
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
    setCurrentStreet(index) {
      this.$store.commit("setCurrentStreet", this.rues[index._id])
    }
  },
  created() {
    console.log(this.villes)
  }
}
</script>