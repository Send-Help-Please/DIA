use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize)]
pub struct CreateHabitInput {
    pub profile_id: String,
    pub title: String,
    pub icon: String,
}

#[derive(Debug, Deserialize)]
pub struct EditHabitInput {
    pub profile_id: String,
    pub habit_id: String,
    pub title: String,
    pub icon: String,
}

#[derive(Debug, Deserialize)]
pub struct DeleteHabitInput {
    pub profile_id: String,
    pub habit_id: String,
}

#[derive(Debug, Deserialize)]
pub struct ListHabitsInput {
    pub profile_id: String,
}

#[derive(Debug, Serialize)]
pub struct Habit {
    pub id: String,
    pub profile_id: String,
    pub title: String,
    pub icon: String,
    pub created_at: String,
    pub updated_at: Option<String>,
    pub deleted_at: Option<String>,
}
