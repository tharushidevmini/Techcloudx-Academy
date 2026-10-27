from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.api import api_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="TechCloudX Academy — Industrial-Grade Cloud Training Management Platform (LMS) API",
    version="1.0.0",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url="/docs",
    redoc_url="/redoc",
)

# Configure CORS Middleware for Frontend Clients
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API v1 Routers (includes /api/v1/auth)
app.include_router(api_router, prefix=settings.API_V1_STR)


@app.get("/health", tags=["Health & System"])
def health_check():
    """System health check endpoint for container orchestrators and uptime monitors."""
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "environment": settings.ENVIRONMENT,
        "version": "1.0.0",
    }


@app.get("/", tags=["Health & System"])
def root():
    """Root platform discovery endpoint."""
    return {
        "message": f"Welcome to {settings.PROJECT_NAME} API",
        "docs": "/docs",
        "api_v1": settings.API_V1_STR,
    }
