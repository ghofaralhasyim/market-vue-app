import { defineStore } from 'pinia'
import type { OrderState } from '@/types/types'

export const useOrder = defineStore('order', {
    state: (): OrderState[] => [],
    actions: {
        addOrder(data: OrderState) {
            this.$state.push(data)
        }
    },
    persist: true
})