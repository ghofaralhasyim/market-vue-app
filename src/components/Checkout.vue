<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required, numeric, helpers } from '@vuelidate/validators'
import type { FormCheckout, OrderProduct, OrderState } from '@/types/types'
import { computed, reactive } from 'vue'
import { useOrder } from '@/stores/order'
import { useCart } from '@/stores/cart'
import { generateRandomID } from '@/utils/helpers'

import router from '@/router'

const props = defineProps({
  show: {
    required: true
  },
  product: {
    required: true,
    type: Array as () => OrderProduct[]
  }
})

const order = useOrder()
const cart = useCart()
const formData: FormCheckout = reactive({
  name: '',
  phone: ''
})

const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage('Nama wajib diisi.', required)
    },
    phone: {
      required: helpers.withMessage('Nomor hp wajib diisi', required),
      numeric: helpers.withMessage('Nomor hp tidak valid', numeric)
    }
  }
})

const v$ = useVuelidate(rules, formData)

const checkout = () => {
  v$.value.$validate()
  if (v$.value.$error) return

  const orderId = generateRandomID(12)

  let total: number = 0
  for (let i = 0; i < props.product.length; i++) {
    total += props.product[i].price * props.product[i].qty
  }

  const orderObj: OrderState = {
    id: orderId,
    total: total,
    date: new Date().toString(),
    products: props.product
  }

  order.addOrder(orderObj)
  cart.resetCart()

  router.push(`/order?q=${orderId}`)
}
</script>

<template>
  <div
    v-if="show"
    class="fixed px-4 lg:px-0 w-full min-h-screen left-0 top-0 z-30 flex items-center justify-center"
  >
    <div class="overlay w-full min-h-screen absolute left-0 top-0" @click="$emit('close')"></div>
    <form
      @submit.prevent="checkout"
      class="bg-white max-w-2xl w-full md:w-1/2 lg:w-1/3 px-4 py-8 rounded z-10"
    >
      <h1 class="font-semibold mb-4">Satu langkah lagi barangmu dikirim!</h1>
      <div class="flex flex-col w-full mb-2">
        <label for="name" class="w-full"
          ><span class="text-sm">Nama</span><span class="text-red-500">*</span>
          <input
            v-model.trim="v$.name.$model"
            id="name"
            name="name"
            type="text"
            class="border border-gray-200 w-full p-2 text-normal"
            :class="{ 'border-red-500': v$.name.$error }"
            placeholder="Masukan nama..."
            @blur="v$.name.$touch"
          />
        </label>
        <div v-if="v$.name.$error" class="text-sm text-red-500">
          {{ v$.name.$errors[0]?.$message }}
        </div>
      </div>
      <div class="flex flex-col w-full mb-2">
        <label for="name" class="w-full"
          ><span class="text-sm">No. handphone</span><span class="text-red-500">*</span>
          <input
            v-model.trim="v$.phone.$model"
            id="name"
            name="name"
            type="number"
            class="border border-gray-200 w-full p-2 text-normal"
            :class="{ 'border-red-500': v$.phone.$error }"
            placeholder="Masukan no. hp..."
            @blur="v$.phone.$touch"
          />
        </label>
        <div v-if="v$.phone.$error" class="text-sm text-red-500">
          {{ !v$.phone.isNumeric ? v$.phone.$errors[0].$message : v$.phone.$errors[1].$message }}
        </div>
      </div>
      <div class="flex gap-4 justify-end">
        <button class="py-1 px-4 bg-purple-500 text-white rounded mt-2">Confirm Checkout</button>
        <button
          class="py-1 px-4 border border-purple-500 text-purple-500 rounded mt-2"
          type="button"
          @click="$emit('close')"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.overlay {
  background-color: rgba($color: #000000, $alpha: 0.2);
}
</style>
