export type Note = {
    id: string;
    noteDate: Date;
    note: string;
};

export type NoteDTO = {
    id: string;
    note_date: string;
    note: string;
}

export type CreateNotePayload = {
    profileId: string;
    note: string;
    noteDate: Date;
}

export type CreateNoteInput = {
    profile_id: string;
    note: string;
    note_date: string;
}

export type EditNotePayload = {
    profileId: string;
    noteId: string;
    note: string;
}

export type EditNoteInput = {
    profile_id: string;
    note_id: string;
    note: string;
}   

export type ListNotesPayload = {
    profileId: string;
}

export type ListNotesInput = {
    profile_id: string;
}