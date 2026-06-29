use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize)]
pub struct CreateLogInput {
    pub habit_id: String,
    pub log_date: String,
}

#[derive(Debug, Deserialize)]
pub struct DeleteLogInput {
    pub habit_id: String,
    pub log_id: String,
}

#[derive(Debug, Serialize)]
pub struct Log {
    pub id: String,
    pub habit_id: String,
    pub log_date: String,
    pub created_at: String,
    pub updated_at: Option<String>,
}
