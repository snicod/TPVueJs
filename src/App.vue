<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <NavBar :titles="titles"></NavBar>
    </v-app-bar>

    <v-main>
      <router-view name="central"></router-view>
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
    titles: [ {text:'Personnages', color: 'blue', path: '/persos'},
              {text:'Villes', color: 'red', path: '/towns'}
            ]
  }),
  methods: {
    ...mapActions(['getAllTowns', 'getAllCharacs'])
  },
  mounted() {
    this.getAllTowns()
    this.getAllCharacs()
  }
};
</script>
