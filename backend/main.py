import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="TechCloudX Academy API",
    description="Industrial-grade Cloud Training Management Platform (LMS) API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

origins = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health", tags=["System"])
def health_check():
    return {
        "status": "healthy",
        "service": "TechCloudX Academy Backend",
        "environment": os.getenv("ENVIRONMENT", "development"),
    }

@app.get("/api/v1", tags=["Root"])
def root():
    return {
        "message": "Welcome to TechCloudX Academy API",
        "docs": "/docs",
        "version": "1.0.0",
    }
