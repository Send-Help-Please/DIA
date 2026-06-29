use sqlx::Row;
use tauri::State;
use uuid::Uuid;

use crate::db::Db;
use crate::error::AppError;
use crate::models::log::{CreateLogInput, DeleteLogInput, Log};

#[tauri::command]
pub async fn create_log(db: State<'_, Db>, input: CreateLogInput) -> Result<Log, AppError> {
    let exists = sqlx::query(
        r#"
        SELECT id
        FROM logs
        WHERE habit_id = ?1
            AND log_date = ?2
        "#
    )
    .bind(&input.habit_id)
    .bind(&input.log_date)
    .fetch_optional(&*db)
    .await?;

    if exists.is_some() {
        return Err(AppError::is_duplicate("log", Some("log_date")))
    }

    let id = Uuid::new_v4().to_string();

    sqlx::query(
        r#"
        INSERT INTO logs (id, habit_id, log_date)
        VALUES (?1, ?2, ?3)
        "#,
    )
    .bind(&id)
    .bind(&input.habit_id)
    .bind(input.log_date)
    .execute(&*db)
    .await?;

    get_log_by_id_inner(&db, &id).await
}

#[tauri::command]
pub async fn delete_log(db: State<'_, Db>, input: DeleteLogInput) -> Result<bool, AppError> {
    let exists = sqlx::query(
        r#"
        SELECT id
        FROM logs
        WHERE id = ?1
            AND habit_id = ?2
        "#,
    )
    .bind(&input.log_id)
    .bind(&input.habit_id)
    .fetch_optional(&*db)
    .await?;

    if exists.is_none() {
        return Err(AppError::not_found("log", None));
    }

    sqlx::query(
        r#"
        DELETE FROM logs
        WHERE id = ?
        "#,
    )
    .bind(&input.log_id)
    .execute(&*db)
    .await?;

    return Ok(true);
}

#[tauri::command]
pub async fn list_logs(
    db: State<'_, Db>
) -> Result<Vec<Log>, AppError> {
    let rows = sqlx::query(
        r#"
        SELECT id, habit_id, log_date, created_at, updated_at
        FROM logs
        ORDER BY created_at ASC
        "#,
    )
    .fetch_all(&*db)
    .await?;

    Ok(rows.into_iter().map(row_to_log).collect())
}

async fn get_log_by_id_inner(db: &Db, id: &str) -> Result<Log, AppError> {
    let row = sqlx::query(
        r#"
        SELECT id, habit_id, log_date, created_at, updated_at
        FROM logs
        WHERE id = ?1
        "#,
    )
    .bind(id)
    .fetch_one(db)
    .await?;

    Ok(row_to_log(row))
}

fn row_to_log(row: sqlx::sqlite::SqliteRow) -> Log {
    Log {
        id: row.get("id"),
        habit_id: row.get("habit_id"),
        log_date: row.get("log_date"),
        created_at: row.get("created_at"),
        updated_at: row.get("updated_at"),
    }
}
