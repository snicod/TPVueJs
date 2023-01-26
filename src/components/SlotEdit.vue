<template>
  <div>

    <table>
      <tr>
        <th>
          Objets équipés
        </th>
      </tr>
      <tr>
        <td>
          <ul v-if="currentPerso.emplacements[currentEmplacement-1].items.length===0">
            <li> Aucun item présent  </li>
          </ul>
          <ul v-else>
            <li v-for="(item, index) in currentPerso.emplacements[currentEmplacement-1].items" :key="index">
              <p> {{item.nom}}</p>
              <button @click="enlever(currentEmplacement, item)">Enlever</button>
            </li>
          </ul>
        </td>
      </tr>
    </table>
  </div>
</template>


<script>
import {mapState} from 'vuex'
export default {
  name: "SlotEdit",
  props: ['slotName'],
  data: () => {
    return {}
  },
  computed: {
    ...mapState(['currentPerso']),
    currentEmplacement() {
      switch (this.slotName) {
        case this.currentPerso.emplacements[0].label :
          return this.currentPerso.emplacements[0]._id
        case this.currentPerso.emplacements[1].label :
          return this.currentPerso.emplacements[1]._id
        case this.currentPerso.emplacements[2].label :
          return this.currentPerso.emplacements[2]._id
        case this.currentPerso.emplacements[3].label :
          return this.currentPerso.emplacements[3]._id
        default :
          return this.currentPerso.emplacements[4]._id
      }
    }
  },
  methods: {
    enlever(slot, index) {
      console.log(slot)
      /*
      switch (slot.label) {
        case 'tête':
          this.$store.commit('enlever', {item: index, index: 0});
          break
        case 'corps':
          this.$store.commit('enlever', {item: index, index: 1});
          break
        case 'mains':
          this.$store.commit('enlever', {item: index, index: 2});
          break
        case 'ceinture':
          this.$store.commit('enlever', {item: index, index: 3});
          break
        case 'sac à dos':
          this.$store.commit('enlever', {item: index, index: 4});
          break
      }
      this.$store.commit('enlever', index)
    }
    */
       this.$store.commit('enlever', {item: index, index: slot})
    }
  }
}
</script>