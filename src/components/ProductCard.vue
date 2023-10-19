<script setup lang="ts">
import { useCart } from '@/stores/cart'
import useToasterStore from '@/stores/toast'
import type { Product } from '@/types/types'
import type { PropType } from 'vue'

const toast = useToasterStore()
const cart = useCart()

const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true
  }
})

const addToCart = (id: number) => {
  cart.addToCart(id)
  toast.success({ text: 'Berhasil menambahkan produk ke cart' })
}
</script>

<template>
  <div class="col-span-6 lg:col-span-4">
    <RouterLink to="/" class="flex flex-col relative items-center max-w-xs mx-auto">
      <div class="bg-gray-100 py-4 rounded h-44 overflow-hidden">
        <img
          :src="product.image"
          class="object-contain max-h-44"
          :alt="product.title"
          width="288"
          height="320"
          loading="lazy"
        />
      </div>
      <p
        class="font-semibold py-2 text-left w-full max-w-xs text-ellipsis overflow-hidden max-h-14 max-h-auto"
      >
        {{ product.title }}
      </p>
      <div class="flex justify-between items-center w-full px-2 lg:px-0 lg:mt-2">
        <span class="text-xl font-semibold">${{ product.price }}</span>
        <button
          class="py-1 px-2 border border-gray-800 hover:bg-purple-500 hover:text-white hover:border-purple-600 text-sm flex gap-2"
          @click="addToCart(product.id)"
        >
          <v-icon name="io-cart-outline"></v-icon>
          <span class="hidden md:block">Add to cart</span>
        </button>
      </div>
    </RouterLink>
  </div>
</template>
