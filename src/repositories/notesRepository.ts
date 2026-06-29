import { CreateNoteInput, CreateNotePayload, EditNoteInput, EditNotePayload, ListNotesInput, ListNotesPayload, Note, NoteDTO } from "@/types/Note";
import { dateToString, stringToDate } from "@/utils/dateUtils";
import { invoke } from "@tauri-apps/api/core";

export class NotesRepository {
    private mapCreateNoteToInput(payload: CreateNotePayload): CreateNoteInput {        
        return {
            profile_id: payload.profileId,
            note_date: dateToString(payload.noteDate),
            note: payload.note
        }
    }

    private mapEditNoteToInput(payload: EditNotePayload): EditNoteInput {
        return {
            profile_id: payload.profileId,
            note_id: payload.noteId,
            note: payload.note
        }
    }

    private mapListNotesToInput(payload: ListNotesPayload): ListNotesInput {
        return {
            profile_id: payload.profileId
        }
    }

    private mapDTOToNote(dto: NoteDTO): Note {
        return {
            id: dto.id,
            note: dto.note,
            noteDate: stringToDate(dto.note_date)
        }
    }

    private mapDTOsToNote(dtos: NoteDTO[]): Note[] {
        const notes: Note[] = [];
        
        for (const dto of dtos) {
            notes.push(this.mapDTOToNote(dto));
        }
    
        return notes;
    }

    async createNote(payload: CreateNotePayload) {
        const input = this.mapCreateNoteToInput(payload);

        const noteDTO = await invoke("create_note", { input }) as NoteDTO;

        return this.mapDTOToNote(noteDTO);
    }

    async editNote(payload: EditNotePayload) {
        const input = this.mapEditNoteToInput(payload);

        const noteDTO = await invoke("edit_note", { input }) as NoteDTO;
        
        return this.mapDTOToNote(noteDTO);
    }

    async listNotes(payload: ListNotesPayload) {
        const input = this.mapListNotesToInput(payload);

        const noteDTOs = await invoke("list_notes", { input }) as NoteDTO[];

        return this.mapDTOsToNote(noteDTOs);
    }
}