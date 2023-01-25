import Vue from 'vue'
import VueRouter from 'vue-router'
import TownsView from '../views/TownsView.vue'
import PersosView from "@/views/PersosView.vue";
import StreetsView from "@/components/StreetsView.vue";
import ShopsView from "@/components/ShopsView.vue";
import SlotEdit from "@/components/SlotEdit.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/towns',
    name: 'towns',
    components: {
      central: TownsView
    },
    children: [{
      path: ':idtown',
      name: 'streets',
      components: {
        streets: StreetsView
      },
      props: {
        streets: router => {return {idTown: router.params.idtown}}
      },
      children: [{
        path: 'street/:idstreet',
        name: 'shops',
        components: {
          shops: ShopsView
        },
        props: {
          shops: router => {return {idTown: router.params.idtown, idStreet: router.params.idstreet}}
        }
      }]
    }]
  },
  {
    path: '/persos',
    name: 'persos',
    components: {
      central: PersosView
    },
    children: [{
      path: 'slot/:name',
      name: 'slot',
      components: {
        slot: SlotEdit
      },
      props: {
        slot: router => {return {slotName: router.params.name}
        }
      }
    }]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router