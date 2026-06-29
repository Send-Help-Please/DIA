import { Note } from '@/types/Note';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useProfileStore } from './useProfileStore';
import { noteService } from '@/services/noteService';

export const useNotesStore = defineStore('notes', () => {
    const notes = ref<Note[]>([]);
    const loaded = ref<boolean>(false);
    const profileId = useProfileStore().profileId;

    const loadNotes = async () => {
        if(loaded.value) return;
        
        notes.value = await noteService.listNotes({ profileId });
    }

    const createNote = async (note: Omit<Note, "id">) => {
        const result = await noteService.createNote({ ...note, profileId });
        notes.value.push(result);
    }

    const editNote = async (note: Note) => {
        const i = notes.value.findIndex((curr) => curr.id === note.id);
        if (i < 0) return;

        const result = await noteService.editNote({ ...note, profileId, noteId: note.id });
        notes.value[i] = result;
    }

    return {
        notes,

        loadNotes,
        createNote,
        editNote
    };
});
