<template>
  <v-container>
    <div style="display: flex">
      <!-- partie gauche -->
      <div style="text-align: left; width: 30%">
        <h1>Les personnages</h1>
        <select v-model="selected" class="persoselect" @change="setCurrentPerso(selected)">
          <option hidden value=null>Sélectionner un personnage</option>
          <option v-for="(perso, index) in persos" :key="index" :value="perso">{{perso.nom}}</option>
        </select>
      </div>
      <!-- partie droite -->
      <perso-caracs>
        <template v-slot:carac="{perso}">
          <div>
            Niveau : <v-icon v-for="lvl in perso.niveau" :key="lvl">mdi-star-four-points-outline</v-icon>
          </div>
          <div>
            HP :
            <div :style="{ width: perso.attributs.vie + 'px', height: '10px', backgroundColor: 'green', position: 'absolute'}"></div>
            <div :style="{ width: perso.attributs.vitalite + 'px', height: '10px', backgroundColor: 'red' }"></div>
          </div>
          <div>
            Force : {{perso.attributs.force}}
            <br>
            Protection : {{perso.attributs.protection}}
          </div>
        </template>

        <template v-slot:gold="{or}">
          {{convertToRomain(or)}}<v-icon>mdi-bitcoin</v-icon>
          <span></span>
        </template>

      </perso-caracs>

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
    convertToRomain(or) {
      let roman = "";
      let romanNumeral = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
      let decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];

      for (let i = 0; i < decimal.length; i++) {
        while (or >= decimal[i]) {
          roman += romanNumeral[i];
          or -= decimal[i];
        }
      }
      return roman;
    }
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