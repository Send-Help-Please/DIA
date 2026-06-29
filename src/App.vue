<script setup lang="ts">
import { RouterView } from 'vue-router';
import Modal from './components/Modal.vue';
import ToastContainer from './components/ToastContainer.vue';
</script>

<template>
    <div class="min-h-svh bg-bg text-text relative overflow-x-hidden">
        <RouterView />
        <Modal />
        <ToastContainer />
    </div>
</template>
