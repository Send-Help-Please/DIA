mod commands;
mod db;
mod error;
mod models;

use tauri::Manager;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .setup(|app| {
            let handle = app.handle().clone();

            tauri::async_runtime::block_on(async move {
                let db = db::init(&handle)
                    .await
                    .expect("failed to initialize database");

                handle.manage(db);
            });

            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            commands::create_profile,
            commands::save_temp_avatar,
            commands::get_profile,
            commands::create_habit,
            commands::edit_habit,
            commands::delete_habit,
            commands::list_habits,
            commands::create_log,
            commands::delete_log,
            commands::list_logs,
            commands::create_note,
            commands::edit_note,
            commands::list_notes,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
