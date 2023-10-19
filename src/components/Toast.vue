<script setup lang="ts">
import toastStore from '@/stores/toast'

const toast = toastStore()
</script>

<template>
  <Teleport to="body">
    <ul v-if="toast.toasts.length" class="fixed bottom-[5%] right-[5%] z-40 min-w-44">
      <li
        v-for="item in toast.toasts"
        class="flex items-center gap-2 bg-green-500 text-white shadow-xl rounded-md mb-4 min-w-[200px] px-4 py-4 relative text-sm md:text-normal"
        :key="item.text"
      >
        <span> {{ item.text }}</span>
      </li>
    </ul>
  </Teleport>
</template>
