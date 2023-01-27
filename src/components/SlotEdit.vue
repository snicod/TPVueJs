<template>
  <div>
    <br>
    <table>
      <tr>
        <th>
          Objet pouvant être équipé V1
        </th>
      </tr>
      <tr>
        <td>
          <ul v-if="listItemSlot.length > 0">
            <li v-for="(itemAchete, index) in listItemSlot " :key="index">
              {{itemAchete.nom}}
              <button @click="equiperItem(itemAchete)"> Équiper </button>
            </li>
          </ul>
          <ul v-else>
            <li>
              Pas d'item pouvant être équipé
            </li>
          </ul>
        </td>
      </tr>
    </table>
    <br>
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
              <p> {{item.nom}}
                <button @click="enlever(currentEmplacement, item)">Enlever</button>
              </p>
            </li>
          </ul>
        </td>
      </tr>
    </table>
  </div>
</template>


<script>
import {mapState} from 'vuex'
import {itemLimits} from "@/services/data.service";
export default {
  name: "SlotEdit",
  props: ['slotName'],
  data: () => {
    return {itemLimits}
  },
  computed: {
    ...mapState(['currentPerso']),
    currentEmplacement() {
      switch (this.slotName) {
        case this.currentPerso.emplacements[0].nom :
          return this.currentPerso.emplacements[0]._id
        case this.currentPerso.emplacements[1].nom :
          return this.currentPerso.emplacements[1]._id
        case this.currentPerso.emplacements[2].nom :
          return this.currentPerso.emplacements[2]._id
        case this.currentPerso.emplacements[3].nom :
          return this.currentPerso.emplacements[3]._id
        default :
          return this.currentPerso.emplacements[4]._id
      }
    },
    listItemSlot() {
      if (this.currentPerso === null) return []
      console.log(this.slotName)
      let tab = []
      tab = this.currentPerso.itemsAchetes.filter(i => this.itemLimits.find( e => e.slot === this.slotName).types.includes(i.type))
      return tab
    },
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
    },
    equiperItem(index) {
      console.log(index)
      if (index !== null) {
        let test = confirm("Vous allez équiper cet item, voulez vous continuer ?")
        if (test) {
          this.$store.commit('equip', index)
        }
      } else {
        alert("Pas d'item sélectionné")
      }
    }
  }
}
</script>