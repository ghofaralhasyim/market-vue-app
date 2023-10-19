import { defineStore } from 'pinia'

interface CartProduct {
  id: number,
  qty: number
}
interface CartState {
  products: CartProduct[];
}

export const useCart = defineStore('cart', {
   state: (): CartState => ({
        products: []
  }),
  actions: {
    addToCart(id: number) {
      const index = this.$state.products.findIndex(item => item.id === id)
      if (index !== -1) {
        this.$state.products[index].qty += 1
      } else {
        this.$state.products.push({id: id, qty: 1})
      }
    },
    removeFromCart(id: number) {
      const index = this.$state.products.findIndex(item => item.id === id)
      if(index !== -1) this.$state.products.splice(index,1)
    },
    decreaseQty(id: number) {
      const index = this.$state.products.findIndex(item => item.id === id)
      this.$state.products[index].qty -= 1
    },
    resetCart() {
      this.$state.products = []
    }
  },
  persist: true,
})