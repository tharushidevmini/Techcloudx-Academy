from typing import Generator, AsyncGenerator
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session, DeclarativeBase
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from app.core.config import settings


# Base class for all ORM models using SQLAlchemy 2.0 DeclarativeBase
class Base(DeclarativeBase):
    pass


# ==============================================================================
# Synchronous Engine & Session Factory
# ==============================================================================
engine = create_engine(
    settings.sync_database_url,
    pool_pre_ping=True,
    pool_size=10,
    max_overflow=20,
    echo=False,
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)


def get_db() -> Generator[Session, None, None]:
    """
    FastAPI dependency that yields a synchronous database session.
    Automatically commits or rolls back and ensures connection teardown.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ==============================================================================
# Asynchronous Engine & Session Factory (High-Concurrency / Streaming)
# ==============================================================================
async_engine = create_async_engine(
    settings.async_database_url,
    pool_pre_ping=True,
    pool_size=10,
    max_overflow=20,
    echo=False,
)

AsyncSessionLocal = async_sessionmaker(
    bind=async_engine,
    class_=AsyncSession,
    autocommit=False,
    autoflush=False,
    expire_on_commit=False,
)


async def get_async_db() -> AsyncGenerator[AsyncSession, None]:
    """
    FastAPI dependency that yields an asynchronous database session.
    """
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()
