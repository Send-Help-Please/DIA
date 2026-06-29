use sqlx::Row;
use tauri::State;
use uuid::Uuid;

use crate::db::Db;
use crate::error::AppError;
use crate::models::habit::{
    CreateHabitInput, DeleteHabitInput, EditHabitInput, Habit, ListHabitsInput,
};

#[tauri::command]
pub async fn create_habit(db: State<'_, Db>, input: CreateHabitInput) -> Result<Habit, AppError> {
    let exists = sqlx::query(
        r#"
        SELECT id
        FROM habits
        WHERE title = ?1
            AND profile_id = ?2
            AND deleted_at is NULL
        "#
    )
    .bind(&input.title)
    .bind(&input.profile_id)
    .fetch_optional(&*db)
    .await?;

    if exists.is_some() {
        return Err(AppError::is_duplicate("habit", Some("title")))
    }

    let id = Uuid::new_v4().to_string();

    sqlx::query(
        r#"
        INSERT INTO habits (id, profile_id, title, icon)
        VALUES (?1, ?2, ?3, ?4)
        "#,
    )
    .bind(&id)
    .bind(&input.profile_id)
    .bind(input.title.trim())
    .bind(&input.icon)
    .execute(&*db)
    .await?;

    get_habit_by_id_inner(&db, &id).await
}

#[tauri::command]
pub async fn edit_habit(db: State<'_, Db>, input: EditHabitInput) -> Result<Habit, AppError> {
    let exists = sqlx::query(
        r#"
        SELECT id
        FROM habits
        WHERE id = ?1
            AND deleted_at IS NULL
        "#,
    )
    .bind(&input.habit_id)
    .fetch_optional(&*db)
    .await?;

    if exists.is_none() {
        return Err(AppError::not_found("habit", None));
    }

    sqlx::query(
        r#"
        UPDATE habits
        SET title = ?1,
            icon = ?2
        WHERE id = ?3
            AND deleted_at IS NULL
        "#,
    )
    .bind(&input.title)
    .bind(&input.icon)
    .bind(&input.habit_id)
    .execute(&*db)
    .await?;

    get_habit_by_id_inner(&db, &input.habit_id).await
}

#[tauri::command]
pub async fn delete_habit(db: State<'_, Db>, input: DeleteHabitInput) -> Result<bool, AppError> {
    sqlx::query(
        r#"
        UPDATE habits
        SET deleted_at = CURRENT_TIMESTAMP
        WHERE id = ?1
          AND profile_id = ?2
          AND deleted_at IS NULL
        "#,
    )
    .bind(&input.habit_id)
    .bind(&input.profile_id)
    .execute(&*db)
    .await?;

    Ok(true)
}

#[tauri::command]
pub async fn list_habits(
    db: State<'_, Db>,
    input: ListHabitsInput,
) -> Result<Vec<Habit>, AppError> {
    let rows = sqlx::query(
        r#"
        SELECT id, profile_id, title, icon, created_at, updated_at, deleted_at
        FROM habits
        WHERE profile_id = ?1
          AND deleted_at IS NULL
        ORDER BY created_at ASC
        "#,
    )
    .bind(&input.profile_id)
    .fetch_all(&*db)
    .await?;

    Ok(rows.into_iter().map(row_to_habit).collect())
}

async fn get_habit_by_id_inner(db: &Db, id: &str) -> Result<Habit, AppError> {
    let row = sqlx::query(
        r#"
        SELECT id, profile_id, title, icon, created_at, updated_at, deleted_at
        FROM habits
        WHERE id = ?1
        "#,
    )
    .bind(id)
    .fetch_one(db)
    .await?;

    Ok(row_to_habit(row))
}

fn row_to_habit(row: sqlx::sqlite::SqliteRow) -> Habit {
    Habit {
        id: row.get("id"),
        profile_id: row.get("profile_id"),
        title: row.get("title"),
        icon: row.get("icon"),
        created_at: row.get("created_at"),
        updated_at: row.get("updated_at"),
        deleted_at: row.get("deleted_at"),
    }
}
