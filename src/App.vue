<script setup lang="ts">
import { RouterView } from 'vue-router'
import Modal from './components/Modal.vue'
import { Toaster } from '@/components/ui/sonner'
</script>

<template>
  <Toaster position="top-center" />
  <RouterView />
  <Modal />
</template>
