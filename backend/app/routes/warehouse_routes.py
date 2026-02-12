from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.warehouse import Warehouse as WarehouseModel
from app.schemas.warehouse_schemas import Warehouse, WarehouseCreate

router = APIRouter(prefix="/warehouses", tags=["warehouses"])


@router.post("/", response_model=Warehouse, status_code=201)
def create_warehouse(warehouse: WarehouseCreate, db: Session = Depends(get_db)):
    """Create a new warehouse"""
    db_warehouse = WarehouseModel(
        name=warehouse.name,
        capacity=warehouse.capacity,
        storage_cost=warehouse.storage_cost
    )
    db.add(db_warehouse)
    db.commit()
    db.refresh(db_warehouse)
    return db_warehouse


@router.get("/", response_model=List[Warehouse])
def get_warehouses(db: Session = Depends(get_db)):
    """Get all warehouses"""
    warehouses = db.query(WarehouseModel).all()
    return warehouses
