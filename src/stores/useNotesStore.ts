import { Note } from '@/types/Note';
import { defineStore } from 'pinia';
import { ref } from 'vue';

const generateId = () => {
    return `note-${Math.floor(Math.random() * 10000)}`;
};

export const useNotesStore = defineStore('notes', () => {
    const notes = ref<Note[]>([]);

    const addNote = (date: Date, note: string) => {
        notes.value.push({ id: generateId(), date, note });
    };

    const editNote = (note: Note) => {
        const i = notes.value.findIndex((curr) => curr.id === note.id);
        if (i < 0) return;

        notes.value[i] = note;
    };

    const removeNote = (note: Note) => {
        notes.value = notes.value.filter((curr) => curr.id !== note.id);
    };

    return {
        notes,

        addNote,
        editNote,
        removeNote,
    };
});
