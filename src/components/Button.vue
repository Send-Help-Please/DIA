<script setup lang="ts">
defineOptions({ inheritAttrs: true });
</script>

<template>
    <button
        class="cursor-pointer opacity-70 hover:opacity-100 disabled:opacity-30 transition-opacity"
    >
        <slot></slot>
    </button>
</template>
