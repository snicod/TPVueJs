<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <NavBar :titles="titles" @menu-clicked="goTo"></NavBar>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import {mapActions} from 'vuex'
import NavBar from "@/components/NavBar";

export default {
  name: 'App',
  components: {NavBar},
  data: () => ({
    titles: [ {text:'Personnages', color: 'blue'},
      {text:'Villes', color: 'red'},
    ],
    currentIndex: -1
  }),
  methods: {
    ...mapActions(['getAllTowns', 'getAllCharacs']),
    goTo(index) {
      if (index !== this.currentIndex) {
        this.currentIndex = index
        if (index === 0) {
          this.$router.push('persos')
        } else if (index === 1) {
          this.$router.push('towns')
        }
      }
    }
  },
  mounted() {
    this.getAllTowns()
    this.getAllCharacs()
  }
};
</script>
