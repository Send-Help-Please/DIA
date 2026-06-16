<script setup lang="ts">
defineProps<{
  checked: boolean;
}>();

const emit = defineEmits<{
  toggle: [];
}>();
</script>

<template>
  <td class="border-r border-mist-700 p-2">
    <div class="flex items-center justify-center">
      <button
        class="cursor-pointer w-4 h-4 rounded-sm border border-mist-400 bg-none"
        :class="checked ? 'bg-mist-400' : ''"
        @click="emit('toggle')"
      />
    </div>
  </td>
</template>