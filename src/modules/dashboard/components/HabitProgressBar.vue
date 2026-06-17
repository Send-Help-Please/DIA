<script setup lang="ts">
import { Square } from '@lucide/vue';

const props = withDefaults(
    defineProps<{
        progress: number;
        totalCubes?: number;
    }>(),
    { totalCubes: 10 },
);

function getFilledCubes(progress: number): number {
    return Math.floor(progress / props.totalCubes);
}
</script>

<template>
    <div class="flex items-center gap-2">
        <div class="flex items-center">
            <Square
                v-for="cube in props.totalCubes"
                :key="cube"
                :size="20"
                :fill="
                    cube <= getFilledCubes(progress) ? 'white' : 'transparent'
                "
                :class="
                    cube <= getFilledCubes(progress)
                        ? 'text-header'
                        : 'text-text'
                "
            />
        </div>

        {{ progress }}%
    </div>
</template>
