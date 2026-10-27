import uuid
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field, ConfigDict
from app.models.user import UserRole


# ==============================================================================
# Authentication Input Payloads
# ==============================================================================
class UserRegister(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=100, example="Alex Rivera")
    email: EmailStr = Field(..., example="alex.rivera@techcloudx.com")
    password: str = Field(..., min_length=8, max_length=128, example="P@ssw0rdSecure2026!")
    role: UserRole = Field(default=UserRole.STUDENT, description="User role: student or instructor")


class UserLogin(BaseModel):
    email: EmailStr = Field(..., example="alex.rivera@techcloudx.com")
    password: str = Field(..., example="P@ssw0rdSecure2026!")


# ==============================================================================
# Authentication Response Payloads
# ==============================================================================
class UserOut(BaseModel):
    id: uuid.UUID
    full_name: str
    email: EmailStr
    role: UserRole
    is_active: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: UserRole
    user: UserOut
