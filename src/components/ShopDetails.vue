<template>
  <div>
    <table v-if="shop">
      <tr>
        <td colspan="2">{{shop.nom}}</td>
      </tr>
      <tr>
        <td>Stock : {{shop.itemStock.length}} items</td>
        <td>Sur commande : {{shop.itemCommande.length}} items</td>
      </tr>
      <tr>
        <td>
          <CheckedList
              :data="itemsStock"
              :checked="checkedItemsStock"
              item-check
              :item-button="true"
              :list-button="true"
              @checked-changed="toggleItemStock"
              @item-button-clicked="buyOneItem"
              @list-button-clicked="buySelectedItems"
          >
            <template v-slot:item="{item}">
              <span>{{item.text}}</span>
            </template>

            <template v-slot:item-button="{indexRow}">
              <v-btn v-if="indexRow%2 === 0" color="red">Buy</v-btn>
              <v-btn v-else color="blue">Buy</v-btn>
            </template>

            <template v-slot:list-button>
              <v-btn color="green">Buy all</v-btn>
            </template>
          </CheckedList>

        </td>
        <td>
          <CheckedList
              :data="itemsCommande"
              :item-button="true"
              @item-button-clicked="orderOneItem"
          >

            <template v-slot:item="{item}">
              <span>{{item.text}}</span>
            </template>

            <template v-slot:item-button="{item}">
              <v-btn :color="item.color">Order</v-btn>
            </template>
          </CheckedList>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import CheckedList from "@/components/CheckedList";
import {itemCats} from "@/services/data.service"
export default {
  name: "ShopDetails",
  components: {CheckedList},
  props: {
    shop: Object
  },
  data: () => ({
    idSelectedItemsStock: []
  }),
  computed: {
    checkedItemsStock() {
      let tab = []
      for(let i=0;i<this.shop.itemStock.length;i++) {
        if (this.idSelectedItemsStock.includes(i)) tab.push(true)
        else tab.push(false)
      }
      return tab
    },
    // d'après l'énoncé, chaque item apparaît sous la forme nom : prix po.
    // il n'est donc pas possible d'utiliser directement les champs d'un item dans CheckedList,
    // puisque les : et le po sont des données statiques externes aux tableaux d'items de la boutique.
    // C'est pourpqui les 2 fonctions suivantes recalculent un noveau tableau avec le texte qui va bien.
    itemsStock() {
      return this.shop.itemStock.map(e => ({text: e.nom+' : '+e.prix+' po'}) )
    },
    itemsCommande() {

      let delai = []
      for (let i = 0 ; i < this.shop.itemCommande.length ; i++) {
        delai.push(this.calculDelai())
      }

      return this.shop.itemCommande.map(e => ({
        delai: delai[this.shop.itemCommande.indexOf(e)],
        text: e.nom+' : '+delai[this.shop.itemCommande.indexOf(e)]+' délai_commande',
        color: this.assigneCouleur(e.type)
      }) )
    }
  },
  methods: {
    toggleItemStock(index) {
      let id = this.idSelectedItemsStock.indexOf(index)
      if (id === -1) {
        // ajoute index
        this.idSelectedItemsStock.push(index)
      }
      else {
        // enleve index
        this.idSelectedItemsStock.splice(id,1)
      }
    },
    buyOneItem(index) {
      if (this.$store.state.currentPerso) {
        let gold = this.$store.getters.getCurrentGold
        if (this.shop.itemStock[index].prix < gold) {
          console.log('achat de '+this.shop.itemStock[index].nom)
          this.$store.commit('sell', this.shop.itemStock[index])
        }
        else {
          alert("Le personnage n'a plus assez de Gold")
        }
      }
    },
    buySelectedItems() {
      console.log('achat des items d\'indice '+this.idSelectedItemsStock)
      this.idSelectedItemsStock.reverse().forEach( index => {
        this.buyOneItem(index)
      })
    },
    calculDelai() {
      let random = Math.floor(Math.random() * (10000 - 2000 + 1)) + 2000;
      return random
    },

    orderOneItem(index) {
      console.log(index)
      let test = confirm("Le temps de commande est de : "+this.itemsCommande[index].delai+" ms, voulez vous continuer ?")
      if (test) {
        this.$store.dispatch('order', {time : this.itemsCommande[index].delai, item: this.shop.itemCommande[index]})
      }
    },
    assigneCouleur(categorie) {
      let color = ["blue", "green", "purple", "yellow", "pink", "brown", "red", "orange", "grey", "white"]
      let cat = itemCats.indexOf(categorie)
      return color[cat]
    }
  },
  watch: {
    // Si on change de boutique, le tableau idSelectedItemStock ne va pas changer.
    // Il y a donc toujours des items sélectionnés quand on clique sur une nouvelle boutique.
    // Cela peut amener une erreur si leur indice n'existe pas. Il faut donc vider ce tableau,
    // mais comme c'est une variable locale, le seul moyen de le modifier "simplement" en cas
    // de changement de boutique, c'est d'observer un changement de la props shop grâce à un watcher.
    shop() {
      this.idSelectedItemsStock.splice(0)
    }
  }
}
</script>

<style scoped>

</style>