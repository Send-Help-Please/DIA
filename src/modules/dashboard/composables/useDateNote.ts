import { computed, ref, watch } from 'vue';
import { useNotesStore } from '@/stores/useNotesStore';
import { datesAreSame } from '../utils/dateUtils';

export function useDateNote(date: () => Date) {
    const notesStore = useNotesStore();

    const note = computed(() =>
        notesStore.notes.find((note) => datesAreSame(note.date, date())),
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

        timeout = setTimeout(() => {
            const trimmed = value.trim();

            if (!trimmed && note.value) {
                notesStore.removeNote(note.value);
                return;
            }

            if (!trimmed) return;

            if (note.value) {
                const newNote = { ...note.value, note: trimmed };
                notesStore.editNote(newNote);
            } else {
                notesStore.addNote(date(), trimmed);
            }
        }, 300);
    });

    return {
        note,
        draftNote,
    };
}
