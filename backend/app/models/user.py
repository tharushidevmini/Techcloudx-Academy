import enum
import uuid
from sqlalchemy import Column, String, Boolean, DateTime, Enum as SQLEnum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from app.core.database import Base


class UserRole(str, enum.Enum):
    STUDENT = "student"
    INSTRUCTOR = "instructor"
    ADMIN = "admin"


class User(Base):
    __tablename__ = "users"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        nullable=False,
    )
    full_name = Column(
        String(255),
        nullable=False,
    )
    email = Column(
        String(255),
        unique=True,
        index=True,
        nullable=False,
    )
    password_hash = Column(
        String(255),
        nullable=False,
    )
    role = Column(
        SQLEnum(UserRole, name="user_role", create_type=False),
        nullable=False,
        default=UserRole.STUDENT,
    )
    is_active = Column(
        Boolean,
        nullable=False,
        default=True,
    )
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    def __repr__(self) -> str:
        return f"<User {self.email} ({self.role})>"
