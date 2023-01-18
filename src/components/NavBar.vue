<template>
  <div>
    <v-btn v-for="(but, index) in titles" :key="index" :color="but.color" @click="$router.push(but.path)">
      {{but.text}}
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: { titles: Array}
}
</script>

<style scoped>

</style>