<script setup lang="ts">
import { computed, ref } from 'vue';
import { Habit } from '../../../stores/useHabitsStore';
import { Check, X, Trash } from '@lucide/vue';
import { useIconComponent } from '../composables/useIconComponent.ts';
import { useModal } from '../../../composables/useModal.ts';

const props = defineProps<{ habits: Habit[] }>();
const emit = defineEmits<{ updateHabit: [habit: Habit], deleteHabit: [habit: Habit] }>();

const editingHabitId = ref<string | null>(null);
const draftTitle = ref('');
const draftIcon = ref<string>('');

const { pickIcon, confirm } = useModal();

const error = computed(() => {
  const title = draftTitle.value.trim();
  if (!title) return 'Title is required.';
  if (title.length < 2) return 'Title must be at least 2 characters.';
  if (title.length > 50) return 'Title must be 50 characters or less.';
  const duplicate = props.habits.some(
    h => h.id !== editingHabitId.value &&
         h.title.trim().toLowerCase() === title.toLowerCase()
  );
  if (duplicate) return 'Habit title already exists.';
  return '';
});

function startEdit(habit: Habit) {
  editingHabitId.value = habit.id;
  draftTitle.value = habit.title;
  draftIcon.value = habit.icon;
}

function cancelEdit() {
  editingHabitId.value = null;
  draftTitle.value = '';
  draftIcon.value = '';
}

function saveEdit(habit: Habit) {
  if (error.value) return;
  emit('updateHabit', {
    ...habit,
    title: draftTitle.value.trim(),
    icon: draftIcon.value || habit.icon,
  });
  cancelEdit();
}

async function deleteHabit(habit: Habit) {
  const ok = await confirm({ 
    title: 'Delete Habit', 
    message: 'Are you sure you want to delete this habit? This action cannot be reversed', 
    confirmButton: {
      text: 'Delete',
      danger: true
    }, 
  });
  if(ok) {
    emit('deleteHabit', habit);
  }
}

async function changeIcon() {
  const icon = await pickIcon(draftIcon.value);

  if (!icon) return;

  draftIcon.value = icon;
}
</script>

<template>
  <ul class="list-disc ml-12">
    <li v-for="habit in habits" :key="habit.id" class="my-4">

      <div v-if="editingHabitId === habit.id" class="flex flex-col gap-1">
        <div class="flex flex-col gap-4">
          <input
            v-model="draftTitle"
            class="border rounded px-2 py-1"
            autofocus
            @keyup.enter="saveEdit(habit)"
            @keyup.esc="cancelEdit"
          />

          <div class="flex gap-4 items-center justify-between">
            <div class="flex gap-4 items-center">
              <button
                type="button"
                class="text-green-600 font-bold cursor-pointer"
                :disabled="!!error"
                @click="saveEdit(habit)"
              >
                <Check />
              </button>
              <button
                type="button"
                class="text-red-600 font-bold cursor-pointer"
                @click="cancelEdit"
              >
                <X />
              </button>
            </div>

            <div class="relative">
              <button
                type="button"
                class="cursor-pointer"
                @click="changeIcon"
              >
                <!-- Resolve name → component only at render -->
                <component
                  :is="useIconComponent(draftIcon || habit.icon).component"
                  :size="20"
                />
              </button>
            </div>
          </div>
        </div>

        <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
      </div>

      <div v-else class="flex justify-between items-center">
        <button type="button" class="text-left cursor-pointer" @click="startEdit(habit)">
          {{ habit.title }}
        </button>
        <button type="button" class="cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
          <Trash :size="20" class="text-red-600" @click="deleteHabit(habit)" />
        </button>
      </div>
    </li>
  </ul>
</template>