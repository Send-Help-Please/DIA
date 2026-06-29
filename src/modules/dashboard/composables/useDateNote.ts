import { computed, ref, watch } from 'vue';
import { useNotesStore } from '@/stores/useNotesStore';
import { datesAreSame } from '../utils/dateUtils';

export function useDateNote(date: () => Date) {
    const notesStore = useNotesStore();

    const note = computed(() =>
        notesStore.notes.find((note) => datesAreSame(note.noteDate, date()))
    );

    const draftNote = ref('');

    watch(
        note,
        (value) => {
            draftNote.value = value?.note ?? '';
        },
        { immediate: true },
    );

    let timeout: ReturnType<typeof setTimeout>;

    watch(draftNote, (value) => {
        clearTimeout(timeout);

        timeout = setTimeout(async () => {
            const trimmed = value.trim();

            const noteIsDeleted = !trimmed && note.value;
            const noteIsEdited = trimmed && note.value;
            const noteIsCreated = trimmed && !note.value;

            if (noteIsDeleted) {
                await notesStore.editNote({ ...note.value, note: "" });
                return;
            }

            if (noteIsEdited) {
                await notesStore.editNote({ ...note.value, note: trimmed });
            }
            
            if (noteIsCreated) {
                await notesStore.createNote({ note: trimmed, noteDate: date() });
            }
        }, 300);
    });

    return {
        note,
        draftNote,
    };
}
