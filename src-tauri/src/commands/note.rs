use sqlx::Row;
use tauri::State;
use uuid::Uuid;

use crate::db::Db;
use crate::error::AppError;
use crate::models::note::{CreateNoteInput, EditNoteInput, ListNotesInput, Note};

#[tauri::command]
pub async fn create_note(db: State<'_, Db>, input: CreateNoteInput) -> Result<Note, AppError> {
    let exists = sqlx::query(
        r#"
        SELECT id
        FROM notes
        WHERE note_date = ?1
            AND profile_id = ?2
        "#
    )
    .bind(&input.note_date)
    .bind(&input.profile_id)
    .fetch_optional(&*db)
    .await?;

    if exists.is_some() {
        return Err(AppError::is_duplicate("note", Some("note_date")))
    }

    let id = Uuid::new_v4().to_string();

    sqlx::query(
        r#"
        INSERT INTO notes (id, profile_id, note_date, note)
        VALUES (?1, ?2, ?3, ?4)
        "#,
    )
    .bind(&id)
    .bind(&input.profile_id)
    .bind(input.note_date)
    .bind(input.note.trim())
    .execute(&*db)
    .await?;

    get_note_by_id_inner(&db, &id).await
}

#[tauri::command]
pub async fn edit_note(
    db: State<'_, Db>,
    input: EditNoteInput
) -> Result<Note, AppError> {
    let exists = sqlx::query(
        r#"
        SELECT id
        FROM notes
        WHERE id = ?1
            AND profile_id = ?2
        "#,
    )
    .bind(&input.note_id)
    .bind(&input.profile_id)
    .fetch_optional(&*db)
    .await?;

    if exists.is_none() {
        return Err(AppError::not_found("note", None));
    }

    sqlx::query(
        r#"
        UPDATE notes
        SET note = ?1
        WHERE id = ?2
            AND profile_id = ?3
        "#,
    )
    .bind(&input.note)
    .bind(&input.note_id)
    .bind(&input.profile_id)
    .execute(&*db)
    .await?;

    get_note_by_id_inner(&db, &input.note_id).await
}

#[tauri::command]
pub async fn list_notes(
    db: State<'_, Db>,
    input: ListNotesInput,
) -> Result<Vec<Note>, AppError> {
    let rows = sqlx::query(
        r#"
        SELECT id, profile_id, note_date, note, created_at, updated_at
        FROM notes
        WHERE profile_id = ?1
        ORDER BY created_at ASC
        "#,
    )
    .bind(&input.profile_id)
    .fetch_all(&*db)
    .await?;

    Ok(rows.into_iter().map(row_to_note).collect())
}

async fn get_note_by_id_inner(db: &Db, id: &str) -> Result<Note, AppError> {
    let row = sqlx::query(
        r#"
        SELECT id, profile_id, note_date, note, created_at, updated_at
        FROM notes
        WHERE id = ?1
        "#,
    )
    .bind(id)
    .fetch_one(db)
    .await?;

    Ok(row_to_note(row))
}

fn row_to_note(row: sqlx::sqlite::SqliteRow) -> Note {
    Note {
        id: row.get("id"),
        profile_id: row.get("profile_id"),
        note_date: row.get("note_date"),
        note: row.get("note"),
        created_at: row.get("created_at"),
        updated_at: row.get("updated_at"),
    }
}
