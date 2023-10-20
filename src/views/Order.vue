<script setup lang="ts">
import { useRoute, RouterLink } from 'vue-router'
import { useOrder } from '@/stores/order'
import type { OrderState } from '@/types/types'
import { onMounted, ref } from 'vue'
import { formatFullDate } from '@/utils/helpers'

const route = useRoute()
const order = useOrder()
const loading = ref(true)

let summary: OrderState | null = null

onMounted(() => {
  const obj = order.$state.find((item) => item.id === route.query.q)
  if (obj) {
    summary = obj
  } else {
    summary = null
  }
  loading.value = false
})
</script>

<template>
  <section
    v-if="!loading"
    class="container mx-auto max-w-2xl bg-white lg:shadow-lg p-4 mt-8 rounded flex flex-col items-center"
  >
    <div class="flex flex-col items-center justify-center text-green-500 gap-4 mb-4">
      <v-icon name="io-shield-checkmark-sharp" class="scale-150"></v-icon>
      <h1 class="font-bold">Order Berhasil</h1>
    </div>
    <p class="max-w-md text-center mb-4">
      Terima kasih atas kepercayaan Anda menggunakan platform ini.
    </p>
    <p class="mb-4">Order ID : {{ summary?.id }}</p>
    <p class="text-sm mb-2">Date: {{ summary ? formatFullDate(summary?.date) : '' }}</p>
    <div
      v-for="product in summary?.products"
      :key="product.id"
      class="text-sm flex justify-start mb-2"
    >
      <span>{{ product.qty + `x -` + product.title }}</span> -
      <span class="font-bold">${{ product.qty * product.price }}</span>
    </div>
    <div class="font-bold">
      <span>Total : ${{ summary?.total }}</span>
    </div>
    <RouterLink to="/transaksi" class="py-1 px-4 bg-purple-500 text-white rounded my-4"
      >Lihat riwayat transaksi</RouterLink
    >
  </section>
</template>
