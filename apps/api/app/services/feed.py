from datetime import datetime

from ..models import Post
from .db import get_connection

SAMPLE_FEED = [
    Post(
        id="post-1",
        author="Ava Creates",
        channel="BlindCommunity",
        caption="Today I shared how I record daily routines with audio cues.",
        transcript=(
            "Hello everyone. In this short clip I explain how I use voice notes to "
            "structure my day and collaborate with my support network."
        ),
        imageDescription=(
            "A creator holding a phone while recording a voice note in a bright living room."
        ),
        likes=124,
        comments=32,
        shares=8,
    ),
    Post(
        id="post-2",
        author="Noah Signs",
        channel="DeafCommunity",
        caption="Sign language storytelling session highlights from today.",
        transcript=(
            "In this video we discuss identity, confidence, and how visual storytelling can "
            "grow social influence."
        ),
        imageDescription="A person signing enthusiastically in front of colorful posters.",
        likes=201,
        comments=41,
        shares=17,
    ),
]


def get_feed_posts() -> list[Post]:
    with get_connection() as connection:
        rows = connection.execute(
            """
            SELECT id, author, channel, caption, transcript, image_description, likes, comments, shares
            FROM posts
            ORDER BY created_at DESC
            """
        ).fetchall()
    return [
        Post(
            id=row["id"],
            author=row["author"],
            channel=row["channel"],
            caption=row["caption"],
            transcript=row["transcript"],
            imageDescription=row["image_description"],
            likes=row["likes"],
            comments=row["comments"],
            shares=row["shares"],
        )
        for row in rows
    ]


def create_post(
    author: str,
    channel: str,
    caption: str,
    transcript: str,
    image_description: str,
) -> Post:
    post_id = f"post-{int(datetime.utcnow().timestamp() * 1000)}"
    created_at = datetime.utcnow().isoformat() + "Z"
    with get_connection() as connection:
        connection.execute(
            """
            INSERT INTO posts (
                id, author, channel, caption, transcript, image_description, likes, comments, shares, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, 0, 0, 0, ?)
            """,
            (post_id, author, channel, caption, transcript, image_description, created_at),
        )
        connection.commit()

    post = Post(
        id=post_id,
        author=author,
        channel=channel,
        caption=caption,
        transcript=transcript,
        imageDescription=image_description,
        likes=0,
        comments=0,
        shares=0,
    )
    return post
