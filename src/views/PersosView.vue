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
      <perso-caracs></perso-caracs>

    </div>
  </v-container>

</template>

<script>

import {mapState} from 'vuex'
import PersoCaracs from "@/components/PersoCaracs.vue";


export default {
  name: 'PersosView',
  components: {PersoCaracs},
  data: () => ({
    selected: null,
  }),
  computed: {
    ...mapState(['persos', 'currentPerso']),
  },
  methods: {
    setCurrentPerso(index) {
      console.log(this.$store.state.currentPerso)
      this.$store.commit('setCurrentPerso', index)
      console.log(this.$store.state.currentPerso.nom)
    },
  }
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