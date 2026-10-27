from typing import List, Union
import uuid
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import decode_token
from app.models.user import User, UserRole

# HTTP Bearer security scheme for Swagger UI & API header parsing
security_scheme = HTTPBearer(auto_error=False)


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security_scheme),
    db: Session = Depends(get_db),
) -> User:
    """
    Validate incoming Bearer token, extract identity, and load current user record.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials or token expired",
        headers={"WWW-Authenticate": "Bearer"},
    )

    if not credentials or not credentials.credentials:
        raise credentials_exception

    payload = decode_token(credentials.credentials)
    if not payload:
        raise credentials_exception

    user_id_raw: str = payload.get("sub")
    if not user_id_raw:
        raise credentials_exception

    try:
        user_uuid = uuid.UUID(user_id_raw)
    except (ValueError, TypeError):
        raise credentials_exception

    user = db.query(User).filter(User.id == user_uuid).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is deactivated",
        )

    return user


def require_role(allowed_roles: List[Union[UserRole, str]]):
    """
    Role-Based Access Control (RBAC) dependency factory.
    Enforces authorization based on user roles.
    """
    normalized_roles = [
        role.value if isinstance(role, UserRole) else str(role).lower()
        for role in allowed_roles
    ]

    def role_checker(current_user: User = Depends(get_current_user)) -> User:
        user_role_str = (
            current_user.role.value
            if isinstance(current_user.role, UserRole)
            else str(current_user.role).lower()
        )
        if user_role_str not in normalized_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Operation not permitted. Required roles: {normalized_roles}",
            )
        return current_user

    return role_checker
