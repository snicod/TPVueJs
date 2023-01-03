<template>
  <div>
    <v-btn v-for="(but, index) in titles" :key="index" :color="but.color" @click="$emit('menu-clicked', index)">
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