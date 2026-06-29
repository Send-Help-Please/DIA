use serde::Serialize;

#[derive(Debug, Serialize)]
pub struct AppError {
    pub code: String,
    pub field: Option<String>,
}

impl AppError {
    pub fn new(code: &str, field: Option<&str>) -> Self {
        Self {
            code: code.into(),
            field: field.map(String::from),
        }
    }

    pub fn not_found(context: &str, field: Option<&str>) -> Self {
        Self {
            code: format!("{}_NOT_FOUND", context.to_uppercase()),
            field: field.map(String::from),
        }
    }

    pub fn is_duplicate(context: &str, field: Option<&str>) -> Self {
        Self {
            code: format!("{}_IS_DUPLICATE", context.to_uppercase()),
            field: field.map(String::from),
        }
    }

    pub fn db() -> Self {
        Self::new("DB_ERROR", None)
    }
}

impl From<sqlx::Error> for AppError {
    fn from(err: sqlx::Error) -> Self {
        AppError::db()
    }
}
