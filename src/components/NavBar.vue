<template>
  <div>
    <!--    <v-btn v-for="(but, index) in titles" :key="index" :color="but.color" @click="$router.push(but.path)">-->
    <!--      {{but.text}}-->
    <!--    </v-btn>-->
    <!--    <span v-for="(but, index) in titles" :key="index" :color="but.color" @click=goTo(index)">{{but.text}}</span>-->
    <span v-for="(but, index) in titles" :key="index" :style="{ color: but.color }" @click="goTo(index)">
      <slot name="link-to" :link="but">{{but.text}} </slot>
    </span>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: { titles: Array },
  methods: {
    goTo(index) {
      this.$router.push(this.titles[index].path)
    }
  }
}
</script>

<style scoped>

</style>