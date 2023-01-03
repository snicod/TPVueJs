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
              :fields="['text']"
              :checked="checkedItemsStock"
              item-check
              :item-button="{show: true, text: 'acheter'}"
              :list-button="{show: true, text: 'acheter sélectionnés'}"
              @checked-changed="toggleItemStock"
              @item-button-clicked="buyOneItem"
              @list-button-clicked="buySelectedItems"
          >
          </CheckedList>
        </td>
        <td>
          <CheckedList
              :data="itemsCommande"
              :fields="['text']"
              :item-button="{show: true, text: 'commander'}"
              @item-button-clicked="orderOneItem"
          >
          </CheckedList>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import CheckedList from "@/components/CheckedList";
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
      return this.shop.itemCommande.map(e => ({text: e.nom+' : '+e.prix+' po'}) )
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
      console.log('achat de '+this.shop.itemStock[index].nom)
    },
    buySelectedItems() {
      console.log('achat des items d\'indice '+this.idSelectedItemsStock)
    },
    orderOneItem(index) {
      console.log('commande de '+this.shop.itemCommande[index].nom)
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