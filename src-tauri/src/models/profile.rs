use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize)]
pub struct CreateProfileInput {
    pub display_name: String,
    pub avatar_url: Option<String>,
    pub week_starts_on: u8,
}

#[derive(Debug, Serialize)]
pub struct Profile {
    pub id: String,
    pub display_name: String,
    pub avatar_url: Option<String>,
    pub week_starts_on: u8,
    pub created_at: String,
    pub updated_at: Option<String>,
}
