<script setup lang="ts">
import { List, Plus, X } from '@lucide/vue';
import Section from '@/components/Section.vue';
import HeaderText from '@/components/HeaderText.vue';
import GuideText from '../components/GuideText.vue';
import HabitsList from '../components/HabitsList.vue';
import { ref } from 'vue';
import Button from '@/components/Button.vue';
import { Habit } from '@/types/Habit.ts';
import HabitForm from '../components/HabitForm.vue';
import { validateNewHabitTitle } from '../validations/habitTitleValidation.ts';
import { useToast } from '@/composables/useToast.ts';

const props = defineProps<{
    habits: Habit[];
    updateHabit: (habit: Habit) => Promise<void>;
    saveHabit: (habit: Omit<Habit, 'logs' | 'id'>) => Promise<void>;
    deleteHabit: (habit: Habit) => Promise<void>;
}>();

const toast = useToast();

const handleHabitUpdate = async (habit: Habit) => {
    await props.updateHabit(habit);
};

const handleHabitDelete = async (habit: Habit) => {
    await props.deleteHabit(habit);
    console.log("habit deleted");
    toast.info("Haha");
};

const creating = ref(false);
const draftTitle = ref<string>('');
const draftIcon = ref<string>('');

function startEdit() {
    creating.value = true;
}

function cancelEdit() {
    draftTitle.value = '';
    draftIcon.value = '';
    creating.value = false;
}

function validateTitle(title: string) {
    return validateNewHabitTitle(title, props.habits);
}
</script>

<template>
    <Section class="flex flex-col gap-4 w-full">
        <GuideText class="text-header">Progress not Perfection</GuideText>

        <Section class="rounded-md p-8 px-6 flex flex-col gap-4 bg-card-bg">
            <div class="flex justify-between items-center">
                <HeaderText class="flex items-center gap-2"> <List /> Habit List </HeaderText>

                <Button
                    @click="creating ? cancelEdit() : startEdit()"
                    class="text-header"
                >
                    <X v-if="creating" />
                    <Plus v-else />
                </Button>
            </div>

            <HabitForm
                v-if="creating"
                submit-text="Add"
                :validate="validateTitle"
                @submit="saveHabit"
                @cancel="cancelEdit"
            />

            <HabitsList
                :habits="habits"
                @update-habit="handleHabitUpdate"
                @delete-habit="handleHabitDelete"
            />
        </Section>
    </Section>
</template>
