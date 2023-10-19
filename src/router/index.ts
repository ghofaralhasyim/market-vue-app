import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '@/views/Homepage.vue'
import Cart from '@/views/Cart.vue'
import Order from '@/views/Order.vue'

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
  ]
})

export default router
