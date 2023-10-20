<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useCart } from '@/stores/cart'
import { ref } from 'vue'

const cart = useCart()
const show = ref(false)
</script>
<template>
  <header class="z-40 fixed top-0 left-0 bg-white h-16 w-full border-b border-gray-200">
    <div class="container mx-auto px-4 h-full flex justify-between items-center">
      <div class="font-extrabold">
        <button class="mr-4 md:hidden">
          <v-icon name="io-menu" @click="show = true"></v-icon>
        </button>
        <RouterLink to="/" class="">
          <span>Shop</span>
        </RouterLink>
      </div>
      <div
        class="absolute bg-white left-0 top-0 w-full min-h-screen -translate-x-full ease-in-out duration-300 md:translate-x-0 md:relative md:bg-transparent md:min-h-0 md:w-fit"
        :class="{ 'translate-x-0': show }"
      >
        <nav class="w-full px-4">
          <ul class="flex flex-col md:flex-row">
            <li class="p-4 md:hidden border-b border-gray-200">
              <button class="mr-4" @click="show = false">
                <v-icon name="io-arrow-forward" class="rotate-180" @click="show = true"></v-icon>
                <span class="ml-2">Back</span>
              </button>
            </li>
            <li class="p-4">
              <RouterLink to="/cart" class="relative" @click="show = false">
                <div
                  v-if="cart.products.length"
                  class="bg-red-500 w-2 h-2 rounded-full absolute left-0 top-0"
                ></div>
                <v-icon name="io-cart-outline"></v-icon> Cart
              </RouterLink>
            </li>
            <li class="p-4">
              <RouterLink to="/transaksi" class="relative" @click="show = false">
                <v-icon name="io-bag-check-outline"></v-icon> Transaksi
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>
