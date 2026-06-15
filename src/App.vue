<script setup lang="ts">
import { RouterView } from 'vue-router';
import Modal from './components/Modal.vue';

</script>

<template>
  <div class="min-h-svh bg-mist-900 relative">
    <RouterView />
    <Modal />
  </div>
</template>