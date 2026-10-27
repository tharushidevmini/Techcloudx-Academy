from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.api.deps import get_current_user, require_role
from app.core.database import get_db
from app.core.security import get_password_hash, verify_password, create_access_token
from app.models.user import User, UserRole
from app.schemas.auth import UserRegister, UserLogin, TokenResponse, UserOut

router = APIRouter(prefix="/auth", tags=["Authentication & Identity"])


@router.post(
    "/register",
    response_model=UserOut,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new platform user",
    description="Registers a new student or instructor. Admin accounts cannot be self-registered.",
)
def register(
    payload: UserRegister,
    db: Session = Depends(get_db),
) -> User:
    # Restrict public registration of administrative accounts
    if payload.role == UserRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Administrative privileges cannot be assigned during public self-registration.",
        )

    # Check for existing email conflict
    email_clean = payload.email.strip().lower()
    existing_user = db.query(User).filter(User.email == email_clean).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A user with this email address already exists.",
        )

    # Create and persist new user
    new_user = User(
        full_name=payload.full_name.strip(),
        email=email_clean,
        password_hash=get_password_hash(payload.password),
        role=payload.role,
        is_active=True,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


@router.post(
    "/login",
    response_model=TokenResponse,
    status_code=status.HTTP_200_OK,
    summary="User authentication login",
    description="Validates email/password credentials and issues a signed JWT access token.",
)
def login(
    payload: UserLogin,
    db: Session = Depends(get_db),
) -> TokenResponse:
    email_clean = payload.email.strip().lower()
    user = db.query(User).filter(User.email == email_clean).first()

    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password credentials.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is deactivated. Please contact support.",
        )

    role_str = user.role.value if isinstance(user.role, UserRole) else str(user.role)
    token = create_access_token(
        subject=str(user.id),
        role=role_str,
        extra_claims={
            "email": user.email,
            "full_name": user.full_name,
        },
    )

    return TokenResponse(
        access_token=token,
        token_type="bearer",
        role=user.role,
        user=UserOut.model_validate(user),
    )


@router.get(
    "/me",
    response_model=UserOut,
    status_code=status.HTTP_200_OK,
    summary="Get current user profile",
    description="Returns the profile information of the currently authenticated bearer.",
)
def get_me(
    current_user: User = Depends(get_current_user),
) -> User:
    return current_user


# Re-export RBAC dependencies for convenient route consumption
__all__ = ["router", "get_current_user", "require_role"]
