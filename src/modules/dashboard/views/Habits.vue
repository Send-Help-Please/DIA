<script setup lang="ts">
import { List, Plus, X } from '@lucide/vue';
import Section from '../../../components/Section.vue';
import HeaderText from '../components/HeaderText.vue';
import GuideText from '../components/GuideText.vue';
import HabitsList from '../components/HabitsList.vue';
import { Habit } from '../../../stores/useHabitsStore.ts';
import { computed, ref } from 'vue';
import { useIconComponent } from '../composables/useIconComponent.ts';
import { useModal } from '../../../composables/useModal.ts';

const props = defineProps<{ 
    habits: Habit[], 
    updateHabit: (habit: Habit) => void, 
    saveHabit: (habit: Omit<Habit, 'logs' | 'id'>) => void,
    deleteHabit: (habit: Habit) => void 
}>();


const handleHabitUpdate = (habit: Habit) => {
    props.updateHabit(habit);
}

const handleHabitDelete = (habit: Habit) => {
    props.deleteHabit(habit);
}

const creating = ref(false);
const draftTitle = ref<string>('');
const draftIcon = ref<string>('');

const { pickIcon } = useModal();

const error = computed(() => {
  const title = draftTitle.value.trim();
  if (!title) return 'Title is required.';
  if (title.length < 2) return 'Title must be at least 2 characters.';
  if (title.length > 50) return 'Title must be 50 characters or less.';
  const duplicate = props.habits.some(
    h => h.title.trim().toLowerCase() === title.toLowerCase()
  );
  if (duplicate) return 'Habit title already exists.';
  return '';
});

function startEdit() {
  creating.value = true;
}

function cancelEdit() {
  draftTitle.value = '';
  draftIcon.value = '';
  creating.value = false;
}

function saveEdit(habit: Omit<Habit, 'id' | 'logs'>) {
  if (error.value) return;
  props.saveHabit(habit);
  cancelEdit();
}

async function changeIcon() {
  const icon = await pickIcon(draftIcon.value);

  if (!icon) return;

  draftIcon.value = icon;
}
</script>

<template>
    <Section class="flex flex-col gap-4 w-full text-white">
        <GuideText>Progress not Perfection</GuideText>

        <Section class="rounded-md p-8 px-6 flex flex-col gap-4 bg-mist-800">
            <div class="flex justify-between items-center">
                <HeaderText>
                    <List /> Habit List
                </HeaderText>

                <button @click="creating ? cancelEdit() : startEdit()" class="cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
                    <X v-if="creating" />
                    <Plus v-else />
                </button>
            </div>

            <div v-if="creating" class="flex flex-col gap-4">
                <input
                    v-model="draftTitle"
                    class="border rounded px-2 py-1"
                    autofocus
                    @keyup.enter="saveEdit({ title: draftTitle, icon: draftIcon })"
                    @keyup.esc="cancelEdit"
                />

                <p v-if="error" class="text-red-400">{{ error }}</p>

                <div class="flex gap-4 items-center justify-between">
                    <div class="flex gap-4 items-center">
                    <button
                        type="button"
                        class="cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
                        :disabled="!!error"
                        @click="saveEdit({ title: draftTitle, icon: draftIcon })"
                    >
                        Add
                    </button>
                    </div>

                    <div class="relative">
                        <button
                            type="button"
                            class="cursor-pointer"
                            @click="changeIcon"
                        >
                            <component
                            :is="useIconComponent(draftIcon).component"
                            :size="20"
                            />
                        </button>
                    </div>
                </div>
            </div>
            
            <HabitsList :habits="habits" @update-habit="handleHabitUpdate" @delete-habit="handleHabitDelete" />
        </Section>
    </Section>
</template>