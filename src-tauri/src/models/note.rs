use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize)]
pub struct CreateNoteInput {
    pub profile_id: String,
    pub note_date: String,
    pub note: String,
}

#[derive(Debug, Deserialize)]
pub struct EditNoteInput {
    pub profile_id: String,
    pub note_id: String,
    pub note: String,
}

#[derive(Debug, Deserialize)]
pub struct ListNotesInput {
    pub profile_id: String,
}

#[derive(Debug, Serialize)]
pub struct Note {
    pub id: String,
    pub profile_id: String,
    pub note_date: String,
    pub note: String,
    pub created_at: String,
    pub updated_at: Option<String>,
}
