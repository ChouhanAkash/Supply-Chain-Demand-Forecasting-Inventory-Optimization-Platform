from fastapi import APIRouter, HTTPException
from app.seed_data import seed_database, force_reseed

router = APIRouter(prefix="/admin", tags=["admin"])


@router.post("/seed")
def seed_data():
    """Seed the database with initial data"""
    try:
        seed_database()
        return {"message": "Database seeded successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/force-reseed")
def force_reseed_data():
    """Force reseed the database (clears existing data)"""
    try:
        force_reseed()
        return {"message": "Database force reseeded successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
