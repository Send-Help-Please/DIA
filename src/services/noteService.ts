import { NotesRepository } from "@/repositories/notesRepository";
import { CreateNotePayload, EditNotePayload, ListNotesPayload } from "@/types/Note";

class NoteService {
    private notesRepo = new NotesRepository();

    async listNotes(payload: ListNotesPayload) {
        return await this.notesRepo.listNotes(payload);
    }

    async createNote(payload: CreateNotePayload) {
        return await this.notesRepo.createNote(payload);
    }

    async editNote(payload: EditNotePayload) {
        return await this.notesRepo.editNote(payload);
    }
}

export const noteService = new NoteService();