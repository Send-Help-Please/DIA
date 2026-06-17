<!-- <template>
    <div class="text-md px-4 p-2 font-normal">
        <slot></slot>
    </div>
</template> -->

<script setup lang="ts">
withDefaults(defineProps<{ type?: 'normal' | 'iconOnly' | 'withIcon' }>(), {
    type: 'normal',
});
</script>

<template>
    <th>
        <div
            class="text-md px-4 p-2 font-normal"
            :class="
                type === 'iconOnly'
                    ? 'flex items-center justify-center'
                    : type === 'withIcon'
                      ? 'flex items-center gap-2'
                      : ''
            "
        >
            <slot></slot>
        </div>
    </th>
</template>
