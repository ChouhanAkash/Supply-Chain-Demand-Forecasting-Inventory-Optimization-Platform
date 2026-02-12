from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.models import product, warehouse
from app.routes import product_routes, warehouse_routes, forecast_routes, optimization_routes

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
app.include_router(forecast_routes.router)
app.include_router(optimization_routes.router)


@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "message": "Supply Chain Management API",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/health",
        "endpoints": {
            "products": "/products/",
            "warehouses": "/warehouses/",
            "forecast": "/forecast-demand/",
            "optimize": "/optimize-inventory/"
        }
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "ok"}
