<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { Check, X, Trash } from '@lucide/vue';
import { Habit } from '../../../stores/useHabitsStore';
import { useIconComponent } from '../composables/useIconComponent.ts';
import { useModal } from '../../../composables/useModal.ts';

const props = defineProps<{
  habit: Habit;
  editing: boolean;
  validateTitle: (id: string, title: string) => string;
}>();

const emit = defineEmits<{
  startEdit: [];
  cancelEdit: [];
  updateHabit: [habit: Habit];
  deleteHabit: [habit: Habit];
}>();

const draftTitle = ref('');
const draftIcon = ref('');

const { pickIcon, confirm } = useModal();

const error = computed(() =>
  props.editing ? props.validateTitle(props.habit.id, draftTitle.value) : ''
);

watch(
  () => props.editing,
  editing => {
    if (editing) {
      draftTitle.value = props.habit.title;
      draftIcon.value = props.habit.icon;
    } else {
      draftTitle.value = '';
      draftIcon.value = '';
    }
  },
  { immediate: true }
);

function saveEdit() {
  if (error.value) return;

  emit('updateHabit', {
    ...props.habit,
    title: draftTitle.value.trim(),
    icon: draftIcon.value || props.habit.icon,
  });

  emit('cancelEdit');
}

async function changeIcon() {
  const icon = await pickIcon(draftIcon.value);
  if (icon) draftIcon.value = icon;
}

async function deleteHabit() {
  const ok = await confirm({
    title: 'Delete Habit',
    message: 'Are you sure you want to delete this habit? This action cannot be reversed',
    confirmButton: {
      text: 'Delete',
      danger: true,
    },
  });

  if (ok) emit('deleteHabit', props.habit);
}
</script>

<template>
  <li class="my-4">
    <div v-if="editing" class="flex flex-col gap-1">
      <div class="flex flex-col gap-4">
        <input
          v-model="draftTitle"
          class="border rounded px-2 py-1"
          autofocus
          @keyup.enter="saveEdit"
          @keyup.esc="emit('cancelEdit')"
        />

        <div class="flex gap-4 items-center justify-between">
          <div class="flex gap-4 items-center">
            <button
              type="button"
              class="text-green-600 font-bold cursor-pointer disabled:opacity-50"
              :disabled="!!error"
              @click="saveEdit"
            >
              <Check />
            </button>

            <button
              type="button"
              class="text-red-600 font-bold cursor-pointer"
              @click="emit('cancelEdit')"
            >
              <X />
            </button>
          </div>

          <button type="button" class="cursor-pointer" @click="changeIcon">
            <component
              :is="useIconComponent(draftIcon || habit.icon).component"
              :size="20"
            />
          </button>
        </div>
      </div>

      <p v-if="error" class="text-sm text-red-600">
        {{ error }}
      </p>
    </div>

    <div v-else class="flex justify-between items-center">
      <button type="button" class="text-left cursor-pointer" @click="emit('startEdit')">
        {{ habit.title }}
      </button>

      <button
        type="button"
        class="cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
        @click="deleteHabit"
      >
        <Trash :size="20" class="text-red-600" />
      </button>
    </div>
  </li>
</template>