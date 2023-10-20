import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '@/views/Homepage.vue'
import Cart from '@/views/Cart.vue'
import Order from '@/views/Order.vue'
import Transaction from '@/views/Transaction.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Homepage
    },
     {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
     {
      path: '/order',
      name: 'order',
      component: Order
    },
     {
      path: '/transaksi',
      name: 'transaksi',
      component: Transaction
    },
  ]
})

export default router
