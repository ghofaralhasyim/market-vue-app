<script setup lang="ts">
import { useOrder } from '@/stores/order'
import { formatFullDate } from '@/utils/helpers'
import { RouterLink } from 'vue-router'

const order = useOrder()
</script>

<template>
  <section
    v-if="order.$state.length"
    class="container mx-auto max-w-2xl bg-white lg:shadow lg:mt-4 lg:mb-8 p-4 mt-2 rounded"
  >
    <h1 class="font-semibold text-2xl mb-4">Riwayat Transaksi</h1>
    <div v-for="item in order.$state" :key="item.id" class="flex flex-col gap-2 mb-2">
      <div class="w-full border-b border-gray-200 flex justify-between text-sm text-gray-400">
        <span>Order ID: {{ item.id }}</span>
        <span>Date {{ formatFullDate(item.date) }}</span>
      </div>
      <div v-for="product in item.products" :key="product.id" class="flex gap-2 mb-2">
        <div class="h-12 w-12">
          <img
            :src="product.image"
            class="h-12 w-12 object-containt rounded"
            :alt="product.title"
          />
        </div>
        <div>
          <h3 class="text-sm max-w-md">{{ product.title }}</h3>
          <p class="mt-1">
            <span class="font-semibold mr-2">${{ product.price }}</span
            ><span class="font-semibold">Qty: {{ product.qty }}</span>
          </p>
        </div>
      </div>
      <p class="font-semibold">Total: ${{ item.total }}</p>
    </div>
  </section>
  <section
    v-else
    class="container mx-auto max-w-2xl bg-white lg:shadow lg:mt-4 lg:mb-8 px-4 py-8 mt-2 rounded"
  >
    <h1 class="font-semibold text-2xl mb-4">Riwayat Transaksi</h1>
    <p class="mb-4">Whoops, riwayat transaksi kamu masih kosong.</p>
    <RouterLink to="/" class="py-1 px-4 bg-purple-500 text-white rounded"
      >Belanja sekarang</RouterLink
    >
  </section>
</template>
