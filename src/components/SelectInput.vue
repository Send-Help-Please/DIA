<script setup lang="ts">
import { computed, ref } from "vue";
import ErrorText from "@/modules/dashboard/components/ErrorText.vue";
import { ChevronDown, ChevronUp } from "@lucide/vue";

const props = withDefaults(defineProps<{
  options: { label: string; value: string }[];
  label?: string;
  placeholder?: string;
  border?: boolean;
  validate?: (value: string) => string;
}>(), { border: true });

const value = defineModel<string>("value", {
  default: "",
});

const error = defineModel<string>("error", {
  default: "",
});

const isOpen = ref(false);

const selectedOption = computed(() => {
  return props.options.find(option => option.value === value.value);
});

function handleChange() {
    error.value = '';
    if(props.validate) {
        error.value = props.validate(value.value);
    }
}

function selectOption(optionValue: string) {
  value.value = optionValue;
  isOpen.value = false;
  handleChange();
}
</script>

<template>
  <div class="relative flex flex-col gap-2">
    <label v-if="label">
      {{ label }}
    </label>

    <button
      type="button"
      class="flex w-full items-center justify-between rounded-lg px-4 py-2 text-left cursor-pointer"
      :class="border ? 'border' : ''"
      @click="isOpen = !isOpen"
      @blur="isOpen = false"
    >
      <span>
        {{ selectedOption?.label ?? placeholder ?? "Select..." }}
      </span>

      <span>
        <ChevronDown v-if="!isOpen" />
        <ChevronUp v-else />
      </span>
    </button>

    <div
      v-if="isOpen"
      class="absolute top-full z-10 mt-1 w-full rounded-lg border bg-bg"
    >
      <button
        v-for="option in options"
        :key="option.value"
        type="button"
        class="block w-full px-4 py-2 text-left cursor-pointer font-medium"
        :class="selectedOption?.value === option.value ? 'text-card-bg' : ''"
        @mousedown.prevent="selectedOption?.value !== option.value && selectOption(option.value)"
      >
        {{ option.label }}
      </button>
    </div>

    <ErrorText v-if="error">
      {{ error }}
    </ErrorText>
  </div>
</template>