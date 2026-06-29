import { Note } from '@/types/Note';
import { datesAreSame } from './dateUtils';

export function getNoteForDate(date: Date, notes: Note[]) {
    return notes.find((note) => datesAreSame(note.noteDate, date));
}
