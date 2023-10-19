<script setup lang="ts">
import { useCart } from '@/stores/cart'
import type { Product, CartSummary, OrderProduct } from '@/types/types'
import { onMounted, reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import axios from 'axios'
import Checkout from '@/components/Checkout.vue'

const modalCheckout = ref(false)
const cart = useCart()
const dataProducts = ref<OrderProduct[]>([])
const summary = reactive<CartSummary>({
  qty: 0,
  total: 0
})

onMounted(() => {
  const promises = []
  for (let i = 0; i < cart.products.length; i++) {
    promises.push(
      axios.get<Product[], any>(`${import.meta.env.VITE_API_URL}/products/${cart.products[i].id}`)
    )
  }
  Promise.all(promises).then((res) => {
    for (let i = 0; i < res.length; i++) {
      dataProducts.value.push({
        ...res[i].data,
        qty: cart.products[i].qty
      })
      summary.qty += dataProducts.value[i].qty
      summary.total += dataProducts.value[i].price * dataProducts.value[i].qty
    }
  })
})

const decreaseQty = ({ index, id }: { id: number; index: number }) => {
  summary.total -= dataProducts.value[index].price
  summary.qty -= 1
  if (dataProducts.value[index].qty <= 1) {
    cart.removeFromCart(id)
    dataProducts.value.splice(index, 1)
  } else {
    cart.decreaseQty(id)
    dataProducts.value[index].qty -= 1
  }
}

const increaseQty = ({ index, id }: { id: number; index: number }) => {
  summary.total += dataProducts.value[index].price
  summary.qty += 1
  cart.addToCart(id)
  dataProducts.value[index].qty += 1
}

const removeFromCart = ({ index, id }: { id: number; index: number }) => {
  summary.total -= dataProducts.value[index].price * dataProducts.value[index].qty
  summary.qty -= dataProducts.value[index].qty
  cart.removeFromCart(id)
  dataProducts.value.splice(index, 1)
}
</script>

<template>
  <div class="container mx-auto px-4 lg:px-0 grid grid-cols-12 relative pt-4 lg:max-w-4xl">
    <section class="col-span-12">
      <h1 class="font-sans font-semibold text-2xl mb-4">Keranjang</h1>
      <ul v-if="dataProducts.length">
        <li v-for="(product, index) in dataProducts" :key="product.id" class="mb-8">
          <div class="flex gap-4">
            <div class="h-16 w-16">
              <img
                :src="product.image"
                class="h-16 w-16 object-contain rounded"
                width="64"
                height="64"
                :alt="product.title"
              />
            </div>
            <div>
              <h3 class="text-sm max-w-md">{{ product.title }}</h3>
              <span class="font-semibold">${{ product.price }}</span>
              <div class="flex gap-4">
                <button @click="removeFromCart({ index: index, id: product.id })">
                  <v-icon name="io-trash-outline"></v-icon>
                </button>
                <div class="flex gap-2">
                  <button @click="increaseQty({ index: index, id: product.id })">
                    <v-icon name="io-add-circle-outline"></v-icon>
                  </button>
                  <span>{{ product.qty }}</span>
                  <button @click="decreaseQty({ index: index, id: product.id })">
                    <v-icon name="io-remove-circle-outline"></v-icon>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div v-else class="py-4">
        <p class="mb-4">Whoops, keranjang kamu masih kosong.</p>
        <RouterLink to="/" class="py-1 px-4 bg-purple-500 text-white rounded"
          >Cari product</RouterLink
        >
      </div>
    </section>

    <section
      v-if="dataProducts.length"
      class="col-span-12 p-4 shadow rounded-md relative lg:w-[40%] lg:absolute lg:top-4 lg:right-0"
    >
      <h2 class="font-semibold">Ringkasan belanja</h2>
      <div class="flex justify-between py-4 border-b border-gray-200">
        <span class="text-gray-400">Total Qty</span>
        <span>{{ summary?.qty }}</span>
      </div>
      <div class="flex justify-between font-semibold py-4">
        <span>Total Harga</span>
        <span>${{ summary?.total.toFixed(2) }}</span>
      </div>
      <button class="py-1 px-4 bg-purple-500 text-white rounded" @click="modalCheckout = true">
        Checkout
      </button>
    </section>
    <Checkout :show="modalCheckout" :product="dataProducts" @close="modalCheckout = false" />
  </div>
</template>
