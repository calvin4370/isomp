from __future__ import annotations

import sqlite3
from pathlib import Path

DB_PATH = Path(__file__).resolve().parent.parent / "data" / "isomp.db"


def get_connection() -> sqlite3.Connection:
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    connection = sqlite3.connect(DB_PATH, check_same_thread=False)
    connection.row_factory = sqlite3.Row
    return connection


def initialize_database() -> None:
    with get_connection() as connection:
        cursor = connection.cursor()
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS posts (
                id TEXT PRIMARY KEY,
                author TEXT NOT NULL,
                channel TEXT NOT NULL,
                caption TEXT NOT NULL,
                transcript TEXT NOT NULL,
                image_description TEXT NOT NULL,
                likes INTEGER NOT NULL DEFAULT 0,
                comments INTEGER NOT NULL DEFAULT 0,
                shares INTEGER NOT NULL DEFAULT 0,
                created_at TEXT NOT NULL
            )
            """
        )
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS profile (
                id INTEGER PRIMARY KEY CHECK (id = 1),
                handle TEXT NOT NULL,
                bio TEXT NOT NULL,
                followers INTEGER NOT NULL DEFAULT 0,
                following INTEGER NOT NULL DEFAULT 0
            )
            """
        )

        post_count = cursor.execute("SELECT COUNT(*) FROM posts").fetchone()[0]
        if post_count == 0:
            cursor.executemany(
                """
                INSERT INTO posts (
                    id, author, channel, caption, transcript, image_description, likes, comments, shares, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                [
                    (
                        "post-1",
                        "Ava Creates",
                        "BlindCommunity",
                        "Today I shared how I record daily routines with audio cues.",
                        "Hello everyone. In this short clip I explain how I use voice notes to structure my day and collaborate with my support network.",
                        "A creator holding a phone while recording a voice note in a bright living room.",
                        124,
                        32,
                        8,
                        "2026-02-11T00:00:00Z",
                    ),
                    (
                        "post-2",
                        "Noah Signs",
                        "DeafCommunity",
                        "Sign language storytelling session highlights from today.",
                        "In this video we discuss identity, confidence, and how visual storytelling can grow social influence.",
                        "A person signing enthusiastically in front of colorful posters.",
                        201,
                        41,
                        17,
                        "2026-02-10T00:00:00Z",
                    ),
                ],
            )

        profile_count = cursor.execute("SELECT COUNT(*) FROM profile").fetchone()[0]
        if profile_count == 0:
            cursor.execute(
                """
                INSERT INTO profile (id, handle, bio, followers, following)
                VALUES (1, ?, ?, ?, ?)
                """,
                (
                    "@isompCreator",
                    "Accessible creator sharing daily life, community tips, and inclusive tools.",
                    1302,
                    248,
                ),
            )

        connection.commit()
