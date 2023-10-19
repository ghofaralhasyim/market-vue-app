<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Product } from '@/types/types'
import { dataHighlight } from '@/constant/data'
import axios from 'axios'
import ProductCard from '@/components/ProductCard.vue'

const dataProducts = ref<Product[]>()
const loading = ref(true)

onMounted(() => {
  axios.get<Product[], any>(`${import.meta.env.VITE_API_URL}/products?limit=9`).then((res) => {
    dataProducts.value = res.data
  })
  loading.value = false
})
</script>

<template>
  <div class="container mx-auto px-4 mb-12">
    <section class="">
      <h1 class="font-sans font-semibold text-3xl py-8">Upcoming Product</h1>
      <div class="grid grid-cols-12 gap-4 items-start">
        <div
          v-for="product in dataHighlight"
          :key="product.id"
          class="col-span-4 flex flex-col justify-center relative"
        >
          <img
            :src="product.image"
            class="object-cover w-full h-80 rounded-xl"
            :alt="product.title"
            width="288"
            height="320"
          />
          <div class="py-2">
            <span class="font-semibold">{{ product.title }}</span>
          </div>
        </div>
      </div>
    </section>
    <section>
      <h1 class="font-sans font-semibold text-3xl py-8">Checkout Our Modern Brands</h1>
      <div v-if="!loading" class="grid grid-cols-12 gap-x-4 gap-y-8 my-4">
        <ProductCard v-for="product in dataProducts" :key="product.id" :product="product" />
      </div>
    </section>
  </div>
</template>
