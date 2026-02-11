from ..models import Profile
from .db import get_connection


def get_profile() -> Profile:
    with get_connection() as connection:
        row = connection.execute(
            "SELECT handle, bio, followers, following FROM profile WHERE id = 1"
        ).fetchone()
    return Profile(
        handle=row["handle"],
        bio=row["bio"],
        followers=row["followers"],
        following=row["following"],
    )


def update_profile(handle: str, bio: str) -> Profile:
    with get_connection() as connection:
        connection.execute(
            "UPDATE profile SET handle = ?, bio = ? WHERE id = 1",
            (handle, bio),
        )
        connection.commit()
    return get_profile()
