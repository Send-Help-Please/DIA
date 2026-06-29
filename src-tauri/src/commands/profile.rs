use sqlx::Row;
use std::path::Path;
use tauri::{AppHandle, Manager, State};
use uuid::Uuid;

use crate::db::Db;
use crate::error::AppError;
use crate::models::profile::{CreateProfileInput, Profile};

#[tauri::command]
pub async fn save_temp_avatar(
    app: AppHandle,
    source_path: String,
) -> Result<String, AppError> {
    let app_data_dir = app
        .path()
        .app_data_dir()
        .map_err(|_| AppError::new("APP_DATA_ERROR", None))?;

    let temp_dir = app_data_dir.join("avatars").join("temp");
    std::fs::create_dir_all(&temp_dir)
        .map_err(|_| AppError::new("FILE_ERROR", None))?;

    let source = Path::new(&source_path);
    let ext = source
        .extension()
        .and_then(|e| e.to_str())
        .unwrap_or("jpg");

    let file_name = format!("temp-{}.{}", Uuid::new_v4(), ext);
    let destination = temp_dir.join(&file_name);

    std::fs::copy(&source, &destination)
        .map_err(|_| AppError::new("FILE_ERROR", Some("temp_avatar")))?;

    Ok(destination.to_string_lossy().to_string())
}

fn copy_profile_image(app: &AppHandle, source_path: &str) -> Result<String, AppError> {
    let app_data_dir = app
        .path()
        .app_data_dir()
        .map_err(|_| AppError::new("APP_DATA_ERROR", None))?;

    let avatars_dir = app_data_dir.join("avatars");

    std::fs::create_dir_all(&avatars_dir).map_err(|_| AppError::new("FILE_ERROR", None))?;

    let source = Path::new(source_path);

    let ext = source
        .extension()
        .and_then(|ext| ext.to_str())
        .unwrap_or("jpg");

    let file_name = format!("{}.{}", Uuid::new_v4(), ext);
    let destination = avatars_dir.join(file_name);

    std::fs::copy(source, &destination).map_err(|_| AppError::new("FILE_ERROR", Some("avatar")))?;

    Ok(destination.to_string_lossy().to_string())
}

#[tauri::command]
pub async fn create_profile(
    app: AppHandle,
    db: State<'_, Db>,
    input: CreateProfileInput,
) -> Result<Profile, AppError> {
    let id = Uuid::new_v4().to_string();

    let final_url = match input.avatar_url.as_deref() {
        Some(path) if !path.trim().is_empty() => Some(copy_profile_image(&app, path)?),
        _ => None,
    };

    sqlx::query(
        r#"
        INSERT INTO profile (id, display_name, avatar_url, week_starts_on)
        VALUES (?1, ?2, ?3, ?4)
        "#,
    )
    .bind(&id)
    .bind(input.display_name)
    .bind(final_url)
    .bind(input.week_starts_on)
    .execute(&*db)
    .await?;

    get_profile_by_id_inner(&db, &id).await
}

#[tauri::command]
pub async fn get_profile(db: State<'_, Db>) -> Result<Option<Profile>, AppError> {
    let row = sqlx::query(
        r#"
        SELECT id, display_name, avatar_url, week_starts_on, created_at, updated_at
        FROM profile
        LIMIT 1
        "#,
    )
    .fetch_optional(&*db)
    .await?;

    Ok(row.map(|row| Profile {
        id: row.get("id"),
        display_name: row.get("display_name"),
        avatar_url: row.get("avatar_url"),
        week_starts_on: row.get("week_starts_on"),
        created_at: row.get("created_at"),
        updated_at: row.get("updated_at"),
    }))
}

async fn get_profile_by_id_inner(db: &Db, id: &str) -> Result<Profile, AppError> {
    let row = sqlx::query(
        r#"
        SELECT id, display_name, avatar_url, week_starts_on, created_at, updated_at
        FROM profile
        WHERE id = ?1
        "#,
    )
    .bind(id)
    .fetch_one(db)
    .await?;

    Ok(row_to_profile(row))
}

fn row_to_profile(row: sqlx::sqlite::SqliteRow) -> Profile {
    Profile {
        id: row.get("id"),
        display_name: row.get("display_name"),
        avatar_url: row.get("avatar_url"),
        week_starts_on: row.get("week_starts_on"),
        created_at: row.get("created_at"),
        updated_at: row.get("updated_at"),
    }
}
