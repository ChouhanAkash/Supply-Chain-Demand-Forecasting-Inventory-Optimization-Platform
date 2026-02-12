from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.product import Product as ProductModel
from app.schemas.product_schemas import Product, ProductCreate

router = APIRouter(prefix="/products", tags=["products"])


@router.post("/", response_model=Product, status_code=201)
def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    """Create a new product"""
    db_product = ProductModel(name=product.name, price=product.price)
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product


@router.get("/", response_model=List[Product])
def get_products(db: Session = Depends(get_db)):
    """Get all products"""
    products = db.query(ProductModel).all()
    return products
