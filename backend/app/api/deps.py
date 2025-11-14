from fastapi import Depends, HTTPException, status
from sqlmodel import Session, select

from ..db.session import get_db
from ..models import User, UserRole
from ..services.auth import hash_password


def get_or_create_default_user(db: Session) -> User:
    """Get or create a default user for the simplified auth version."""
    # Try to find existing user
    statement = select(User).limit(1)
    user = db.exec(statement).first()

    if not user:
        # Create default user
        user = User(
            email="student@flashcards.local",
            full_name="Student User",
            hashed_password=hash_password("password"),
            is_active=True,
            role=UserRole.USER,
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    return user


def get_current_user(
    db: Session = Depends(get_db),
) -> User:
    """Simplified: Always return the default user."""
    return get_or_create_default_user(db)


def get_current_user_optional(
    db: Session = Depends(get_db),
) -> User:
    """Simplified: Always return the default user (not optional anymore)."""
    return get_or_create_default_user(db)


def get_current_active_user(db: Session = Depends(get_db)) -> User:
    """Simplified: Always return the default user."""
    return get_or_create_default_user(db)


def get_current_admin(current_user: User = Depends(get_current_active_user)) -> User:
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient permissions")
    return current_user


def get_db_session() -> Session:
    return Depends(get_db)
