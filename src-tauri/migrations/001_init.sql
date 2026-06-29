CREATE TABLE IF NOT EXISTS profile (
    id TEXT PRIMARY KEY,
    display_name TEXT NOT NULL,
    avatar_url TEXT,
    week_starts_on INTEGER NOT NULL DEFAULT 1 CHECK (week_starts_on BETWEEN 0 AND 6),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT
);

CREATE TABLE IF NOT EXISTS habits (
    id TEXT PRIMARY KEY,
    profile_id TEXT NOT NULL,
    title TEXT NOT NULL,
    icon TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT,
    deleted_at TEXT,

    FOREIGN KEY (profile_id) REFERENCES profile(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS logs (
    id TEXT PRIMARY KEY,
    habit_id TEXT NOT NULL,
    log_date TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT,

    FOREIGN KEY (habit_id) REFERENCES habits(id) ON DELETE CASCADE,
    UNIQUE (habit_id, log_date)
);

CREATE TABLE IF NOT EXISTS notes (
    id TEXT PRIMARY KEY,
    profile_id TEXT NOT NULL,
    note_date TEXT NOT NULL,
    note TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT,

    FOREIGN KEY (profile_id) REFERENCES profile(id) ON DELETE CASCADE,
    UNIQUE (profile_id, note_date)
);


CREATE INDEX IF NOT EXISTS idx_habits_profile_id 
ON habits(profile_id);

CREATE UNIQUE INDEX IF NOT EXISTS idx_habits_unique_active_title
ON habits(profile_id, title)
WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_logs_log_date 
ON logs(log_date);

CREATE INDEX IF NOT EXISTS idx_notes_profile_date 
ON notes(profile_id, note_date);