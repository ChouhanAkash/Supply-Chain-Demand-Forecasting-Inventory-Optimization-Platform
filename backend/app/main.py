from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.models import product, warehouse
from app.routes import product_routes, warehouse_routes

app = FastAPI()

# Enable CORS for all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database tables on startup
Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(product_routes.router)
app.include_router(warehouse_routes.router)


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "ok"}
