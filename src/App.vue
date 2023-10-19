<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
import Toast from './components/Toast.vue'
</script>

<template>
  <Header />
  <main class="pt-16">
    <RouterView />
    <Toast />
  </main>
</template>
