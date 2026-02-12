from sqlalchemy import Column, Integer, String, Float
from app.database import Base


class Warehouse(Base):
    __tablename__ = "warehouses"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    capacity = Column(Integer, nullable=False)
    storage_cost = Column(Float, nullable=False)
