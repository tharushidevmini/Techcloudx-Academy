from typing import List, Union
from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # Base Application Metadata
    PROJECT_NAME: str = "TechCloudX Academy"
    API_V1_STR: str = "/api/v1"
    ENVIRONMENT: str = "development"

    # Database Configuration
    DATABASE_URL: str = Field(
        default="postgresql://postgres:postgres_secure_password@postgres:5432/techcloudx_academy",
        description="PostgreSQL Connection URL"
    )

    # JWT Authentication & Cryptography
    SECRET_KEY: str = Field(
        default="generate_a_super_secret_64_character_hex_key_here_for_security",
        alias="JWT_SECRET_KEY",
        description="Secret key for signing JWT tokens"
    )
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440  # 24 hours

    # CORS Configuration
    CORS_ORIGINS: Union[List[str], str] = "http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173"

    @property
    def cors_origins_list(self) -> List[str]:
        if isinstance(self.CORS_ORIGINS, list):
            return self.CORS_ORIGINS
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",") if origin.strip()]

    # Engine helper: transform postgresql:// to postgresql+psycopg2:// or async if needed
    @property
    def sync_database_url(self) -> str:
        url = self.DATABASE_URL
        if url.startswith("postgres://"):
            url = url.replace("postgres://", "postgresql://", 1)
        if url.startswith("postgresql://") and not url.startswith("postgresql+"):
            url = url.replace("postgresql://", "postgresql+psycopg2://", 1)
        return url

    @property
    def async_database_url(self) -> str:
        url = self.DATABASE_URL
        if url.startswith("postgres://"):
            url = url.replace("postgres://", "postgresql+asyncpg://", 1)
        elif url.startswith("postgresql://") and not url.startswith("postgresql+"):
            url = url.replace("postgresql://", "postgresql+asyncpg://", 1)
        return url

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
        populate_by_name=True,
    )


settings = Settings()
