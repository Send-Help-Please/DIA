<script setup lang="ts">
import Button from '@/components/Button.vue';

defineProps<{
    checked: boolean;
}>();

const emit = defineEmits<{
    toggle: [];
}>();
</script>

<template>
    <div class="flex items-center justify-center">
        <Button
            class="w-4 h-4 rounded-sm border border-text bg-none"
            :class="checked ? 'bg-text' : ''"
            @click="emit('toggle')"
        />
    </div>
</template>
